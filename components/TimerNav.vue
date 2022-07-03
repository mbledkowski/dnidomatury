<template>
  <nav class="timer-nav">
    <nuxt-link :to="localePath('/')"
      ><p>{{ $t('timer.days') }}</p></nuxt-link
    >
    <nuxt-link :to="localePath('/hours')"
      ><p>{{ $t('timer.hours') }}</p></nuxt-link
    >
    <nuxt-link :to="localePath('/minutes')"
      ><p>{{ $t('timer.minutes') }}</p></nuxt-link
    >
    <nuxt-link :to="localePath('/seconds')"
      ><p>{{ $t('timer.seconds') }}</p></nuxt-link
    >
  </nav>
</template>
<script lang="ts">
export default {
  name: 'TimerNav',
}
</script>
<style lang="scss">
nav.timer-nav {
  @apply flex flex-row justify-evenly items-center mx-auto text-white bg-black rounded-none md:rounded-lg h-8 text-lg font-bold w-full md:w-96 lowercase my-8;
  a {
    @apply w-1/4 md:w-auto text-center;
    &.nuxt-link-exact-active {
      @apply text-yellow-300;
    }
    > p {
      @apply truncate;
    }
  }
}
</style>
