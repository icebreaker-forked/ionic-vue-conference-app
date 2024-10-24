<script lang="ts" setup>
import store from '@/store'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  modalController,
} from '@ionic/vue'
import * as ionIcons from 'ionicons/icons'
import { onMounted, ref } from 'vue'

const props = defineProps({
  excludedTracks: {
    type: Array,
    default: () => [],
  },
  allTracks: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits<{
  (e: 'filtersSelected', val: string[]): void
}>()
const tracks = ref<{ name: string, icon: string, isChecked: boolean }[]>([])

const isFirstLoad = store.state.sessions.isFirstLoad

onMounted(() => {
  const availableTracks = props.allTracks.length ? props.allTracks : []
  const selectedTrackFilters = store.state.sessions.selectedTrackFilters

  tracks.value = availableTracks.map((track: any) => ({
    name: track.name,
    icon: (ionIcons as any)[track.icon],
    isChecked: isFirstLoad ? true : selectedTrackFilters.includes(track.name),
  }))

  if (isFirstLoad) {
    store.commit('setFirstLoad', false)
  }
})

const dismiss = () => modalController.dismiss()

function applyFilters() {
  const newSelectedTrackNames = tracks.value
    .filter(t => t.isChecked)
    .map(t => t.name)

  store.dispatch('setSelectedTrackFilters', newSelectedTrackNames)

  emit('filtersSelected', newSelectedTrackNames)
  dismiss()
}

function selectAll(check: boolean) {
  tracks.value.forEach(track => (track.isChecked = check))
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonButton @click="dismiss">
              Cancel
            </IonButton>
          </IonButtons>
        </template>
        <IonTitle>
          Filter Sessions
        </IonTitle>
        <template #end>
          <IonButtons>
            <IonButton strong @click="applyFilters">
              Done
            </IonButton>
          </IonButtons>
        </template>
      </IonToolbar>
    </IonHeader>

    <IonContent class="outer-content">
      <IonList>
        <IonListHeader>Tracks</IonListHeader>
        <IonItem v-for="track in tracks" :key="track.name">
          <template #start>
            <IonIcon :icon="track.icon" color="primary" />
          </template>
          <IonToggle :checked="track.isChecked" color="success" @ionChange="track.isChecked = !track.isChecked">
            {{ track.name }}
          </IonToggle>
        </IonItem>
      </IonList>
    </IonContent>
    <IonFooter :translucent="true">
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonButton @click="selectAll(false)">
              Deselect All
            </IonButton>
          </IonButtons>
        </template>
        <template #end>
          <IonButtons>
            <IonButton @click="selectAll(true)">
              Select All
            </IonButton>
          </IonButtons>
        </template>
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<style scoped></style>
