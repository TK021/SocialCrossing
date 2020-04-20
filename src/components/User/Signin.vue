<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignin">

                                <v-layout>
                                    <v-flex>
                                        <v-text-field
                                        name="email"
                                        label="Email"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required>    
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout>
                                    <v-flex>
                                        <v-text-field
                                        name="password"
                                        label="Password"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required>    
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout>
                                    <v-btn type="submit">Sign In</v-btn> 
                                </v-layout>                               

                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    watch: {
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignin () {
            //Using VueX to store the state/information
            this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        }
    }
}
</script>