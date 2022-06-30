<template>
  <div>
    <Nav />
    <main>
      <!-- Settings header -->
      <header>
        <h1 class="text-2xl font-sans">Settings</h1>
      </header>
      <!-- Dark mode switch -->
      <label>
        Dark mode
        <input v-model="darkMode" type="checkbox" />
        <span class="lever"></span>
      </label>
      <!-- Notifications switch -->
      <label>
        Notifications
        <input v-model="notifications" type="checkbox" />
        <span class="lever"></span>
      </label>
      <!-- Language select field -->
      <label>
        Language
        <select v-model="location" @change="onChange(location)">
          <option
            v-for="(locale, index) in $i18n.locales"
            :key="index"
            :value="locale"
          >
            {{ languages[locale] }}
          </option>
        </select>
      </label>
      <!-- Location select field -->
      <label>
        Location
        <select v-model="localisation">
          <option value="DŚL">dolnośląskie</option>
          <option value="KP">kujawsko-pomorskie</option>
          <option value="LBL">lubelskie</option>
          <option value="LBU">lubuskie</option>
          <option value="ŁDZ">łódzkie</option>
          <option value="MAZ">mazowieckie</option>
          <option value="MŁP">małopolskie</option>
          <option value="OPO">opolskie</option>
          <option value="PDL">podlaskie</option>
          <option value="PK">podkarpackie</option>
          <option value="POM">pomorskie</option>
          <option value="ŚL">śląskie</option>
          <option value="ŚW">świętokrzyskie</option>
          <option value="WLKP">wielkopolskie</option>
          <option value="WM">warmińsko-mazurskie</option>
          <option value="ZPM">zachodniopomorskie</option>
        </select>
      </label>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SettingsPage',
  data() {
    return {
      darkMode: false,
      notifications: false,
      location: this.$i18n.locale,
      localisation: 'POM',
      languages: {
        pl: 'Polish',
        en: 'English',
        ua: 'Ukrainian',
        fr: 'French',
        de: 'German',
        es: 'Spanish',
      },
    }
  },
  methods: {
    onChange(selectedLanguage: string) {
      this.$router.push(this.switchLocalePath(selectedLanguage))
    },
  },
})
</script>
