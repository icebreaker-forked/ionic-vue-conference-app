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

        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
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
                    <IonAvatar slot="start">
                      <img
                        :src="speaker.profilePic"
                        alt="Speaker profile pic"
                      >
                    </IonAvatar>
                    <IonLabel>
                      <h2>{{ speaker.name }}</h2>
                      <p>{{ speaker.title }}</p>
                    </IonLabel>
                  </IonItem>
                </IonCardHeader>

                <IonCardContent>
                  <IonList lines="none">
                    <IonItem
                      v-for="session in sessionsBySpeaker(speaker.id)"
                      :key="session.id"
                      button
                      @click="goToSessionDetail(session)"
                    >
                      <h3>{{ session.name }}</h3>
                    </IonItem>

                    <IonItem button @click="goToSpeakerDetail(speaker)">
                      <h3>About {{ speaker.name }}</h3>
                    </IonItem>
                  </IonList>
                </IonCardContent>

                <IonRow no-padding justify-content-center>
                  <IonCol text-left size="4">
                    <IonButton
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Tweet')"
                    >
                      <IonIcon slot="start" :icon="logoTwitter" />Tweet
                    </IonButton>
                  </IonCol>
                  <IonCol text-center size="4">
                    <IonButton
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Share')"
                    >
                      <IonIcon slot="start" :icon="share" />Share
                    </IonButton>
                  </IonCol>
                  <IonCol text-right size="4">
                    <IonButton
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Contact')"
                    >
                      <IonIcon slot="start" :icon="chatbubbles" />Contact
                    </IonButton>
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
