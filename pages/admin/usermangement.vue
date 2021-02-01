<template>
  <div>
    <div class="page_header">
      <h1>User Management</h1>
      <div class="wrapper">
        <div class="search-bar">
          <AppSearchInput placeholder="Search Users" />
        </div>
        <div class="add-button-wrapper">
          <AppButton
            class="add-button"
            title="Add New User"
            color="primary"
            icon="fa fa-plus"
            @click="toggleModal('CREATE_MODE')"
          />
        </div>
      </div>
    </div>
    <AppTable :columns="columns" :data-source="dataSource">
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
              <a
                class="dropdown-item"
                @click="toggleModal('UPDATE_MODE', record)"
              >
                <i class="fas fa-pencil-alt" /> Edit User
              </a>
              <a
                class="dropdown-item"
                @click="toggleModal('DELETE_MODE', record)"
              >
                <i class="fa fa-trash-alt" /> Delete User
              </a>
            </div>
          </div>
        </div>
      </template>
    </AppTable>
    <!-- add modal -->
    <AppModal :is-visible="isModalVisible" @closeModal="closeModal">
      <template slot="modal-title"
        ><h1>
          {{
            mode === 'CREATE_MODE'
              ? 'Add New'
              : mode === 'UPDATE_MODE'
              ? 'Edit'
              : mode === 'DELETE_MODE'
              ? 'Delete'
              : ''
          }}
          User
        </h1></template
      >
      <template slot="content">
        <div v-if="mode !== 'DELETE_MODE'" class="columns is-multiline">
          <div class="column">
            <AppInput
              v-model="userObject.firstName"
              label="First Name"
              placeholder="Enter User’s First Name"
              @blur="daf"
            />
          </div>
          <div class="column">
            <AppInput
              v-model="userObject.lastName"
              label="Last Name"
              placeholder="Enter User’s Last Name"
            />
          </div>
          <div class="column is-full">
            <AppInput
              v-model="userObject.email"
              label="Email Address"
              placeholder="Enter User’s company email address"
            />
          </div>
          <div class="column is-full">
            <AppInput
              v-model="userObject.role"
              label="Role"
              placeholder="Select a role to promote user to"
            />
          </div>
          <div class="column is-full">
            <AppButton title="Submit" style="padding: 30px" />
          </div>
        </div>
        <div v-if="mode === 'DELETE_MODE'" class="columns is-multiline">
          <div class="column is-full">
            <p class="delete-message">
              Are you sure you want to delete this user? This action is
              irreversible.
            </p>
          </div>
          <div class="column">
            <AppButton class="custom-btn" title="No" style="padding: 20px" />
          </div>
          <div class="column">
            <AppButton class="custom-btn" title="Yes" style="padding: 20px" />
          </div>
        </div>
      </template>
    </AppModal>
  </div>
</template>
<script>
import AppTable from '@/components/UI/AppTable.vue'
import AppSearchInput from '@/components/UI/AppSearchInput.vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppModal from '@/components/UI/AppModal.vue'
import AppInput from '@/components/UI/AppInput.vue'

export default {
  layout: 'dashboard',
  components: {
    AppTable,
    AppSearchInput,
    AppButton,
    AppModal,
    AppInput,
  },
  data() {
    return {
      isModalVisible: false,
      mode: 'CREATE_MODE',
      userObject: {},
      dataSource: [
        {
          id: '01.',
          name: 'Wasif',
          userId: '#2894021',
          email: 'wasif@email.com',
          role: 'admin',
          date: '10-10-2019',
        },
        {
          id: '02.',
          name: 'Ali',
          userId: '#3234324',
          email: 'ali@email.com',
          role: 'admin',
          date: '10-10-2019',
        },
        {
          id: '03.',
          name: 'Saad',
          userId: '#4982304',
          email: 'saad@email.com',
          role: 'admin',
          date: '10-10-2019',
        },
        {
          id: '04.',
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
    toggleModal(mode) {
      if (mode) {
        this.mode = mode
        this.isModalVisible = true
      }
    },
    closeModal() {
      if (this.isModalVisible) {
        this.isModalVisible = false
      }
    },
    daf() {},
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
    margin-top: 15px;
    div {
      display: inline-block;
    }
    .search-bar {
      width: 350px;
    }
    .add-button-wrapper {
      width: auto;
      height: auto;
      float: right;
      .add-button {
        width: auto;
      }
    }
  }
}
.custom-btn {
  width: 100%;
}
.delete-message {
  font-family: GothamThin;
  font-weight: 600;
  font-size: 20px;
  color: #2e434e;
  opacity: 0.7;
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
