<script setup lang="ts">
import { dateFormat } from '@/filters/dateFormat'
import {
  alertController,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  loadingController,
  menuController,
  modalController,
  useIonRouter,
} from '@ionic/vue'
import {
  logoFacebook,
  logoGoogle,
  logoTwitter,
  logoVenmo,
  options,
  shareSocial,
} from 'ionicons/icons'

import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import SessionListFilter from './SessionListFilter.vue'

interface GroupedSession {
  id: string
  startTime: string
  sessions: Session[]
}

interface Session {
  id: number
  dateTimeStart: string
  dateTimeEnd: string
  name: string
  location: string
  description: string
  speakerIds: number[]
  tracks: string[]
}

const segment = ref('all')
const queryText = ref('')
const fab = ref<HTMLIonFabElement | null>(null)
const fabButton = ref(null)
const fabList = ref(null)
const store = useStore()
const ionRouter = useIonRouter()
const allGroupedRef = ref<GroupedSession[]>([])
const allGroupedComputed = computed(() => {
  return allGroupedRef.value
})

function groupedByStartTime(sessions: Session[]): GroupedSession[] {
  const sortedSessions = [...sessions].sort(
    (a, b) =>
      new Date(a.dateTimeStart).getTime() - new Date(b.dateTimeStart).getTime(),
  )

  const groups: GroupedSession[] = sortedSessions.reduce(
    (acc: GroupedSession[], curr: Session) => {
      const sessionDate = new Date(curr.dateTimeStart)
      sessionDate.setMinutes(0, 0, 0)
      const startTime = sessionDate.toISOString()

      const existingGroup = acc.find(group => group.startTime === startTime)

      if (existingGroup) {
        existingGroup.sessions.push(curr)
      }
      else {
        acc.push({ startTime, sessions: [curr] } as any)
      }

      return acc
    },
    [],
  )

  return groups
}

const allGrouped = computed(() => {
  if (segment.value === 'all') {
    return groupedByStartTime(store.getters.allFiltered)
  }
  else {
    return groupedByStartTime(store.getters.favoritesFiltered)
  }
})

watch(allGrouped, (newValue) => {
  allGroupedRef.value = newValue
})

// Simulate dispatching the action
function addTrackFilter(trackName: string) {
  store.dispatch('addTrackFilter', trackName)
}

// Simulate dispatching the action
function removeTrackFilter(trackName: string) {
  store.dispatch('removeTrackFilter', trackName)
}

function getLabelStyle(track: any) {
  const colorVar = track === 'Ionic' ? 'primary' : track.toLowerCase()
  return {
    borderLeft: `2px solid var(--ion-color-${colorVar})`,
    paddingLeft: '10px',
  }
}

async function addFavorite(event: any, session: any) {
  if (store.state.sessions.favoriteSessions.includes(session.id)) {
    removeFavorite(event, session, 'Favorite already added')
  }
  else {
    store.dispatch('addFavorite', session.id)

    const alert = await alertController.create({
      header: 'Favorite Added',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            const slidingItem = event.target.closest('ion-item-sliding')
            slidingItem.close()
          },
        },
      ],
    })
    await alert.present()
  }
}

async function removeFavorite(event: any, session: any, title: any) {
  const alert = await alertController.create({
    header: title,
    message: 'Would you like to remove this session from your favorites?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          const slidingItem = event.target.closest('ion-item-sliding')
          slidingItem.close()
        },
      },
      {
        text: 'Remove',
        handler: () => {
          store.dispatch('removeFavorite', session.id)

          const slidingItem = event.target.closest('ion-item-sliding')
          slidingItem.close()
        },
      },
    ],
  })
  await alert.present()
}

function goToSessionDetail(session: any) {
  ionRouter.push({
    name: 'session-detail',
    params: { sessionId: session.id.toString() },
  })
}

async function presentFilter() {
  const modal = await modalController.create({
    component: SessionListFilter,
    presentingElement: IonRouterOutlet.nativeEl,
    componentProps: {
      excludedTracks: store.state.sessions.trackFilters,
      allTracks: store.getters.allTracksFilter,
    },
  })

  modal.componentProps!.onFiltersSelected = async (selectedTrackNames: any) => {
    if (selectedTrackNames.length === 0) {
      allGroupedRef.value = []
    }
    else {
      await store.dispatch('loadSessionData')
      await store.dispatch('loadSpeakerData')
      await store.dispatch('fetchTracks')
      const previousTrackFilters = store.state.sessions.trackFilters
      const addedTrackFilters = selectedTrackNames.filter(
        (track: any) => !previousTrackFilters.includes(track),
      )
      const removedTrackFilters = previousTrackFilters.filter(
        (track: any) => !selectedTrackNames.includes(track),
      )

      addedTrackFilters.forEach((track: any) =>
        store.dispatch('addTrackFilter', track),
      )
      removedTrackFilters.forEach((track: any) =>
        store.dispatch('removeTrackFilter', track),
      )
    }
  }

  await modal.present()
}

function updateSegment(e: any) {
  segment.value = e.detail.value
}

function updateSearchTerm(e: any) {
  store.dispatch('setSearchText', e.detail.value)
}

async function openSocial(network: any) {
  if (fab.value) {
    const loading = await loadingController.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000 + 500) as number,
    })
    await loading.present()
    await loading.onWillDismiss()
    fab.value.close()
  }
}

async function checkAndLoadData() {
  if (allGroupedRef.value.length === 0) {
    await store.dispatch('loadSessionData')
    await store.dispatch('loadSpeakerData')
    await store.dispatch('fetchTracks')
  }
}

onMounted(() => {
  menuController.enable(true)
  checkAndLoadData()
  watch(
    () => store.getters.allFiltered,
    (newAllFiltered) => {
      allGroupedRef.value = groupedByStartTime(newAllFiltered)
    },
  )
})
</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonMenuButton />
          </IonButtons>
        </template>

        <IonSegment :value="segment" @ionChange="updateSegment">
          <IonSegmentButton value="all">
            All
          </IonSegmentButton>
          <IonSegmentButton value="favorites">
            Favorites
          </IonSegmentButton>
        </IonSegment>

        <template #end>
          <IonButtons>
            <IonButton @click="presentFilter">
              <template v-slot:icon-only>
<IonIcon  :icon="options" />
</template>
            </IonButton>
          </IonButtons>
        </template>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            Schedule
          </IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            v-model="queryText"
            :debounce="500"
            placeholder="Search"
            @ionInput="updateSearchTerm($event)"
          />
        </IonToolbar>
      </IonHeader>
      <IonList v-show="allGroupedComputed?.length > 0">
        <IonItemGroup v-for="group in allGroupedComputed" :key="group.id">
          <IonItemDivider sticky>
            <IonLabel>{{ dateFormat(group.startTime, "h:mm a") }}</IonLabel>
          </IonItemDivider>

          <IonItemSliding
            v-for="session in group.sessions"
            :key="session.id"
            :data-track="session.tracks[0].toLowerCase()"
          >
            <IonItem button @click="goToSessionDetail(session)">
              <IonLabel :style="getLabelStyle(session.tracks[0])">
                <h3>{{ session.tracks[0] }} - {{ session.name }}</h3>
                <p>
                  {{ dateFormat(session.dateTimeStart, "h:mm a") }} &mdash;
                  {{ dateFormat(session.dateTimeEnd, "h:mm a") }}:
                  {{ session.location }}
                </p>
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption
                v-if="segment === 'all'"
                color="favorite"
                @click="addFavorite($event, session)"
              >
                Favorite
              </IonItemOption>
              <IonItemOption
                v-if="segment === 'favorites'"
                color="danger"
                @click="removeFavorite($event, session, 'Remove Favorite')"
              >
                Remove
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonItemGroup>
      </IonList>

      <IonListHeader v-show="allGroupedComputed?.length === 0">
        No Sessions Found
      </IonListHeader>
      <template #fixed>
        <IonFab ref="fab" vertical="bottom" horizontal="end">
          <IonFabButton ref="fabButton">
            <IonIcon :icon="shareSocial" />
          </IonFabButton>
          <IonFabList ref="fabList" side="top">
            <IonFabButton color="vimeo" @click="openSocial('Vimeo')">
              <IonIcon :icon="logoVenmo" />
            </IonFabButton>
            <IonFabButton color="google" @click="openSocial('Google+')">
              <IonIcon :icon="logoGoogle" />
            </IonFabButton>
            <IonFabButton color="twitter" @click="openSocial('Twitter')">
              <IonIcon :icon="logoTwitter" />
            </IonFabButton>
            <IonFabButton color="facebook" @click="openSocial('Facebook')">
              <IonIcon :icon="logoFacebook" />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </template>
    </IonContent>
  </IonPage>
</template>

<style scoped></style>

<style scoped>
  ion-fab-button {
  --background: var(--ion-color-step-150, #ffffff);
  --background-hover: var(--ion-color-step-200, #f2f2f2);
  --background-focused: var(--ion-color-step-250, #d9d9d9);
  --color: var(--ion-color-primary, #3880ff);
}

/*
   * Material Design uses the ripple for activated
   * so only style the iOS activated background
   */
.ios ion-fab-button {
  --background-activated: var(--ion-color-step-250, #d9d9d9);
}
</style>
