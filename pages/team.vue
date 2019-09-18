<template>
  <div>
    <ascent-team
      v-for="team in teams"
      :id="team.slug"
      :key="team.slug"
      :team="team"
      class="mb-16"
    />
  </div>
</template>

<script>
import AscentTeam from "~/components/team.vue"

export default {
  head: {
    title: "The Team",
  },

  components: {
    AscentTeam,
  },

  async asyncData() {
    const pCtx = await require.context("~/content/players", false, /\.ya?ml$/)
    const tCtx = await require.context("~/content/teams", false, /\.ya?ml$/)

    const playerByName = pCtx
      .keys()
      .map(pCtx)
      .reduce((a, p) => ({ ...a, [p.name]: p }), {})

    const teams = tCtx
      .keys()
      .map(tCtx)
      .map(team => ({
        ...team,
        players: team.players.map(name => playerByName[name]),
      }))

    teams.sort((a, b) => parseInt(a.order) - parseInt(b.order))

    return {
      teams,
    }
  },
}
</script>
