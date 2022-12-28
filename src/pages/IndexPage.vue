<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px"> -->
    <div class="column">
      <img alt="Quasar logo" src="~assets/img/logo_ollon.jpg" style="width: 200px; height: 200px">
      <q-btn flat style="color: #FF0080" label="INGRESAR" to="/login" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
