<template>
  <nav class="main-nav">
    <nuxt-link :to="localePath('/calendar')">
      <CalendarIcon class="sub" />
      <p class="main">{{ $t('calendar') }}</p>
    </nuxt-link>
    <nuxt-link :to="localePath('/')">
      <TimerIcon class="sub" />
      <p class="main">{{ $t('timer.title') }}</p>
    </nuxt-link>
    <nuxt-link :to="localePath('/news')">
      <NewsIcon class="sub" />
      <p class="main">{{ $t('news') }}</p>
    </nuxt-link>
    <nuxt-link :to="localePath('/settings')">
      <SettingsIcon class="main" />
      <p class="sub">{{ $t('settings.title') }}</p>
    </nuxt-link>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
import CalendarIcon from '~/assets/icons/calendar.svg?inline'
import TimerIcon from '~/assets/icons/timer.svg?inline'
import NewsIcon from '~/assets/icons/news.svg?inline'
import SettingsIcon from '~/assets/icons/settings.svg?inline'
export default Vue.extend({
  name: 'MainNav',
  components: {
    CalendarIcon,
    TimerIcon,
    NewsIcon,
    SettingsIcon,
  },
})
</script>
<style lang="scss">
nav.main-nav {
  @apply flex flex-row justify-evenly items-center mx-auto text-white bg-black rounded-none md:rounded-lg h-16 md:h-8 text-lg font-bold w-full md:w-96 lowercase fixed bottom-0 z-10 md:static md:my-8;
  > a {
    @apply w-1/4 md:w-auto text-center;
    &.nuxt-link-exact-active {
      @apply text-yellow-300;
      > svg > path {
        fill: rgb(253 224 71 / var(--tw-text-opacity));
      }
    }
    > svg {
      @apply mx-auto;
      > path {
        fill: white;
      }
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
