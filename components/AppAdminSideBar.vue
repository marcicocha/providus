<template>
  <aside class="menu">
    <!-- <p class="menu-label">General</p> -->
    <ul class="menu-list">
      <p class="menu-label">
        <img src="../assets/images/logowhitetext.svg" alt="" />
      </p>
    </ul>
    <ul class="menu-list">
      <li v-for="(menu, index) in menuList" :key="index">
        <a :href="menu.path">{{ menu.name }}</a>
      </li>
    </ul>
    <ul class="menu-list log-out">
      <li>
        <a>Logout</a>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: 'AppInput',
  components: {},
  props: {},
  data() {
    return {
      clientMenu: [
        {
          key: 'user_management',
          name: 'User Management',
          path: '/admin/usermangement',
          children: [],
        },
        {
          key: 'settings',
          name: 'Settings',
          path: '/admin/setting',
          children: [],
        },
        {
          key: 'request_management',
          name: 'Requests',
          path: '/admin/requests',
          children: [],
        },
        {
          key: 'role_management',
          name: 'Roles',
          path: '/admin/roles',
          children: [],
        },
        {
          key: 'team_management',
          name: 'Teams',
          path: '/admin/team',
          children: [],
        },
      ],
    }
  },
  computed: {
    menuList() {
      const menu = [
        {
          key: 'user_management',
          name: 'User Management',
          path: '/admin/usermangement',
          children: [],
        },
        {
          key: 'settings',
          name: 'Settings',
          path: '/admin/setting',
          children: [],
        },
        {
          key: 'request_management',
          name: 'Requests',
          path: '/admin/requests',
          children: [],
        },
        {
          key: 'role_management',
          name: 'Roles',
          path: '/admin/roles',
          children: [],
        },
        {
          key: 'team_management',
          name: 'Teams',
          path: '/admin/team',
          children: [],
        },
      ]
      return menu
    },
  },
  watch: {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.menu {
  background: #2e434e;
  height: 100vh;
  position: fixed;
  color: #fff;
  border-right: 5px solid #fdb813;
  box-shadow: 1px 0.1px 15px -6px rgba(51, 51, 51, 1);
  -webkit-box-shadow: 1px 0.1px 15px -6px rgba(51, 51, 51, 1);
  -moz-box-shadow: 1px 0.1px 15px -6px rgba(51, 51, 51, 1);
  .menu-list .menu-label {
    // text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f8f8f82c;
    margin-bottom: 25px;
    img {
      width: 150px;
      height: 150px;
      margin: 5px 1px;
    }
  }
  .menu-list li a {
    padding: 10px 30px;
    font-family: 'GothamLight', sans-serif;
    font-style: normal;
    font-size: 20px;
    line-height: 150%;
    color: #fff;
    transition: all 0.3s;
    &:hover {
      color: #2e434e;
      background: #fdb813;
      font-weight: bold;
    }
    &:focus {
      color: red;
      background: #fdb813;
    }
  }
  .log-out {
    position: absolute;
    bottom: 10%;
    width: 100%;
  }
}
</style>
