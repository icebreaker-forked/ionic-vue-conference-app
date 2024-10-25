<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()

function updatePicture() {}
function changeUsername() {}
function changePassword() {}
function support() {}
function logOutUser() {}

const username = ref(store.state.user.username)
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>

        <IonTitle>Account</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="outer-content page-account">
      <div>
        <img src="http://www.gravatar.com/avatar?d=mm&s=140" alt="avatar">
        <h2>{{ username }}</h2>
        <IonList inset>
          <IonItem @click="updatePicture">
            Update Picture
          </IonItem>
          <IonItem @click="changeUsername">
            Change Username
          </IonItem>
          <IonItem @click="changePassword">
            Change Password
          </IonItem>
          <IonItem @click="support">
            Support
          </IonItem>
          <IonItem @click="logOutUser">
            Logout
          </IonItem>
        </IonList>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
img {
  max-width: 140px;
  border-radius: 50%;
}
</style>
