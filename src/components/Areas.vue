<template>
  <div class="container">

    <h1 class="text-center">Area</h1>

    <div class="row">

      <v-client-table
        id="area"
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
import $ from 'jquery'

export let id

const headers = {
  'X-Auth-Token' : '4fb1d2a25bbd47b8b0e198981893128b'
}

export default {
  name: 'Areas',
  data () {
    return {
      columns: [
        'no',
        'name',
        'countryCode',
        'parentAreaId',
        'parentArea',
        'id'
      ],
      response: [],
      options: {
        headings: {
          no: 'No',
          name: 'Name',
          countryCode: 'Country code',
          parentAreaId: 'Parent area ID',
          parentArea: 'Parent area',
          id: 'Edit'
        },
        sortable: [
          'no',
          'name',
          'countryCode',
          'parentAreaId',
          'parentArea'
        ],
        filterable: [
          'name',
          'countryCode',
          'parentAreaId',
          'parentArea'
        ]
      }
    }
  },

  mounted() {
    $('#app').on('click', '#area .btn-primary', function() {
      id = $(this).data("id");
      switchComponent('teams');
    });
    function switchComponent(comp) {
      bus.$emit('switchComp', comp);
    }
    axios({
      url: 'http://api.football-data.org/v2/areas',
      method: 'get',
      headers : headers
    })

    .then(response => {
      let data = response.data.areas;
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