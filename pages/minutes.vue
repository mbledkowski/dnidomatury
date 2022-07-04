<template><Timer :data="data" mode="m" /></template>
<script lang="ts">
import Vue from 'vue'
import timerData from '~/mixins/timerData'

export default Vue.extend({
  name: 'TimerMinutes',
  mixins: [timerData],
})
</script>
