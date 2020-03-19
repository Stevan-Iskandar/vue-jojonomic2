<template>
  <div id="app">
    <div class="container">
      <button
        class="switch area"
        @click="switchComponent('areas')"
        :disabled="currentComp === 'areas'">
        back
      </button>
    </div>
    <component :is="currentComp"></component>
  </div>
</template>

<script>
import Areas from './components/Areas'
import Teams from './components/Teams'
import Team from './components/Team'
import Player from './components/Player'
import {bus} from './main.js'
import $ from 'jquery'

export default {
  name: 'App',

  data () {
    return {
      currentComp: 'areas'
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
    'areas': Areas,
    'teams': Teams,
    'team': Team,
    'player': Player
  },

  mounted () {
    $('#app').on('click', '#dataTable .btn-primary', function() {
      // alert('ok');
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
