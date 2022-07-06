<template>
  <div>
    <Nav />
    <main class="timer">
      <h1>
        <b>{{ $t('timer.timeLeftDesc', { year }) }}</b>
      </h1>
      <div id="mainTimer">
        <TimeLeft
          :mode="mode"
          :time-left="timeLeft"
          :time-left-main="timeLeftMain"
        />
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
import TimeLeft from './TimeLeft.vue'
dayjs.extend(duration)

export default Vue.extend({
  name: 'MainTimer',
  components: { TimeLeft },
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
<style lang="scss">
#mainTimer > div > div > p:first-child {
  font-size: 130px;
  @apply font-bold text-yellow-300;
  &::before {
    content: attr(value);
    position: absolute;
    @apply text-black;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 4.6px black;
    margin: 6px;
  }
}
</style>
