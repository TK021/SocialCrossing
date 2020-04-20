<template>
<v-container>

  <v-card
    class="mx-auto"
    max-width="400"
    v-for="hangout in hangouts" :key="hangout.id"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="hangout.imageUrl"
    >
    </v-img>
    <v-card-title>{{ hangout.title }}</v-card-title>
    <v-card-subtitle class="pb-0"> {{ hangout.date | date}} </v-card-subtitle>
    
    <v-card-actions>
      <v-btn :to="'/hangouts/' + hangout.id">
          <v-icon>mdi-arrow-right</v-icon>
        View Hangout
      </v-btn>
    </v-card-actions>
  </v-card>
  <br><br><br>
</v-container>
</template>

<script>
export default {
    computed: {
        hangouts () {
            return this.$store.getters.loadedHangouts
        }
    }
}
</script>