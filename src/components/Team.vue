<template>
  <div class="container">

    <h1 class="text-center" v-if="dataReady">Team {{ response.name }}</h1>
    <h1 class="text-center" v-else>Team</h1>

    <div class="row">

      <div class="card col-sm-6 my-3" v-if="dataReady">
        <div class="card-body">
          <h5 class="card-title">{{ response.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ response.phone }}</h6>
          <p class="card-text">Address : {{ response.address }}</p>
          <a target="_blank" :href="response.website" class="card-link">Website</a>
        </div>
      </div>
      <div class="card col-sm-6 mt-3" v-else>
        <div class="card-body">
          <h5 class="card-title">Loading...</h5>
        </div>
      </div>

      <v-client-table
        id="team"
        v-model="squad"
        :columns="columns"
        :options="options">
        <span slot="no" slot-scope="props">{{ props.index }}</span>
        <button type="button" slot="id" slot-scope="props" title="Detail" class="btn btn-primary" :data-id="props.row.id">
          <font-awesome-icon :icon="['fas', 'user']"/>
        </button>
      </v-client-table>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {bus} from './../main.js';
import {idTeam} from './Teams'
import $ from 'jquery'

export let idPlayer

const headers = {
  'X-Auth-Token' : '4fb1d2a25bbd47b8b0e198981893128b'
}

export default {
  name: 'Team',
  data () {
    return {
      dataReady: false,
      columns: [
        'no',
        'name',
        'position',
        'nationality',
        'shirtNumber',
        'id'
      ],
      response: [],
      squad: [],
      options: {
        headings: {
          no: 'No',
          name: 'Name',
          position: 'Position',
          nationality: 'Nationality',
          shirtNumber: 'Shirt number',
          id: 'Edit'
        },
        sortable: [
          'no',
          'name',
          'position',
          'nationality',
          'shirtNumber'
        ],
        filterable: [
          'name',
          'position',
          'nationality',
          'shirtNumber'
        ]
      }
    }
  },

  mounted() {
    $('#app').on('click', '#team .btn-primary', function() {
      idPlayer = $(this).data("id");
      switchComponent('player');
    });
    function switchComponent(comp) {
      bus.$emit('switchComp', comp);
    }
    axios({
      url: 'http://api.football-data.org/v2/teams/' + idTeam,
      method: 'get',
      headers : headers
    })

    .then(response => {
      let data = response.data;
      let squad = response.data.squad;
      // console.log(data);
      this.response = data;
      this.squad = squad;
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