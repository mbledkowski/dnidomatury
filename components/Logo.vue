<template>
  <p id="logo">dnidomatury.pl</p>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MainLogo',
})
</script>
<style lang="scss">
#logo {
  @apply text-center font-bold text-6xl my-8 overflow-hidden text-ellipsis;
}
</style>
