<script lang="ts" setup>
const username = ref('')
const password = ref('')
const submitted = ref(false)

const showToast = ref(false)
const toastMessage = ref('')

const usernameValid = computed(() => {
  return true
})

const passwordValid = computed(() => {
  return true
})

function onSignup() {
  submitted.value = true

  if (usernameValid.value && passwordValid.value) {
    toastMessage.value = 'Successfully signed up!'

    showToast.value = true

    username.value = ''
    password.value = ''
  }
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

        <IonTitle>Signup</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div class="flex justify-center">
        <img class="w-32" src="/assets/img/appicon.svg" alt="Ionic Logo">
      </div>
      <form @submit.prevent="onSignup">
        <IonList>
          <IonItem>
            <IonInput
              v-model="username"
              labelPlacement="stacked"
              label="Username"
              name="username"
              type="text"
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
        <div class="ion-padding">
          <IonButton type="submit" expand="block">
            Create
          </IonButton>
        </div>
      </form>
      <IonToast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
      />
    </IonContent>
  </IonPage>
</template>
