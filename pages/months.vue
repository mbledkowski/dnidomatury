<template><Timer :data="data" mode="M" /></template>
<script lang="ts">
import Vue from 'vue'
import timerData from '~/mixins/timerData'

export default Vue.extend({
  name: 'TimerMonths',
  mixins: [timerData],
})
</script>
