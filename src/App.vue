<template>
  <div id="app">
    <Navbar />
    <User />
    <router-view/>
  </div>
</template>

<script>
import User from './components/User'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    User,
    Navbar
  }
}
</script>

<style>

</style>
