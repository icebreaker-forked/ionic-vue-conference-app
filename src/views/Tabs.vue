<script lang="ts">
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/vue'
import {
  calendar,
  informationCircle,
  location,
  people,
} from 'ionicons/icons'

export default {
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      calendar,
      people,
      location,
      informationCircle,
    }
  },
}
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />

      <template #bottom>
        <IonTabBar>
          <IonTabButton tab="schedule" href="/tabs/schedule">
            <IonIcon :icon="calendar" />
            <IonLabel>Schedule</IonLabel>
          </IonTabButton>

          <IonTabButton tab="speakers" href="/tabs/speakers">
            <IonIcon :icon="people" />
            <IonLabel>Speakers</IonLabel>
          </IonTabButton>

          <IonTabButton tab="map" href="/tabs/map">
            <IonIcon :icon="location" />
            <IonLabel>Map</IonLabel>
          </IonTabButton>

          <IonTabButton tab="about" href="/tabs/about">
            <IonIcon :icon="informationCircle" />
            <IonLabel>About</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </template>
    </IonTabs>
  </IonPage>
</template>
