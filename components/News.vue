<template>
  <div>
    <Nav />
    <main class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>{{ title }}</h1>
          <p>{{ message }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainNews',
  data() {
    return {
      title: 'News',
      message: 'This is the news page.',
    }
  },
}
</script>
