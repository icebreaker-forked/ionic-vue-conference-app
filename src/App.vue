<script lang="ts">
import type { Ref } from 'vue'
import { useStore } from '@/store'
import { Storage } from '@ionic/storage'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue'
import { defineComponent, onMounted, ref } from 'vue'
import SysMenu from './components/Menu.vue'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonSplitPane,
    IonRouterOutlet,
    SysMenu,
  },
  setup() {
    const dark: Ref<boolean> = ref(false)
    let globalStorage: Storage
    async function initializeStorage() {
      const storage = new Storage()
      await storage.create()
      return storage
    }
    const store = useStore()

    const handleDarkModeChanged = (newDarkValue: boolean) => {
      dark.value = newDarkValue
      document.documentElement.classList.toggle('ion-palette-dark', newDarkValue)
    }

    onMounted(async () => {
      globalStorage = await initializeStorage()
      store.dispatch('loadSessionData')
      store.dispatch('loadSpeakerData')
      await store.dispatch('fetchTracks')
    })

    return {
      dark,
      handleDarkModeChanged,
    }
  },
})
</script>

<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <SysMenu :dark="dark" @dark-mode-changed="handleDarkModeChanged" />
      <IonRouterOutlet id="main-content" />
    </IonSplitPane>
  </IonApp>
</template>

<style src='./theme/variables.css'></style>
