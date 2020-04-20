import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedHangouts: [
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedHangouts (state, payload) {
            state.loadedHangouts = payload
        },
        createHangout (state, payload) {
            state.loadedHangouts.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadHangouts ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('hangouts').once('value')
                .then((data) => {
                    const hangouts = []
                    const obj = data.val()
                    for (let key in obj) {
                        hangouts.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            islandcode: obj [key].islandcode,
                            creatorID: obj[key].creatorID
                        })
                    }
                    commit('setLoadedHangouts', hangouts)
                    commit('setLoading', false)
                })
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', false)
                    }
                )
        },
        createHangout ({commit, getters}, payload) {
            const hangout = {
                title: payload.title,
                islandcode: payload.islandcode,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('hangouts').push(hangout)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('hangouts/' + key + '.' + ext).put(payload.image)
                })
                .then(fileData => {
                    return fileData.ref.getDownloadURL()
                     .then(imageUrl => {
                        return firebase.database().ref('hangouts').child(key).update({ imageUrl: imageUrl })
                     })
                })
                .then(() => {
                //Send upload to firebase to store our hangout
                   commit('createHangout', {
                    ...hangout,
                    imageUrl: imageUrl,
                    id: key
                    })  
                }) 
                .catch((error) => {
                    console.log(error)
                })
        },

        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    //We are grabbing only the data we need from firebase
                    const newUser = {
                        id: user.uid,
                        registeredHangouts: []
                    }
                    commit('setUser', newUser)
                }
            )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },

        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then (
                user => {
                    commit('setLoading', false)
                    const newUser = {
                    id: user.uid,
                    registeredHangouts: []
                    }
                commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                }
            )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredHangouts: []})
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError ({commit}) {
            commit('clearError')
        }  
    },
    getters: {
        loadedHangouts (state) {
            return state.loadedHangouts.sort((hangoutA, hangoutB) => {
                return hangoutA.date > hangoutB.date
            })
        },
        //We use this only to grab five hangouts at most.
        featuredHangouts (state, getters) {
            return getters.loadedHangouts.slice(0, 5)
        },
        loadedHangout (state) {
            return (hangoutId) => {
                return state.loadedHangouts.find((hangout) => {
                    return hangout.id == hangoutId
                })
            }
        },
        user (state) {
            return state.user
        },
        loading (state) { 
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})