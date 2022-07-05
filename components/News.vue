<template>
  <div>
    <Nav />
    <main class="news">
      <div v-if="news.length > 0">
        <div v-for="(item, index) in news" :key="index">
          <h2>{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </div>
      </div>
      <div v-else>
        <p>{{ $t('news.noNews') }}</p>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainNews',
  props: {
    news: {
      type: Array,
      required: true,
    },
  },
}
</script>
