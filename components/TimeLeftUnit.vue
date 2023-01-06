<template>
  <div>
    <p
      v-if="timeLeftMain >= 1 && timeLeftMain < 2"
      :value="Math.floor(timeLeftMain) + ' ' + $t(`timer.${firstValue}.one`)"
    >
      {{ Math.floor(timeLeftMain) + ' ' + $t(`timer.${firstValue}.one`) }}
    </p>
    <p
      v-else-if="timeLeftMain >= 2 && timeLeftMain < 5"
      :value="Math.floor(timeLeftMain) + ' ' + $t(`timer.${firstValue}.two`)"
    >
      {{ Math.floor(timeLeftMain) + ' ' + $t(`timer.${firstValue}.two`) }}
    </p>
    <p
      v-else
      :value="Math.floor(timeLeftMain) + ' ' + $t(`timer.${firstValue}.five`)"
    >
      {{ Math.floor(timeLeftMain) + ' ' + $t(`timer.${firstValue}.five`) }}
    </p>
    <p>
      <span
        v-if="timeLeft[secondValue] >= 1 && timeLeft[secondValue] < 2"
        :value="timeLeft[secondValue] + ' ' + $t(`timer.${secondValue}.one`)"
        >{{
          timeLeft[secondValue] + ' ' + $t(`timer.${secondValue}.one`)
        }}</span
      >
      <span
        v-else-if="timeLeft[secondValue] >= 2 && timeLeft[secondValue] < 5"
        :value="timeLeft[secondValue] + ' ' + $t(`timer.${secondValue}.two`)"
        >{{
          timeLeft[secondValue] + ' ' + $t(`timer.${secondValue}.two`)
        }}</span
      >
      <span
        v-else
        :value="timeLeft[secondValue] + ' ' + $t(`timer.${secondValue}.five`)"
      >
        {{
          timeLeft[secondValue] + ' ' + $t(`timer.${secondValue}.five`)
        }}</span
      >
      <span v-if="thirdValue !== undefined">
        <span
          v-if="timeLeft[thirdValue] >= 1 && timeLeft[thirdValue] < 2"
          :value="timeLeft[thirdValue] + ' ' + $t(`timer.${thirdValue}.one`)"
          >{{
            timeLeft[thirdValue] + ' ' + $t(`timer.${thirdValue}.one`)
          }}</span
        >
        <span
          v-else-if="timeLeft[thirdValue] >= 2 && timeLeft[thirdValue] < 5"
          :value="timeLeft[thirdValue] + ' ' + $t(`timer.${thirdValue}.two`)"
          >{{
            timeLeft[thirdValue] + ' ' + $t(`timer.${thirdValue}.two`)
          }}</span
        >
        <span
          v-else
          :value="timeLeft[thirdValue] + ' ' + $t(`timer.${thirdValue}.five`)"
          >{{
            timeLeft[thirdValue] + ' ' + $t(`timer.${thirdValue}.five`)
          }}</span
        >
      </span>
    </p>
  </div>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    timeLeftMain: {
      type: Number,
      required: true,
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
    firstValue: {
      type: String,
      required: true,
    },
    secondValue: {
      type: String,
      required: true,
    },
    thirdValue: {
      type: String,
      default: undefined,
    },
  },
})
</script>
