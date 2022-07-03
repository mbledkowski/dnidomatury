<template>
  <main class="timer">
    <Nav />
    <h1>{{ $t('timer.timeLeftDesc', { year }) }}</h1>
    <span>{{ timeLeft }}</span>
    <TimerNav />
    <p>
      {{
        $t('timer.desc', {
          beginDate: beginDateFormated,
          endDate: endDateFormated,
          schoolEndDate: schoolEndDateFormated,
        })
      }}
    </p>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import 'dayjs/locale/uk'

export default Vue.extend({
  name: 'MainTimer',
  props: ['data'],
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
      timeLeft: number
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
      timeLeft: 0,
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
        timeLeft = dayjs(endDate).diff(currentDate, 'day', true)
      } else if (currentDate >= endDate) {
        timeLeft = 0
      } else {
        timeLeft = dayjs(beginDate).diff(currentDate, 'day', true)
      }
      return timeLeft
    },
    start() {
      this.timer = setInterval(() => {
        this.timeLeft = this.getTimeLeftMain()
      }, 1000)
    },
    stop() {
      if (this.timer !== null) {
        clearInterval(this.timer)
      }
    },
  },
})
</script>
