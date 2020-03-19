<template>
  <div class="container">

    <h1 class="text-center">Player</h1>

    <div class="row">

      <div class="card col-sm-6 mt-3" v-if="dataReady">
        <div class="card-body">
          <h5 class="card-title">{{ response.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ response.nationality }}</h6>
          <p class="card-text">Date of birth : {{ response.dateOfBirth }}</p>
        </div>
      </div>
      <div class="card col-sm-6 mt-3" v-else>
        <div class="card-body">
          <h5 class="card-title">Loading...</h5>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {bus} from './../main.js';
import {idPlayer} from './Team'

const headers = {
  'X-Auth-Token' : '4fb1d2a25bbd47b8b0e198981893128b'
}

export default {
  name: 'Player',
  data () {
    return {
      dataReady: false,
      response: null
    }
  },

  mounted() {
    axios({
      url: 'http://api.football-data.org/v2/players/' + idPlayer,
      method: 'get',
      headers : headers
    })

    .then(response => {
      let data = response.data;
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
