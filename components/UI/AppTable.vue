<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :name="column.dataindex"
            :style="column.style"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in dataSource" :key="record">
          <td v-for="column in columns" :key="column" :style="column.style">
            <slot
              v-if="column.dataIndex !== 'actions'"
              :name="column.dataIndex"
              :record="record"
            >
              <span>{{ record[column.dataIndex] }}</span>
            </slot>
            <span v-else>
              <slot name="actions" :record="record"> </slot>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AppTable',
  components: {},
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  padding: 100px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(130, 130, 130, 0.671);
  -moz-box-shadow: 0px 0px 5px 0px rgba(130, 130, 130, 0.671);
  box-shadow: 0px 0px 5px 0px rgba(130, 130, 130, 0.671);
  th {
    font-family: GothamMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 100%;
    color: #2e434e;
    opacity: 0.5;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f8f8f8;
    &:first-child {
      padding-left: 30px;
    }
  }
  td {
    font-family: GothamLight;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    color: #2e434e;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f8f8f8;
    &:first-child {
      padding-left: 30px;
    }
  }
}
</style>
