<template>
    <v-container>
        <form @submit.prevent="onCreateHangout">

            <v-layout row>
                    <h4>Create a New Hangout</h4>
            </v-layout>
                <v-flex>
                    <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    v-model="title"
                    required>
                    </v-text-field>
                </v-flex>

                <v-flex>
                    <v-text-field
                    name="islandcode"
                    label="Island Code"
                    id="islandcode"
                    v-model="islandcode"
                    required>
                    </v-text-field>
                </v-flex>

                <v-flex>
                    <v-btn @click="onPickFile">Optional: Upload Island Image</v-btn>
                    <input type="file" 
                    style="display: none"
                    ref="fileInput" 
                    accept="image/*"
                    @change="onFilePicked">
                </v-flex>     

                <v-flex>
                    <img :src="imageUrl" height="120">
                </v-flex>     

                <v-flex>
                    <v-textarea
                    name="description"
                    label="Activities, Rules, Agenda Planned, Description of Island, etc..."
                    id="description"
                    v-model="description"
                    counter
                    maxlength="120"
                    rows="1"
                    hint="This is a good spot to list a potential agenda and rules for your visitors!"
                    required>
                    </v-textarea>
                </v-flex>             

                <v-flex><h4>Choose a Date and Time</h4></v-flex>
                <v-row
                justify="space-around"
                align="center"
                >
                    <v-date-picker 
                        dark
                        v-model="picker"
                        width="290">
                    </v-date-picker>
                    <div></div>
                    <v-time-picker 
                        dark
                        v-model="time"
                        width="290"
                    >
                    </v-time-picker>
            
                    <v-btn
                        class="primary" 
                        :disabled="!formIsValid"
                        type="submit"
                        bottom
                        right
                        absolute
                    >
                        Create Hangout
                    </v-btn>
                </v-row>
            
        </form>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            islandcode: '',
            imageUrl: '',
            description: '',
            date: new Date(),
            time: new Date(),
            image: null
        }
    },
    computed: {
        formIsValid () {
            return this.title !== '' 
            && this.islandcode !== '' 
            && this.description !== ''
        },
        submittableDateTime () {
            const date = new Date(this.date)
            if (typeof this.time === 'string') {
                const hours = this.time.match(/^(\d+)/) [1]
                const minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
            date.setHours(this.time.getHours())
            date.setMinutes(this.time.getMinutes())
            }
            return date
        }
    },
    methods: {
        onCreateHangout () {
         if (!this.formIsValid) {
             return
         }

            const hangoutData = {
                title: this.title,
                islandcode: this.islandcode,
                image: this.image,
                description: this.description,
                date: this.submittableDateTime
            }
            this.$store.dispatch('createHangout', hangoutData)
            this.$router.push('/hangouts')
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <=0) {
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>


<style scoped>
div {
    margin-left: 5px;
}
</style>