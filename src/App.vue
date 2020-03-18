<template>
  <div id="app">
    <Area/>
    <div v-html="scripts"></div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import Area from './components/Area'

export default {
  name: 'App',
  components: {
    Area
  },
  data () {
    return {
      scripts: `
      <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.js" defer><\/script>
      <script src="/dist/vuejs-datatable.js" defer><\/script>
      <script src="/myscript.js" defer><\/script>
      `
    }
  }
}
</script>
