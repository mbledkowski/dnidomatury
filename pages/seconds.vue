<template><Timer :data="data" mode="s" /></template>
<script lang="ts">
import Vue from 'vue'
import timerData from '~/mixins/timerData'

export default Vue.extend({
  name: 'TimerSeconds',
  mixins: [timerData],
})
</script>
