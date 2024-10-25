<script lang="ts">
import router from '@/router'
import { useSystemStore } from '@/store'

import { Storage } from '@ionic/storage'
import * as ionIcons from 'ionicons/icons'
import {
  calendar,
  informationCircle,
  map,
  people,
} from 'ionicons/icons'
import { computed, defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'SysMenu',
  props: {
    darkMode: Boolean,
  },
  emits: ['dark-mode-changed'],
  setup() {
    const instance = getCurrentInstance()
    const store = useSystemStore()
    const localDark = ref(false)
    const loggedIn = ref(false)
    const storage = new Storage()
    const updateDarkMode = (newDarkValue: boolean) => {
      instance?.emit('dark-mode-changed', newDarkValue)
    }
    watch(localDark, (newVal) => {
      updateDarkMode(newVal)
    })

    const isDarkMode = computed(() => store.isDarkMode)

    const setLocalDarkMode = (newDarkValue: boolean) => {
      localDark.value = newDarkValue
      updateDarkMode(newDarkValue)
    }

    const openTutorial = async () => {
      await storage.set('ion_did_tutorial', false)
      await router.push({ name: 'tutorial' })
    }

    const navigate = (url: string) => {
      router.push(url)
    }

    const logout = () => {
    }

    onMounted(async () => {
      await storage.create()
    })

    return {
      localDark,
      isDarkMode,
      setLocalDarkMode,
      openTutorial,
      navigate,
      logout,
      loggedIn,
      updateDarkMode,
    }
  },
  data() {
    return {
      ionIcons,
      calendar,
      people,
      map,
      informationCircle,
    }
  },
})
</script>

<template>
  <IonMenu content-id="main-content">
    <IonContent class="ion-padding">
      <IonList v-if="loggedIn" lines="none">
        <IonListHeader>
          Account
        </IonListHeader>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/account')">
            <IonIcon slot="start" :icon="ionIcons.person" />

            <IonLabel>
              Account
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/support')">
            <IonIcon slot="start" :icon="ionIcons.help" />

            <IonLabel>
              Support
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="logout()">
            <IonIcon slot="start" :icon="ionIcons.logOut" />

            <IonLabel>
              Logout
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
      <IonList v-if="!loggedIn" lines="none">
        <IonListHeader>
          Account
        </IonListHeader>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/login')">
            <IonIcon slot="start" :icon="ionIcons.logIn" />

            <IonLabel>
              Login
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/support')">
            <IonIcon slot="start" :icon="ionIcons.help" />

            <IonLabel>
              Support
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/signup')">
            <IonIcon slot="start" :icon="ionIcons.personAdd" />

            <IonLabel>
              Signup
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonItem>
          <IonIcon slot="start" :icon="ionIcons.moonOutline" />

          <IonToggle v-model="localDark" label-placement="start">
            Dark Mode
          </IonToggle>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
</template>
