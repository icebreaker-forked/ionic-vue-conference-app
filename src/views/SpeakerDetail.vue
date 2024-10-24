<script lang="ts" setup>
import type { Speaker } from '@/store/modules/speakers'
import { useStore } from '@/store'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import {
  logoGithub,
  logoInstagram,
  logoTwitter,
} from 'ionicons/icons'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const speaker = computed(() => {
  return store.state.speakers.speakers.find((s: Speaker) => s.id === Number.parseInt(route.params.speakerId.toString()))
})

const store = useStore()
const route = useRoute()
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonBackButton text="Speakers" />
          </IonButtons>
        </template>
        <IonTitle>{{ speaker ? speaker.name : '' }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent padding class="speaker-detail">
      <div v-if="speaker" text-center>
        <img :src="speaker.profilePic" :alt="speaker.name">
        <br>
        <IonButton fill="clear" size="small" color="twitter">
          <template #icon-only>
            <IonIcon :icon="logoTwitter" />
          </template>
        </IonButton>
        <IonButton fill="clear" size="small" color="github">
          <template #icon-only>
            <IonIcon :icon="logoGithub" />
          </template>
        </IonButton>
        <IonButton fill="clear" size="small" color="instagram">
          <template #icon-only>
            <IonIcon :icon="logoInstagram" />
          </template>
        </IonButton>
      </div>

      <p>{{ speaker ? speaker.about : '' }}</p>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.speaker-detail img {
  max-width: 140px;
  border-radius: 50%;
}

.speaker-detail p {
  color: #60646b;
}
</style>
