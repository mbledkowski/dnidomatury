<template>
  <div>
    <Nav />
    <main>
      <!-- Settings header -->
      <header>
        <h1 class="text-2xl font-sans">{{ $t('settings.title') }}</h1>
      </header>
      <!-- Dark mode switch -->
      <label>
        <p>{{ $t('settings.darkMode') }}</p>
        <input v-model="darkMode" type="checkbox" />
        <span class="lever"></span>
      </label>
      <!-- Notifications switch -->
      <label>
        <p>{{ $t('settings.notifications') }}</p>
        <input v-model="notifications" type="checkbox" />
        <span class="lever"></span>
      </label>
      <!-- Language select field -->
      <label>
        <p>{{ $t('settings.language') }}</p>
        <select v-model="location" @change="onChange(location)">
          <option
            v-for="(locale, index) in $i18n.locales"
            :key="index"
            :value="locale.code"
          >
            {{ languages[locale.code] }}
          </option>
        </select>
      </label>
      <!-- Location select field -->
      <label>
        <p>{{ $t('settings.localization.title') }}</p>
        <select v-model="localization">
          <option value="DŚL">
            {{ $t('settings.localization.dolnośląskie') }}
          </option>
          <option value="KP">
            {{ $t('settings.localization.kujawskoPomorskie') }}
          </option>
          <option value="LBL">
            {{ $t('settings.localization.lubelskie') }}
          </option>
          <option value="LBU">
            {{ $t('settings.localization.lubuskie') }}
          </option>
          <option value="ŁDZ">{{ $t('settings.localization.łódzkie') }}</option>
          <option value="MAZ">
            {{ $t('settings.localization.mazowieckie') }}
          </option>
          <option value="MŁP">
            {{ $t('settings.localization.małopolskie') }}
          </option>
          <option value="OPO">
            {{ $t('settings.localization.opolskie') }}
          </option>
          <option value="PDL">
            {{ $t('settings.localization.podlaskie') }}
          </option>
          <option value="PK">
            {{ $t('settings.localization.podkarpackie') }}
          </option>
          <option value="POM">
            {{ $t('settings.localization.pomorskie') }}
          </option>
          <option value="ŚL">{{ $t('settings.localization.śląskie') }}</option>
          <option value="ŚW">
            {{ $t('settings.localization.świętokrzyskie') }}
          </option>
          <option value="WLKP">
            {{ $t('settings.localization.wielkopolskie') }}
          </option>
          <option value="WM">
            {{ $t('settings.localization.warmińskoMazurskie') }}
          </option>
          <option value="ZPM">
            {{ $t('settings.localization.zachodniopomorskie') }}
          </option>
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
      localization: 'POM',
      languages: {
        pl: 'Polski',
        en: 'English',
        uk: 'Українська',
        fr: 'Français',
        de: 'Deutsch',
        es: 'Español',
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
