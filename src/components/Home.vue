<!--This page is used for testing vue components before moving them into the main vue page-->
<template>
    <v-container fluid>

          <v-card>
            <v-card-title>
            Welcome to Social Crossing! Feel free to checkout the featured hangouts below.
            </v-card-title>
        </v-card>

        <br><br>
        <v-layout>
            <div class="text-center">
                <v-progress-circular
                :width="7"
                :size="70"
                indeterminate
                v-if="loading"
                color="red"></v-progress-circular>
            </div>
        </v-layout>
    
        <v-layout v-if="!loading">  
                <v-carousel style="cursor: pointer;"
                :show-arrows="false">
                    <v-carousel-item 
                        v-for="hangout in hangouts"
                        :src="hangout.imageUrl"
                        :key="hangout.id"
                        @click="onLoadHangout(hangout.id)">

                        <div class="title">
                            {{ hangout.title }}
                        </div>

                    </v-carousel-item>
                </v-carousel> 
        </v-layout>
        <br>
        <br>
        <v-layout>
            <v-flex>
            <v-btn large router to="newhangouts/create">Plan a Hangout</v-btn>                 
            <v-btn large router to="/hangouts">View Hangouts</v-btn>
            </v-flex>
        </v-layout> 

    </v-container>
</template>

<script>
export default {

    computed: {
        hangouts () {
            return this.$store.getters.featuredHangouts
        },
        loading () {
            return this.$store.getters.loading
        }
},
    methods: {
        onLoadHangout (id) {
            this.$router.push('/hangouts/' + id)
        }
    }
}
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        left: 41%;
        background-color: rgba(0,0,0,0.5);
        color: white;
        font-size: 2em;
        padding-left: 20 px;
    }
</style>>

