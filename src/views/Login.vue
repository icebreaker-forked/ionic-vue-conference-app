<script setup lang="ts">
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
    console.info('--')
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
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

        <IonTitle class="dark:text-pink-500">
          Login
        </IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div class="flex justify-center">
        <img class="w-40" src="/assets/img/appicon.svg" alt="Ionic logo">
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
