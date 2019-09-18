/* eslint-disable no-console */

import fetch from "node-fetch"
import paypal from "paypal-rest-sdk"
import yaml from "js-yaml"

const HOST = "https://ascent-nuxt.netlify.com"

export async function handler(event, context) {
  try {
    const data = JSON.parse(event.body)

    if (
      data.event_type !== "CHECKOUT.ORDER.APPROVED" ||
      data.resource.status !== "COMPLETED"
    ) {
      console.log(`skipping event ${data.event_type}`)
      return {
        statusCode: 200,
        body: "",
      }
    }

    await verifyWebhookEvent(event.body)
    console.log("webhook event was verified")

    const items = sumItems(data)
    console.log(`adding ${JSON.stringify(items, null, 2)}`)

    await updateProducts(context.clientContext.identity.token, items)
    console.log("we're done processing")

    return {
      statusCode: 200,
      body: "",
    }
  } catch (err) {
    console.log(`error: ${err.toString()}`)

    return {
      statusCode: 500,
      body: "",
    }
  }
}

function verifyWebhookEvent(event) {
  paypal.configure({
    mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  })

  return new Promise((resolve, reject) => {
    paypal.notification.webhookEvent.getAndVerify(event, (err, resp) => {
      if (err) {
        reject(err)
      } else {
        resolve(resp)
      }
    })
  })
}

function sumItems(data) {
  const items = {}

  data.resource.purchase_units.forEach(unit => {
    unit.items.forEach(item => {
      items[item.sku] = (items[item.sku] || 0) + parseInt(item.quantity)
    })
  })

  return items
}

async function updateProducts(token, items) {
  const ctx = await require.context(
    "js-yaml-loader!../content/products",
    false,
    /\.ya?ml$/
  )

  for (const path of ctx.keys()) {
    console.log(`processing ${path}`)

    const product = ctx(path)

    let dirty = false

    for (const size of product.sizes) {
      if (items[size.sku]) {
        size.purchased += items[size.sku]
        dirty = true
      }
    }

    if (dirty) {
      console.log(`updating ${path}`)

      const file = `content/products/${path.substring(2)}`
      const url = `${HOST}/.netlify/git/github/contents/${file}`

      const get = await fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      if (!get.ok) {
        console.log(`GET failed: ${await get.text()}`)
        throw new Error("early exit")
      }

      const sha = (await get.json()).sha

      const buffer = Buffer.from(yaml.safeDump(product))

      const put = await fetch(url, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: `Order complete, updating ${path.substring(2)}`,
          content: buffer.toString("base64"),
          sha,
        }),
      })

      if (!put.ok) {
        console.log(`PUT failed: ${await put.text()}`)
        throw new Error("late exit")
      }
    }
  }
}
