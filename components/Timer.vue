<template>
  <main class="timer">
    <Nav />
    <h1>{{ $t('timer.timeLeftDesc', { year: '2022' }) }}</h1>
    <span>{{ content }}</span>
    <span></span>
    <TimerNav />
    <p>{{ $t('timer.desc', { beginDate: '4 maja', endDate: '22 maja' }) }}</p>
  </main>
</template>

<script lang="ts">
export default {
  name: 'MainTimer',
  data() {
    return {
      content: [],
    }
  },
  async fetch() {
    this.content = await this.$content('data').fetch()
  },
}
</script>
