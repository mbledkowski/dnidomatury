<template>
  <div v-if="mode === 'M'">
    <TimeLeftUnit
      :time-left-main="timeLeftMain"
      :time-left="timeLeft"
      first-value="months"
      second-value="days"
      third-value="minutes"
    />
  </div>
  <div v-else-if="mode === 'd'">
    <TimeLeftUnit
      :time-left-main="timeLeftMain"
      :time-left="timeLeft"
      first-value="days"
      second-value="hours"
      third-value="minutes"
    />
  </div>
  <div v-else-if="mode === 'h'">
    <TimeLeftUnit
      :time-left-main="timeLeftMain"
      :time-left="timeLeft"
      first-value="hours"
      second-value="minutes"
      third-value="seconds"
    />
  </div>
  <div v-else-if="mode === 'm'">
    <TimeLeftUnit
      :time-left-main="timeLeftMain"
      :time-left="timeLeft"
      first-value="minutes"
      second-value="seconds"
      third-value="milliseconds"
    />
  </div>
  <div v-else>
    <TimeLeftUnit
      :time-left-main="timeLeftMain"
      :time-left="timeLeft"
      first-value="seconds"
      second-value="milliseconds"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import TimeLeftUnit from './TimeLeftUnit.vue'

export default Vue.extend({
  name: 'TimeLeft',
  components: { TimeLeftUnit },
  props: {
    mode: {
      type: String,
      default: 's',
    },
    timeLeft: {
      type: Object,
      default: () => ({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
    },
    timeLeftMain: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      timeValues: ['days', 'hours', 'minutes', 'seconds', 'milliseconds'],
    }
  },
})
</script>
