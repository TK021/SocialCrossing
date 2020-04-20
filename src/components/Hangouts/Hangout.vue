<template>
    <v-container>
        
        <v-layout>
            <v-flex xs>
                <v-card>
                    <v-card-title>
                        <h4>{{ hangout.title }}</h4>
                        <template v-if="true">
                            <v-spacer></v-spacer>
                        </template>
                    </v-card-title>
                    <v-img
                    class="white--text align-end"
                    height="400px"
                    width="75%"
                    :src="hangout.imageUrl"
                    >
                    </v-img>
                    <v-card-subtitle class="info--text">{{ hangout.islandcode }}</v-card-subtitle>
                    <v-card-subtitle class="info--text">{{ hangout.date | date }}</v-card-subtitle>
                    <v-card-subtitle class="info--text">{{ hangout.time }}</v-card-subtitle>
                    <v-card-subtitle class="pb-0">{{ hangout.description }} </v-card-subtitle>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        hangout () {
            //Calling our function and returning it from store->index.js
            return this.$store.getters.loadedHangout(this.id)
        }
    }
}
</script>