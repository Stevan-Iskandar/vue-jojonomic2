<template>
  <div class="container">
    <div class="row">

      <v-client-table
        id="dataTable"
        v-model="response"
        :columns="columns"
        :options="options">
        <span slot="no" slot-scope="props">{{ props.index }}</span>
        <button type="button" slot="id" slot-scope="props" title="Detail" class="btn btn-primary" :data-id="props.row.id">
          <font-awesome-icon :icon="['fas', 'users']"/>
        </button>
      </v-client-table>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
const headers = {
  'X-Auth-Token' : '4fb1d2a25bbd47b8b0e198981893128b'
}

export default {
  name: 'Team',
  data () {
    return {
      columns: [
        'no',
        'name',
        'shortName',
        'address',
        'venue',
        'id'
      ],
      response: [],
      options: {
        headings: {
          no: 'No',
          name: 'Name',
          shortName: 'Short name',
          address: 'Address',
          venue: 'Venue',
          id: 'Edit'
        },
        sortable: [
          'no',
          'name',
          'shortName',
          'address',
          'venue'
        ],
        filterable: [
          'name',
          'shortName',
          'address',
          'venue'
        ]
      }
    }
  },

  methods: {
    // 
  },

  mounted() {
    axios({
      url: 'http://api.football-data.org/v2/teams',
      method: 'get',
      headers : headers,
      params: {
        areas: 2114
      }
    })

    .then(response => {
      let data = response.data.teams;
      // console.log(data);
      this.response = data;
    })
    .catch(error => {
      console.log(error);
    });
  }
}
</script>

<style>
#app {
  width: 95%;
  margin-top: 50px; 
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}
</style>