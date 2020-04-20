
<template>
    <v-card
    class="mx-auto"
    height="auto"
    width="auto"
    >

    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Social Crossing!</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn depressed 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-icon>{{ item.icon }}</v-icon>
                  {{ item.title }}
        </v-btn>
      
        <v-btn depressed
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-icon>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>  
    

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="200"
      >

      <v-list>
        <v-list-item>
          <v-btn depressed
            v-if="userIsAuthenticated"
            @click="$router.push('/newhangouts/create')">
              <v-icon>mdi-earth-arrow-right</v-icon>
              Plan A Hangout
            </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn depressed
            v-if="userIsAuthenticated"
            @click="$router.push('/hangouts')">
              <v-icon>mdi-account-group</v-icon>
              View Hangouts
            </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn depressed
            v-if="userIsAuthenticated"
            @click="onLogout">
              <v-icon>mdi-exit-to-app</v-icon>
              Logout
            </v-btn>
        </v-list-item>

          <!--Listing the sign in and sign up options i-->
        <br><br><br><br><br><br>
        <v-list-item>
          <v-btn depressed
            @click="$router.push('/profile/signup')">
              <v-icon>mdi-face</v-icon>
              Sign Up
            </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn depressed
            @click="$router.push('/profile/signin')">
              <v-icon>mdi-lock-open-check</v-icon>
              Sign In
            </v-btn>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>


  <main>
    <router-view></router-view>
  </main>

  <v-footer inset app>
          <v-btn depressed
            v-if="userIsAuthenticated"
            @click="$router.push('/profile/about')">
              <v-icon>mdi-information</v-icon>
              About
            </v-btn>
    <v-spacer></v-spacer>
    <div>&copy; 2020</div>
  </v-footer>



  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false    
    }
  },
  computed: {
    menuItems() {
      let menuItems = 
      [ 
      ]
    if (this.userIsAuthenticated) {
      menuItems = 
      [
        { icon: 'mdi-earth-arrow-right', title: 'Plan a Hangout', link:'/newhangouts/create'},
        { icon: 'mdi-account-group', title: 'View Hangouts', link:'/hangouts'},
      ]
    }
    else {
      menuItems = 
      [ 
        { icon: 'mdi-face', title: 'Sign Up', link:'/profile/signup'},
        { icon: 'mdi-lock-open-check', title: 'Sign In', link:'/profile/signin'}
      ]
    }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null & this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  } 
}
</script>

<style lang="stylus">
