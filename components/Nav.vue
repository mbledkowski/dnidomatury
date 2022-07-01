<template>
  <nav>
    <nuxt-link to="/calendar">
      <img
        src="/icons/calendar.svg"
        alt="calendar"
        class="sub nav-icon invert"
      />
      <p class="main">{{ $t('calendar') }}</p>
    </nuxt-link>
    <nuxt-link to="/">
      <img src="/icons/timer.svg" alt="timer" class="sub nav-icon invert" />
      <p class="main">{{ $t('timer') }}</p>
    </nuxt-link>
    <nuxt-link to="/news">
      <img src="/icons/news.svg" alt="news" class="sub nav-icon invert" />
      <p class="main">{{ $t('news') }}</p>
    </nuxt-link>
    <nuxt-link to="/settings">
      <img
        src="/icons/settings.svg"
        alt="settings"
        class="main nav-icon invert"
      />
      <p class="sub">{{ $t('settings.title') }}</p>
    </nuxt-link>
  </nav>
</template>
<script>
export default {
  name: 'MainNav',
}
</script>
<style lang="scss">
nav {
  @apply flex flex-row justify-evenly items-center mx-auto text-white bg-black rounded-none md:rounded-lg h-16 md:h-8 text-lg font-bold w-full md:w-96 lowercase fixed bottom-0 z-10 md:static md:my-8;
  > a {
    @apply w-1/4 md:w-auto text-center;
    > img {
      @apply mx-auto;
    }
    > p {
      @apply truncate;
    }
  }
}
.sub {
  @apply visible;
  @apply md:hidden;
}
</style>
