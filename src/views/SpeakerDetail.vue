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
        <IonButtons slot="start">
          <IonBackButton text="Speakers" />
        </IonButtons>

        <IonTitle>{{ speaker ? speaker.name : '' }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent padding class="speaker-detail">
      <div v-if="speaker" text-center>
        <img :src="speaker.profilePic" :alt="speaker.name">
        <br>
        <IonButton fill="clear" size="small" color="twitter">
          <IonIcon slot="icon-only" :icon="logoTwitter" />
        </IonButton>
        <IonButton fill="clear" size="small" color="github">
          <IonIcon slot="icon-only" :icon="logoGithub" />
        </IonButton>
        <IonButton fill="clear" size="small" color="instagram">
          <IonIcon slot="icon-only" :icon="logoInstagram" />
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
