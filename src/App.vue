<script setup lang="ts">
import { useSystemStore } from '@/store'

const store = useSystemStore()

function handleDarkModeChanged(newDarkValue: boolean) {
  store.isDarkMode = newDarkValue
  // https://ionicframework.com/docs/theming/dark-mode#css-class
  document.documentElement.classList.toggle('ion-palette-dark', newDarkValue)
}
</script>

<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <SysMenu :dark="store.isDarkMode" @dark-mode-changed="handleDarkModeChanged" />
      <IonRouterOutlet id="main-content" />
    </IonSplitPane>
  </IonApp>
</template>

<style src='./theme/variables.css'></style>
