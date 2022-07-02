<template>
  <main class="timer">
    <Nav />
    <h1>{{ $t('timer.timeLeftDesc', { year }) }}</h1>
    <span></span>
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
    return {
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
    }
  },
})
</script>
