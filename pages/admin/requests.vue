<template>
  <div>
    <div class="page_header">
      <h1>Request</h1>
    </div>
    <div class="tabs is-toggle">
      <ul>
        <li :class="{ 'is-active': tabsel == 'all' }" @click="tabsel = 'all'">
          <a>All</a>
        </li>
        <li
          :class="{ 'is-active': tabsel == 'pending' }"
          @click="tabsel = 'pending'"
        >
          <a>Pending</a>
        </li>
        <li
          :class="{ 'is-active': tabsel == 'approved' }"
          @click="tabsel = 'approved'"
        >
          <a>Approved</a>
        </li>
        <li :class="{ 'is-active': tabsel == 'doc' }" @click="tabsel = 'doc'">
          <a>Rejected</a>
        </li>
      </ul>
    </div>

    <!-- Tab panes -->
    <div class="content">
      <div v-show="tabsel == 'all'">
        <AppTable :columns="columns" :data-source="dataSource">
          <template slot="category" slot-scope="{ record }">
            <span
              v-if="record.category === 'R'"
              style="background: #fdb813; padding: 10px; color: #f8f8f8"
              >{{ record.category }}</span
            >
            <span
              v-if="record.category === 'C'"
              style="background: #2e434e; padding: 10px; color: #f8f8f8"
              >{{ record.category }}</span
            >
          </template>
          <template slot="status" slot-scope="{ record }">
            <span
              class="status"
              :style="
                record.status === 'Pending'
                  ? 'background: #FFFCE6; color: #A19101'
                  : record.status === 'Approved'
                  ? 'background: #D2F9D9; color: #18C139'
                  : record.status === 'Rejected'
                  ? 'background: #FDF7F7; color: #CC4C4C'
                  : ''
              "
              >{{ record.status }}</span
            >
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
      </div>
      <div v-show="tabsel == 'pending'">
        <AppTable :columns="columns" :data-source="dataSource"></AppTable>
      </div>
      <div v-show="tabsel == 'approved'"><AppTable /></div>
      <div v-show="tabsel == 'doc'"><AppTable /></div>
    </div>
  </div>
</template>

<script>
import AppTable from '@/components/UI/AppTable.vue'

const dataSource = [
  {
    id: '01.',
    requestId: '#202014D1',
    category: 'R',
    dateOfRequest: '14 Dec 2019',
    dateOfReview: '15 Dec 2019',
    initiatorId: 'INI2201',
    status: 'Pending',
  },
  {
    id: '02.',
    requestId: '#202014D1',
    category: 'C',
    dateOfRequest: '14 Dec 2019',
    dateOfReview: '15 Dec 2019',
    initiatorId: 'INI2201',
    status: 'Approved',
  },
  {
    id: '03.',
    requestId: '#202014D1',
    category: 'R',
    dateOfRequest: '14 Dec 2019',
    dateOfReview: '15 Dec 2019',
    initiatorId: 'INI2201',
    status: 'Pending',
  },
  {
    id: '04.',
    requestId: '#202014D1',
    category: 'C',
    dateOfRequest: '14 Dec 2019',
    dateOfReview: '15 Dec 2019',
    initiatorId: 'INI2201',
    status: 'Rejected',
  },
  {
    id: '05.',
    requestId: '#202014D1',
    category: 'R',
    dateOfRequest: '14 Dec 2019',
    dateOfReview: '15 Dec 2019',
    initiatorId: 'INI2201',
    status: 'Pending',
  },
  {
    id: '06.',
    requestId: '#202014D1',
    category: 'R',
    dateOfRequest: '14 Dec 2019',
    dateOfReview: '15 Dec 2019',
    initiatorId: 'INI2201',
    status: 'Pending',
  },
]
const columns = [
  {
    name: 'No.',
    dataIndex: 'id',
  },
  {
    name: 'Request ID',
    dataIndex: 'requestId',
    // style: 'width: auto',
  },
  {
    name: 'Category',
    dataIndex: 'category',
    style: 'text-align: center',
  },
  {
    name: 'Date of Request',
    dataIndex: 'dateOfRequest',
  },
  {
    name: 'Date Of Review',
    dataIndex: 'dateOfReview',
  },
  {
    name: 'Initiator ID',
    dataIndex: 'initiatorId',
  },
  {
    name: 'Status',
    dataIndex: 'status',
    style: 'text-align: center',
  },
  {
    name: '',
    dataIndex: 'actions',
  },
]
export default {
  layout: 'dashboard',
  components: {
    AppTable,
  },
  data() {
    return {
      tabsel: 'all',
      dataSource,
      columns,
    }
  },
  methods: {},
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
}
.tabs {
  margin-bottom: 0px;
}
.status {
  padding: 10px 12px;
  border-radius: 5px;
}
li {
  margin: 0px 3px;
  a {
    padding: 10px 50px;
  }
  &:first-child {
    margin-left: 0px;
  }
}
.tabs.is-toggle li a {
  background: #eff3f6;
  font-family: GothamLight;
  font-weight: 600;
}
.tabs.is-toggle li.is-active a {
  background-color: #fff;
  border-color: #dbdbdb;
  color: #000;
  transform: scale(1.2);
  font-family: GothamMedium;
  font-weight: 500;
}
</style>
