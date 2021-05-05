<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: '首頁',
          to: '/'
        },
        {
          icon: 'mdi-clipboard-account',
          title: '註冊',
          to: '/users/sign_up'
        },
        {
          icon: 'mdi-login',
          title: '登入',
          to: '/users/log_in'
        },
        {
          icon: 'mdi-logout',
          title: '登出',
          to: '/users/log_out'
        },
        {
          icon: 'mdi-view-dashboard',
          title: '儀錶板',
          to: '/dashboard'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Live Broadcast',
      tempItems: [
        {
          icon: 'mdi-apps',
          title: '首頁',
          to: '/'
        },
        {
          icon: 'mdi-clipboard-account',
          title: '註冊',
          to: '/users/sign_up'
        },
        {
          icon: 'mdi-login',
          title: '登入',
          to: '/users/log_in'
        },
        {
          icon: 'mdi-logout',
          title: '登出',
          to: '/users/log_out'
        },
        {
          icon: 'mdi-view-dashboard',
          title: '儀錶板',
          to: '/dashboard'
        },
      ]
    }
  },
  async mounted(){
      let vm = this;
      var response = await vm.$axios.post('/users/is_user');
      if (parseInt(response.data.user_id) > 0) { //登入
        vm.loginMenu()
      }
      else{
        vm.logoutMenu()
      }
  },
  created() {
    let vm = this;
    vm.$bus.$on('log_out', (data) => {
      vm.logoutMenu();
    })
    vm.$bus.$on('log_in', (data) => {
      vm.loginMenu();
    })
  },
  methods: {
    loginMenu(){
        let vm = this;
        //保留登出，刪除註冊、登入
        for (let i = 0; i < vm.items.length; i++) {
          if (vm.items[i].title == '註冊' || vm.items[i].title == '登入'){
            vm.items.splice(i--, 1);
          }
        }
        let bool_logout = false;
        //如果登出還存在，也就是使用者重整頁面了
        for (let i = 0; i < vm.items.length; i++){
          if (vm.items[i].title === '登出'){
              bool_logout = true; // 標記存在
          }
        }
        //如果登出不存在
        if (!bool_logout){
          vm.items.push(
            vm.tempItems[3]
          )
        }

    },
    logoutMenu(){
        let vm = this;
        //保留登入、註冊，刪除登出
        for (let i = 0; i < vm.items.length; i++) {
          if (vm.items[i].title == '登出'){
            vm.items.splice(i--, 1);
          }
        }

        let bool_login = false;
        //如果登入還存在，也就是使用者重整頁面了
        for (let i = 0; i < vm.items.length; i++){
          if (vm.items[i].title === '登入'){
              bool_login = true; // 標記存在
          }
        }
        //如果登出不存在
        if (!bool_login){
          vm.items.push(
            vm.tempItems[1]
          )
          vm.items.push(
            vm.tempItems[2]
          )
        }
    }
  }
}
</script>
