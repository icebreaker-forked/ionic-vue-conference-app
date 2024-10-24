<script setup lang="ts">
import { dateFormat } from '@/filters/dateFormat'
import router from '@/router'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
  popoverController,
} from '@ionic/vue'
import {
  ellipsisHorizontal,
} from 'ionicons/icons'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const location = ref('madison')
const conferenceDate = ref('2047-05-17')

const selectOptions = {
  header: 'Select a Location',
}

async function close(url: string) {
  const popover = await popoverController.getTop()
  if (popover) {
    window.open(url, '_blank')
    await popover.dismiss()
  }
}

async function support() {
  const popover = await popoverController.getTop()
  if (popover) {
    router.push('/support')
    await popover.dismiss()
  }
}

watch(location, (newLocation: string, oldLocation: string) => {
  const aboutImages = document.querySelectorAll<HTMLElement>('.about-image')
  aboutImages.forEach((image) => {
    const city = image.classList[1]
    image.style.opacity = newLocation === city ? '1' : '0'
  })
})
</script>

<template>
  <IonPage>
    <IonContent>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <template #start>
            <IonButtons>
              <IonMenuButton />
            </IonButtons>
          </template>
          <template #end>
            <IonButtons>
              <IonButton id="popover-button">
                <IonIcon slot="icon-only" :icon="ellipsisHorizontal" />
              </IonButton>
            </IonButtons>
          </template>
        </IonToolbar>
      </IonHeader>

      <div class="about-header">
        <!-- Instead of loading an image each time the select changes, use opacity to transition them -->
        <div class="about-image madison" :style="{ opacity: location === 'madison' ? '1' : '0' }" />
        <div class="about-image austin" :style="{ opacity: location === 'austin' ? '1' : '0' }" />
        <div class="about-image chicago" :style="{ opacity: location === 'chicago' ? '1' : '0' }" />
        <div class="about-image seattle" :style="{ opacity: location === 'seattle' ? '1' : '0' }" />
      </div>

      <div class="about-info">
        <h3 class="ion-padding-top ion-padding-start">
          About
        </h3>

        <p class="ion-padding-start ion-padding-end">
          The Ionic Conference is a one-day conference on
          {{ dateFormat(conferenceDate, "MMM dd, yyyy") }}
          featuring talks from the Ionic team. It is focused on Ionic applications being built with Ionic Framework. This includes migrating apps to the latest version of the framework, Angular concepts, Webpack, Sass, and many other technologies used in Ionic 7. Tickets are completely sold out, and we’re expecting more than 1000 developers – making this the largest Ionic conference ever!
        </p>

        <h3 class="ion-padding-top ion-padding-start">
          Details
        </h3>

        <IonList lines="none">
          <IonItem>
            <IonSelect v-model="location" label="Location" :interfaceOptions="selectOptions">
              <IonSelectOption value="madison">
                Madison, WI
              </IonSelectOption>
              <IonSelectOption value="austin">
                Austin, TX
              </IonSelectOption>
              <IonSelectOption value="chicago">
                Chicago, IL
              </IonSelectOption>
              <IonSelectOption value="seattle">
                Seattle, WA
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem id="open-date-input" :button="true">
            <IonLabel>
              Date
            </IonLabel>
            <template #end>
              <IonText>{{ dateFormat(conferenceDate, "MMM dd, yyyy") }}</IonText>
            </template>
            <IonPopover id="date-input-popover" trigger="open-date-input" :showBackdrop="false" side="top" alignment="end">
              <IonDatetime v-model="conferenceDate" max="2056" presentation="date" />
            </IonPopover>
          </IonItem>
        </IonList>

        <h3 class="ion-padding-top ion-padding-start">
          Internet
        </h3>

        <IonList lines="none">
          <IonItem>
            <IonLabel>
              Wifi network
            </IonLabel>
            <IonLabel class="ion-text-end">
              ica{{ dateFormat(conferenceDate, "y") }}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Password
            </IonLabel>
            <IonLabel class="ion-text-end">
              makegoodthings
            </IonLabel>
          </IonItem>
        </IonList>
      </div>
      <IonPopover trigger="popover-button" :dismiss-on-select="true">
        <IonContent>
          <IonList>
            <IonItem button @click="close('https://ionicframework.com/getting-started')">
              <IonLabel>Learn Ionic</IonLabel>
            </IonItem>
            <IonItem button @click="close('https://ionicframework.com/docs/')">
              <IonLabel>Documentation</IonLabel>
            </IonItem>
            <IonItem button @click="close('https://showcase.ionicframework.com')">
              <IonLabel>Showcase</IonLabel>
            </IonItem>
            <IonItem button @click="close('https://github.com/ionic-team/ionic')">
              <IonLabel>GitHub Repo</IonLabel>
            </IonItem>
            <IonItem button @click="support()">
              <IonLabel>Support</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-toolbar {
  --background: transparent;
  --color: white;
  position: absolute;

  top: 0;
  right: 0;
  left: 0;
}

ion-toolbar ion-button,
ion-toolbar ion-back-button,
ion-toolbar ion-menu-button {
  --color: white;
}

.about-header {
  position: relative;

  width: 100%;
  height: 30%;
}

.about-header .about-image {
  position: absolute;
  inset: 0;
  transition: opacity 500ms ease-in-out;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0;
}

.about-header .madison {
  background-image: url('/assets/img/about/madison.jpg');
}

.about-header .austin {
  background-image: url('/assets/img/about/austin.jpg');
}

.about-header .chicago {
  background-image: url('/assets/img/about/chicago.jpg');
}

.about-header .seattle {
  background-image: url('/assets/img/about/seattle.jpg');
}

.about-info {
  position: absolute;
  margin-top: -10px;
  border-radius: 10px;
  background: var(--ion-background-color, #ffffff);
  width: 100%;
}

.about-info h3 {
  margin-top: 0;
}

.about-info ion-list {
  padding-top: 0;
}

.about-info p {
  color: var(--ion-color-dark);

  line-height: 130%;
}

.about-info ion-icon {
  margin-inline-end: 32px;
}

#date-input-popover {
  --offset-y: -var(--ion-safe-area-bottom);
  --max-width: 90%;
  --width: 336px;
}

/*
 * iOS Only
 */

.ios .about-info {
  --ion-padding: 19px;
}

.ios .about-info h3 {
  font-weight: 700;
}
</style>
