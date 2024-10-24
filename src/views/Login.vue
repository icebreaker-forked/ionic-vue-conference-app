<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/vue'
import { computed, ref } from 'vue'

const username = ref('')
const password = ref('')
const submitted = ref(false)

const usernameValid = true
const passwordValid = true

const showToast = ref(false)
const toastMessage = ref('')

const canSubmit = computed(
  () => username.value.trim() !== '' && password.value.trim() !== '',
)

function onLogin() {
  submitted.value = true
  if (usernameValid && passwordValid) {
  }
}

function onSignup() {
  toastMessage.value = 'Successfully logged in!'

  showToast.value = true

  username.value = ''
  password.value = ''
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonMenuButton />
          </IonButtons>
        </template>
        <IonTitle>Login</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div class="login-logo">
        <img src="/assets/img/appicon.svg" alt="Ionic logo">
      </div>

      <form novalidate @submit.prevent="onLogin">
        <IonList>
          <IonItem>
            <IonInput
              v-model="username"
              label="Username"
              labelPlacement="stacked"
              name="username"
              type="text"
              :spellcheck="false"
              autocapitalize="off"
              required
            />
          </IonItem>

          <IonItem>
            <IonInput
              v-model="password"
              labelPlacement="stacked"
              label="Password"
              name="password"
              type="password"
              required
            />
          </IonItem>
        </IonList>

        <IonRow responsive-sm class="ion-padding">
          <IonCol>
            <IonButton :disabled="!canSubmit" type="submit" expand="block">
              Login
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              :disabled="!canSubmit"
              color="light"
              expand="block"
              @click="onSignup"
            >
              Signup
            </IonButton>
          </IonCol>
        </IonRow>
      </form>
      <IonToast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
      />
    </IonContent>
  </IonPage>
</template>

<style scoped>
.login-logo {
  padding: 20px 0;
  min-height: 200px;
  text-align: center;
}

.login-logo img {
  max-width: 150px;
}

.list {
  margin-bottom: 0;
}
</style>
