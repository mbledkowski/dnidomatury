<template><Timer :data="data" /></template>
<script lang="ts">
import Vue from 'vue'
import timerData from '~/mixins/timerData'

export default Vue.extend({
  name: 'TimerSeconds',
  mixins: [timerData],
})
</script>
