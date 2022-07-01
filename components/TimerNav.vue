<template>
  <nav class="timer-nav">
    <nuxt-link to="/"><p>days</p></nuxt-link>
    <nuxt-link to="/hours"><p>hours</p></nuxt-link>
    <nuxt-link to="/minutes"><p>minutes</p></nuxt-link>
    <nuxt-link to="/seconds"><p>seconds</p></nuxt-link>
  </nav>
</template>
<script lang="ts">
export default {
  name: 'TimerNav',
}
</script>
<style lang="scss">
nav.timer-nav {
  @apply flex flex-row justify-evenly items-center mx-auto text-white bg-black rounded-none md:rounded-lg h-8 text-lg font-bold w-full md:w-96 lowercase md:my-8;
  > a {
    @apply w-1/4 md:w-auto text-center;
    > p {
      @apply truncate;
    }
  }
}
</style>
