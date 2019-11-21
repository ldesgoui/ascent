<template>
  <div class="max-w-lg mx-auto flex flex-col">
    <h1 class="mb-4 lg:mb-8 ascent-text-heading text-gray-900">
      Contact<br />Us
    </h1>

    <div class="flex">
      <a
        class="p-4 inline-block"
        href="mailto:contact@ascent.gg"
        target="_blank"
        rel="noopener noreferrer"
        title="contact@ascent.gg"
      >
        <img src="~simple-icons/icons/mail-dot-ru.svg" class="w-6 lg:w-8" />
      </a>

      <a
        class="p-4 inline-block"
        href="https://twitter.com/ascentesports"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="~simple-icons/icons/twitter.svg" class="w-6 lg:w-8" />
      </a>
    </div>

    <hr class="my-10 w-1/2 mx-auto" />

    <form name="contact" data-netlify="true" class="flex flex-col">
      <input
        name="name"
        type="text"
        class="my-2 p-1 border shadow-inner font-ascent"
        placeholder="Your name"
      />

      <input
        name="email"
        type="email"
        class="my-2 p-1 border shadow-inner font-ascent"
        placeholder="Your email"
      />

      <textarea
        name="message"
        class="my-2 p-1 border shadow-inner font-ascent"
        placeholder="Your message"
      />

      <div class="my-4">
        <input type="submit" class="block mx-auto ascent-btn" value="Send" />
      </div>
    </form>
  </div>
</template>
