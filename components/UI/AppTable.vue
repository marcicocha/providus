<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="header in dataIndex" :key="header">{{ header.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in students" :key="record">
          <td v-for="header in dataIndex" :key="header">
            <span v-if="header.dataIndex !== 'actions'">{{
              record[header.dataIndex]
            }}</span>
            <span v-else></span>
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
  props: {},
  data() {
    return {
      students: [
        {
          id: 1,
          name: 'Wasif',
          age: 21,
          email: 'wasif@email.com',
        },
        { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
        { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
        { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' },
      ],
      dataIndex: [
        {
          name: 'their Names',
          dataIndex: 'name',
        },
        {
          name: 'their ages',
          dataIndex: 'age',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    renderTableData() {
      return this.students.map((student, index) => {
        const { id, name, age, email } = student // destructuring
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{email}</td>
          </tr>
        )
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
}
</style>
