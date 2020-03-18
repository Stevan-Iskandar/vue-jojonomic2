<template>
  <div id="app">
    <div class="container">
      <button
        class="switch area"
        @click="switchComponent('area')"
        :disabled="currentComp === 'area'">
        area
      </button>
      <button
        class="switch team"
        @click="switchComponent('team')"
        :disabled="currentComp === 'team'">
        team
      </button>
    </div>
    <component :is="currentComp"></component>
  </div>
</template>

<script>
import Area from './components/Area'
import Team from './components/Team'
import {bus} from './main.js';
import $ from 'jquery'

export default {
  name: 'App',

  data () {
    return {
      currentComp: Area
    };
  },

  created() {
    bus.$on('switchComp', comp => {
      this.currentComp = comp;
    });
  },

  methods: {
    switchComponent(comp) {
      bus.$emit('switchComp', comp);
    }
  },

  components: {
    'area': Area,
    'team': Team
  },

  mounted () {
    $('#app').on('click', '#dataTable .btn-primary', function() {
      alert('ok');
    });
  }
}
</script>

<style scoped>
button.switch {
  background: none;
  border: 1px solid black;
  margin: 0;
  cursor: pointer;
}

button.switch[disabled='disabled'] {
  color: lightgray;
  border-color: lightgray;
}

button.switch:not([disabled='disabled']):hover {
  background-color: black;
  border-color: gray;
  color: lightgray;
}

button.team {
  border-color: red;
  color: red;
}


button.area {
  border-color: green;
  color: green; 
}
</style>
