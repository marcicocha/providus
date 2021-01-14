<template>
  <div>
    <div class="page_header">
      <h1>User Management</h1>
      <div class="wrapper">
        <div class="search-bar">
          <AppSearchInput placeholder="Search Users" />
        </div>
        <div class="add-button-wrapper">
          <AppButton class="add-button" title="Add New User" color="#282828" />
        </div>
      </div>
    </div>
    <AppTable :columns="columns" :dataSource="dataSource">
      <template slot="userId" slot-scope="{ record }">
        <span style="background: red">{{ record.userId }}</span>
      </template>
      <template slot="actions" slot-scope="{ record }">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <i
              class="custom-table-btn fas fa-ellipsis-v"
              aria-controls="dropdown-menu"
            >
            </i>
          </div>
          <div id="dropdown-menu" class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item" @click="getName(record)">
                <i class="fas fa-pencil-alt" /> Edit User
              </a>
              <a class="dropdown-item"
                ><i class="fa fa-trash-alt" /> Delete User
              </a>
            </div>
          </div>
        </div>
      </template>
    </AppTable>
  </div>
</template>
<script>
import AppTable from '@/components/UI/AppTable.vue'
import AppSearchInput from '@/components/UI/AppSearchInput.vue'
import AppButton from '@/components/UI/AppButton.vue'
export default {
  layout: 'dashboard',
  components: {
    AppTable,
    AppSearchInput,
    AppButton,
  },
  data() {
    return {
      dataSource: [
        {
          id: 1,
          name: 'Wasif',
          userId: '#2894021',
          email: 'wasif@email.com',
          role: 'admin',
          date: '10-10-2019',
        },
        {
          id: 2,
          name: 'Ali',
          userId: '#3234324',
          email: 'ali@email.com',
          role: 'admin',
          date: '10-10-2019',
        },
        {
          id: 3,
          name: 'Saad',
          userId: '#4982304',
          email: 'saad@email.com',
          role: 'admin',
          date: '10-10-2019',
        },
        {
          id: 4,
          name: 'Asad',
          userId: '#53436',
          email: 'asad@email.com',
          role: 'admin',
          date: '10-10-2019',
        },
      ],
      columns: [
        {
          name: 'No.',
          dataIndex: 'id',
        },
        {
          name: 'User ID',
          dataIndex: 'userId',
        },
        {
          name: 'Username',
          dataIndex: 'name',
        },
        {
          name: 'Email Address',
          dataIndex: 'email',
        },
        {
          name: 'Role',
          dataIndex: 'role',
        },
        {
          name: 'Data Assigned',
          dataIndex: 'date',
        },
        {
          name: '',
          dataIndex: 'actions',
        },
      ],
    }
  },
  methods: {
    getName(record) {
      console.log(record, ':::record:::')
    },
  },
}
</script>
<style lang="scss" scoped>
.page_header {
  margin-bottom: 25px;
  h1 {
    font-family: GothamLight;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 150%;
    color: #2e434e;
  }
  .wrapper {
    margin-top: 10px;
    div {
      display: inline-block;
    }
    .search-bar {
      width: 350px;
    }
    .add-button-wrapper {
      width: 250px;
      float: right;
      .add-button {
        height: auto;
      }
    }
  }
}
.custom-table-btn {
  margin: 0px 21px;
  color: #c4c4c4;
  opacity: 0.8;
}
.dropdown-content {
  padding: 0px;
  a {
    border-bottom: 1px solid #f8f8f8;
    padding: 15px 10px;
    font-family: 'GothamLight', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 100%;
    &:hover {
      background: transparent;
    }
    &:last-child {
      border: none;
    }
    i {
      color: #c4c4c4;
      opacity: 0.8;
      padding: 0px 5px;
    }
  }
}
</style>
