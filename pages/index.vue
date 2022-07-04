<template>
  <Timer :data="data" mode="d" />
</template>

<script lang="ts">
import Vue from 'vue'
import timerData from '~/mixins/timerData'

export default Vue.extend({
  name: 'TimerDays',
  mixins: [timerData],
})
</script>
