<script lang="ts">
import type { Session } from '@/store/modules/sessions'
import { dateFormat } from '@/filters/dateFormat'
import { useStore } from '@/store'
import {
  alertController,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import {
  cloudDownload,
  heart,
  heartOutline,
} from 'ionicons/icons'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonContent,
    IonList,
    IonLabel,
    IonItem,
    IonBackButton,
    IonTitle,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const session = ref<Session>()
    const favorites = ref<number[]>([])

    const sessionClick = async (message: any) => {
      const alert = await alertController.create({
        message: `${message}`,
      })
      await alert.present()
    }

    onMounted(() => {
      session.value = store.state.sessions.sessions.find(
        s => s.id === Number.parseInt(route.params.sessionId.toString()),
      )
      favorites.value = store.state.sessions.favoriteSessions
    })

    return {
      heart,
      heartOutline,
      cloudDownload,
      session,
      favorites,
      sessionClick,
      dateFormat,
    }
  },
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/" />
        </IonButtons>

        <IonTitle>{{ session ? session.name : '' }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div v-if="session" padding>
        <h1>{{ session.name }}</h1>
        <IonGrid no-padding>
          <IonRow>
            <IonCol size="6">
              <span
                v-for="track in session.tracks"
                :key="track.toLowerCase()"
                :class="`session-track-${track.toLowerCase()}`"
              >{{ track }}</span>
            </IonCol>
            <IonCol
              size="6"
              text-right
              :class="favorites.indexOf(session.id) !== -1 ? 'show-favorite' : ''"
            />
          </IonRow>
        </IonGrid>
        <p>{{ session.description }}</p>
        <IonText color="medium">
          {{ dateFormat(session.dateTimeStart, "h:mm a") }} &mdash; {{ dateFormat(session.dateTimeEnd, "h:mm a") }}
          <br>
          {{ session.location }}
        </IonText>
      </div>

      <IonList>
        <IonItem button @click="sessionClick('Watched')">
          <IonLabel color="primary">
            Watch
          </IonLabel>
        </IonItem>
        <IonItem button @click="sessionClick('Added to Calendar')">
          <IonLabel color="primary">
            Add to Calendar
          </IonLabel>
        </IonItem>
        <IonItem button @click="sessionClick('Marked as Unwatched')">
          <IonLabel color="primary">
            Mark as Unwatched
          </IonLabel>
        </IonItem>
        <IonItem button @click="sessionClick('Downloaded Video')">
          <IonLabel color="primary">
            Download Video
          </IonLabel>

          <IonIcon slot="end" color="primary" size="small" :icon="cloudDownload" />
        </IonItem>
        <IonItem button @click="sessionClick('Left Feedback')">
          <IonLabel color="primary">
            Leave Feedback
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.session-track-ionic {
  color: var(--ion-color-primary);
}

.session-track-angular {
  color: var(--ion-color-angular);
}

.show-favorite {
  position: relative;
}

.icon-heart-empty {
  position: absolute;
  top: 5px;
  right: 5px;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.icon-heart {
  position: absolute;
  top: 5px;
  right: 5px;
  transform: scale(0);
  transition: transform 0.3s ease;
}

.show-favorite .icon-heart {
  transform: scale(1);
}

.show-favorite .icon-heart-empty {
  transform: scale(0);
}
</style>
