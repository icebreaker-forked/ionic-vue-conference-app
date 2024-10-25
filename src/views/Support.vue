<script lang="ts" setup>
const supportMessage = ref('')
const submitted = ref(false)

const showToast = ref(false)
const toastMessage = ref('')

const canSubmit = computed(() => supportMessage.value.trim() !== '')

function submitForm(event: any) {
  event.preventDefault()
  submitted.value = true

  if (canSubmit.value) {
    toastMessage.value = 'Successfully sent support message!'
    showToast.value = true
    supportMessage.value = ''
  }
}

onMounted(() => {
  toastMessage.value = 'This does not actually send a support request.'
  showToast.value = true
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

        <IonTitle>Support</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div class="support-logo">
        <img src="/assets/img/appicon.svg" alt="Ionic Logo">
      </div>
      <form novalidate @submit="submitForm">
        <IonTextarea
          v-model="supportMessage"
          label="Support Message"
          labelPlacement="floating"
          fill="outline"
          placeholder="Message..."
          name="supportQuestion"
          :rows="6"
          required
        />
        <div class="ion-padding-top">
          <IonButton expand="block" type="submit">
            Submit
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

<style scoped>
.support-logo {
  min-height: 200px;

  padding: 20px 0;

  text-align: center;
}

.support-logo img {
  max-width: 150px;
}
</style>
