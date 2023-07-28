<template>
  <div id="app">
    <RouterView style="overflow-x:hidden; overflow-y:hidden;"/>
  </div>
</template>

<script>
import 'vue3-toastify/dist/index.css';

export default {
  name: 'App',
  created() {
  }
}
</script>

<style>
* {
  overflow-x: hidden; /* Hide horizontal scrollbar */
}
</style>