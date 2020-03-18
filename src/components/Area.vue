<template>
  <div class="container">
    <div class="row">

      <!-- <div class="col-6">
        <ul class="list-group" id="area">
          <li class="list-group-item active">Area</li>
          <li class="list-group-item" v-for="(item, i) in response" :key="`item-${i}`">{{ item.name }}</li>
        </ul>
      </div>

      <button class="btn btn-primary col-6" v-on:click="greet">Greeting</button> -->

      <datatable id="dataTable" :columns="columns" :data="response"></datatable>

    </div>
  </div>
</template>

<script>
const axios = require('axios').default;
const headers = {
  'X-Auth-Token' : '4fb1d2a25bbd47b8b0e198981893128b'
}

export default {
  name: 'Area',
  data () {
    return {
      columns: [
        {label: 'ID', field: 'id'},
        {label: 'Name', field: 'name', headerClass: 'class-in-header second-class'},
        {label: 'Country code', field: 'countryCode'},
        {label: 'Parent area ID', field: 'parentAreaId'},
        {label: 'Parent area', field: 'parentArea'},
        // {label: 'Address', representedAs: ({address, city, state}) => `${address}<br />${city}, ${state}`, interpolate: true}
      ],
      response: []
    }
  },

  methods: {
    greet () {
      alert('hello');
    }
  },

  mounted() {
    axios({
      url: 'http://api.football-data.org/v2/areas',
      method: 'get',
      responseType: 'stream',
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