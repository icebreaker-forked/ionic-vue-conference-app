<script lang="ts">
import router from '@/router'
import { useStore } from '@/store'

import { Storage } from '@ionic/storage'
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonToggle,
} from '@ionic/vue'
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
  components: {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonToggle,
  },
  props: {
    darkMode: Boolean,
  },
  emits: ['dark-mode-changed'],
  setup() {
    const instance = getCurrentInstance()
    const store = useStore()
    const localDark = ref(false)
    const loggedIn = ref(false)
    const storage = new Storage()
    const updateDarkMode = (newDarkValue: boolean) => {
      instance?.emit('dark-mode-changed', newDarkValue)
    }
    watch(localDark, (newVal) => {
      updateDarkMode(newVal)
    })

    const isDarkMode = computed(() => store.getters.isDarkMode)

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
      appPages: [
        {
          title: 'Schedule',
          url: '/tabs/schedule',
          name: 'tabs.schedule',
          icon: calendar,
        },
        {
          title: 'Speakers',
          url: '/tabs/speakers',
          icon: people,
        },
        {
          title: 'Map',
          url: '/tabs/map',
          icon: map,
        },
        {
          title: 'About',
          url: '/tabs/about',
          icon: informationCircle,
        },
      ],
    }
  },
})
</script>

<template>
  <IonMenu content-id="main-content">
    <IonContent class="ion-padding">
      <IonList lines="none">
        <IonListHeader>
          Navigate
        </IonListHeader>
        <IonMenuToggle v-for="p in appPages" :key="p.title" :auto-hide="false">
          <IonItem button @click="navigate(p.url)">
            <template #start>
              <IonIcon :icon="p.icon" />
            </template>
            <IonLabel>
              {{ p.title }}
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
      <IonList v-if="loggedIn" lines="none">
        <IonListHeader>
          Account
        </IonListHeader>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/account')">
            <template #start>
              <IonIcon :icon="ionIcons.person" />
            </template>
            <IonLabel>
              Account
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/support')">
            <template #start>
              <IonIcon :icon="ionIcons.help" />
            </template>
            <IonLabel>
              Support
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="logout()">
            <template #start>
              <IonIcon :icon="ionIcons.logOut" />
            </template>
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
            <template #start>
              <IonIcon :icon="ionIcons.logIn" />
            </template>
            <IonLabel>
              Login
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/support')">
            <template #start>
              <IonIcon :icon="ionIcons.help" />
            </template>
            <IonLabel>
              Support
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="navigate('/signup')">
            <template #start>
              <IonIcon :icon="ionIcons.personAdd" />
            </template>
            <IonLabel>
              Signup
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonItem>
          <template #start>
            <IonIcon :icon="ionIcons.moonOutline" />
          </template>
          <IonToggle v-model="localDark" label-placement="start">
            Dark Mode
          </IonToggle>
        </IonItem>
      </IonList>
      <IonList lines="none">
        <IonListHeader>
          Tutorial
        </IonListHeader>
        <IonMenuToggle :auto-hide="false">
          <IonItem button @click="openTutorial()">
            <template #start>
              <IonIcon :icon="ionIcons.hammer" />
            </template>
            <IonLabel>Show Tutorial</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
</template>
