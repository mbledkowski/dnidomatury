<template>
  <div>
    <Nav />
    <main class="timer">
      <h1>
        <b>{{ $t('timer.timeLeftDesc', { year }) }}</b>
      </h1>
      <div v-if="mode === 'M'">
        <p v-if="timeLeftMain >= 1 && timeLeftMain < 2">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.months.one') }}
        </p>
        <p v-else-if="timeLeftMain >= 2 && timeLeftMain < 5">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.months.two') }}
        </p>
        <p v-else>
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.months.five') }}
        </p>
        <p>
          <span v-if="timeLeft.days >= 1 && timeLeft.days < 2">{{
            timeLeft.days + ' ' + $t('timer.days.one')
          }}</span>
          <span v-else-if="timeLeft.days >= 2 && timeLeft.days < 5">{{
            timeLeft.days + ' ' + $t('timer.days.two')
          }}</span>
          <span v-else>{{ timeLeft.days + ' ' + $t('timer.days.five') }}</span>
          <span v-if="timeLeft.hours >= 1 && timeLeft.hours < 2">{{
            timeLeft.hours + ' ' + $t('timer.hours.one')
          }}</span>
          <span v-else-if="timeLeft.hours >= 2 && timeLeft.hours < 5">{{
            timeLeft.hours + ' ' + $t('timer.hours.two')
          }}</span>
          <span v-else>{{
            timeLeft.hours + ' ' + $t('timer.hours.five')
          }}</span>
        </p>
      </div>
      <div v-else-if="mode === 'd'">
        <p v-if="timeLeftMain >= 1 && timeLeftMain < 2">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.days.one') }}
        </p>
        <p v-else-if="timeLeftMain >= 2 && timeLeftMain < 5">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.days.two') }}
        </p>
        <p v-else>
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.days.five') }}
        </p>
        <p>
          <span v-if="timeLeft.hours >= 1 && timeLeft.hours < 2">{{
            timeLeft.hours + ' ' + $t('timer.hours.one')
          }}</span>
          <span v-else-if="timeLeft.hours >= 2 && timeLeft.hours < 5">{{
            timeLeft.hours + ' ' + $t('timer.hours.two')
          }}</span>
          <span v-else>{{
            timeLeft.hours + ' ' + $t('timer.hours.five')
          }}</span>
          <span v-if="timeLeft.minutes >= 1 && timeLeft.minutes < 2">{{
            timeLeft.minutes + ' ' + $t('timer.minutes.one')
          }}</span>
          <span v-else-if="timeLeft.minutes >= 2 && timeLeft.minutes < 5">{{
            timeLeft.minutes + ' ' + $t('timer.minutes.two')
          }}</span>
          <span v-else>{{
            timeLeft.minutes + ' ' + $t('timer.minutes.five')
          }}</span>
        </p>
      </div>
      <div v-else-if="mode === 'h'">
        <p v-if="timeLeftMain >= 1 && timeLeftMain < 2">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.hours.one') }}
        </p>
        <p v-else-if="timeLeftMain >= 2 && timeLeftMain < 5">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.hours.two') }}
        </p>
        <p v-else>
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.hours.five') }}
        </p>
        <p>
          <span v-if="timeLeft.minutes >= 1 && timeLeft.minutes < 2">{{
            timeLeft.minutes + ' ' + $t('timer.minutes.one')
          }}</span>
          <span v-else-if="timeLeft.minutes >= 2 && timeLeft.minutes < 5">{{
            timeLeft.minutes + ' ' + $t('timer.minutes.two')
          }}</span>
          <span v-else>{{
            timeLeft.minutes + ' ' + $t('timer.minutes.five')
          }}</span>
          <span v-if="timeLeft.seconds >= 1 && timeLeft.seconds < 2">{{
            timeLeft.seconds + ' ' + $t('timer.seconds.one')
          }}</span>
          <span v-else-if="timeLeft.seconds >= 2 && timeLeft.seconds < 5">{{
            timeLeft.seconds + ' ' + $t('timer.seconds.two')
          }}</span>
          <span v-else>{{
            timeLeft.seconds + ' ' + $t('timer.seconds.five')
          }}</span>
        </p>
      </div>
      <div v-else-if="mode === 'm'">
        <p v-if="timeLeftMain >= 1 && timeLeftMain < 2">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.minutes.one') }}
        </p>
        <p v-else-if="timeLeftMain >= 2 && timeLeftMain < 5">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.minutes.two') }}
        </p>
        <p v-else>
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.minutes.five') }}
        </p>
        <p>
          <span v-if="timeLeft.seconds >= 1 && timeLeft.seconds < 2">{{
            timeLeft.seconds + ' ' + $t('timer.seconds.one')
          }}</span>
          <span v-else-if="timeLeft.seconds >= 2 && timeLeft.seconds < 5">{{
            timeLeft.seconds + ' ' + $t('timer.seconds.two')
          }}</span>
          <span v-else>{{
            timeLeft.seconds + ' ' + $t('timer.seconds.five')
          }}</span>
          <span
            v-if="timeLeft.milliseconds >= 1 && timeLeft.milliseconds < 2"
            >{{
              timeLeft.milliseconds + ' ' + $t('timer.milliseconds.one')
            }}</span
          >
          <span
            v-else-if="timeLeft.milliseconds >= 2 && timeLeft.milliseconds < 5"
            >{{
              timeLeft.milliseconds + ' ' + $t('timer.milliseconds.two')
            }}</span
          >
          <span v-else>{{
            timeLeft.milliseconds + ' ' + $t('timer.milliseconds.five')
          }}</span>
        </p>
      </div>
      <div v-else>
        <p v-if="timeLeftMain >= 1 && timeLeftMain < 2">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.seconds.one') }}
        </p>
        <p v-else-if="timeLeftMain >= 2 && timeLeftMain < 5">
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.seconds.two') }}
        </p>
        <p v-else>
          {{ Math.floor(timeLeftMain) + ' ' + $t('timer.seconds.five') }}
        </p>
        <p>
          <span
            v-if="timeLeft.milliseconds >= 1 && timeLeft.milliseconds < 2"
            >{{
              timeLeft.milliseconds + ' ' + $t('timer.milliseconds.one')
            }}</span
          >
          <span
            v-else-if="timeLeft.milliseconds >= 2 && timeLeft.milliseconds < 5"
            >{{
              timeLeft.milliseconds + ' ' + $t('timer.milliseconds.two')
            }}</span
          >
          <span v-else>{{
            timeLeft.milliseconds + ' ' + $t('timer.milliseconds.five')
          }}</span>
        </p>
      </div>
      <TimerNav />
      <p
        v-html="
          $t('timer.desc', {
            beginDate: beginDateFormated,
            endDate: endDateFormated,
            schoolEndDate: schoolEndDateFormated,
          })
        "
      ></p>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import 'dayjs/locale/uk'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export default Vue.extend({
  name: 'MainTimer',
  props: {
    data: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    interface Data {
      beginDate: Date
      beginDateFormated: string
      endDate: Date
      endDateFormated: string
      schoolEndDate: Date
      schoolEndDateFormated: string
      year: string
      timer: NodeJS.Timer | null
      timeLeftMain: number
      timeLeft: {
        months: number
        days: number
        hours: number
        minutes: number
        seconds: number
        milliseconds: number
      }
    }
    const data: Data = {
      beginDate: new Date(this.data.beginDate),
      beginDateFormated: dayjs(this.data.beginDate)
        .locale(this.$i18n.locale)
        .format('D MMMM'),
      endDate: new Date(this.data.endDate),
      endDateFormated: dayjs(this.data.endDate)
        .locale(this.$i18n.locale)
        .format('D MMMM'),
      schoolEndDate: new Date(this.data.schoolEndDate),
      schoolEndDateFormated: dayjs(this.data.schoolEndDate)
        .locale(this.$i18n.locale)
        .format('D MMMM'),
      year: this.data.slug,
      timer: null,
      timeLeftMain: 0,
      timeLeft: {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
    }
    return data
  },
  mounted() {
    this.start()
  },
  beforeDestroy() {
    this.stop()
  },
  methods: {
    getTimeLeftMain() {
      const currentDate = new Date()
      const beginDate = new Date(this.data.beginDate)
      const endDate = new Date(this.data.endDate)
      let timeLeft = 0
      if (currentDate >= beginDate && currentDate <= endDate) {
        timeLeft = dayjs(endDate).diff(currentDate, this.mode, true)
      } else if (currentDate >= endDate) {
        timeLeft = 0
      } else {
        timeLeft = dayjs(beginDate).diff(currentDate, this.mode, true)
      }
      return timeLeft
    },
    getTimerLeftSub() {
      const duration = dayjs.duration(this.timeLeftMain, this.mode)
      const result = {
        months: duration.months(),
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
        milliseconds: Math.floor(duration.milliseconds()),
      }
      return result
    },
    start() {
      this.timer = setInterval(() => {
        this.timeLeftMain = this.getTimeLeftMain()
        this.timeLeft = this.getTimerLeftSub()
      }, 125)
    },
    stop() {
      if (this.timer !== null) {
        clearInterval(this.timer)
      }
    },
  },
})
</script>
