<script lang="ts" setup>
import type { Session } from '@/store/modules/sessions'
import type { Speaker } from '@/store/modules/speakers'
import { useStore } from '@/store'
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  loadingController,
} from '@ionic/vue'
import { chatbubbles, logoTwitter, share } from 'ionicons/icons'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const speakers = computed(() => store.state.speakers.speakers.concat().sort())

function sessionsBySpeaker(speakerId: number) {
  return store.state.sessions.sessions.filter((s: Session) =>
    s.speakerIds.includes(speakerId),
  )
}

function goToSessionDetail(session: Session) {
  router.push({
    name: 'speaker-session-detail',
    params: { sessionId: session.id.toString() },
  })
}

function goToSpeakerDetail(speaker: Speaker) {
  router.push({
    name: 'speaker-detail',
    params: { speakerId: speaker.id.toString() },
  })
}

async function gotToOffsite(msg: string) {
  const loading = await loadingController.create({
    message: msg,
    duration: Math.random() * 1000 + 500,
  })
  await loading.present()
  await loading.onWillDismiss()
}
</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle>Speakers</IonTitle>
        <template #start>
          <IonButtons>
            <IonMenuButton />
          </IonButtons>
        </template>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            Speakers
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList>
        <IonGrid fixed>
          <IonRow align-items-stretch>
            <IonCol
              v-for="speaker in speakers"
              :key="speaker.id"
              size="12"
              size-md="6"
            >
              <IonCard class="speaker-card">
                <IonCardHeader>
                  <IonItem
                    :detail="false"
                    lines="none"
                    button
                    @click="goToSpeakerDetail(speaker)"
                  >
                    <ion-avatar slot="start">
                      <img
                        :src="speaker.profilePic"
                        alt="Speaker profile pic"
                      />
                    </ion-avatar>
                    <ion-label>
                      <h2>{{ speaker.name }}</h2>
                      <p>{{ speaker.title }}</p>
                    </ion-label>
                  </IonItem>
                </IonCardHeader>

                <IonCardContent>
                  <IonList lines="none">
                    <ion-item
                      v-for="session in sessionsBySpeaker(speaker.id)"
                      button
                      @click="goToSessionDetail(session)"
                      :key="session.id"
                    >
                      <h3>{{ session.name }}</h3>
                    </ion-item>

                    <ion-item button @click="goToSpeakerDetail(speaker)">
                      <h3>About {{ speaker.name }}</h3>
                    </ion-item>
                  </IonList>
                </IonCardContent>

                <IonRow no-padding justify-content-center>
                  <IonCol text-left size="4">
                    <ion-button
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Tweet')"
                    >
                      <ion-icon :icon="logoTwitter" slot="start"></ion-icon
                      >Tweet
                    </ion-button>
                  </IonCol>
                  <IonCol text-center size="4">
                    <ion-button
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Share')"
                    >
                      <ion-icon :icon="share" slot="start"></ion-icon>Share
                    </ion-button>
                  </IonCol>
                  <IonCol text-right size="4">
                    <ion-button
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Contact')"
                    >
                      <ion-icon :icon="chatbubbles" slot="start"></ion-icon
                      >Contact
                    </ion-button>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonList>
    </IonContent>
  </IonPage>
</template>
