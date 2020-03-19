<template>
  <div class="container">

    <h1 class="text-center" v-if="dataReady">
      <span v-for="(item, i) in response" :key="`item-${i}`">
        <span v-if="i == 0">
          {{ item.area.name }}
        </span>
      </span>
    </h1>
    <h1 class="text-center" v-else>Loading</h1>

    <div class="row">

      <v-client-table
        id="teams"
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
import {bus} from './../main.js';
import {id} from './Areas'
import $ from 'jquery'

export let idTeam

const headers = {
  'X-Auth-Token' : '4fb1d2a25bbd47b8b0e198981893128b'
}

export default {
  name: 'Teams',
  data () {
    return {
      dataReady: false,
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

  mounted() {
    $('#app').on('click', '#teams .btn-primary', function() {
      idTeam = $(this).data("id");
      switchComponent('team');
    });
    function switchComponent(comp) {
      bus.$emit('switchComp', comp);
    }
    axios({
      url: 'http://api.football-data.org/v2/teams',
      method: 'get',
      headers : headers,
      params: {
        areas: id
      }
    })

    .then(response => {
      let data = response.data.teams;
      // console.log(data);
      this.response = data;
      this.dataReady = true;
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