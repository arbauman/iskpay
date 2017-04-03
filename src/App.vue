<template>
  <div id="app">
    <navbar></navbar>

    <router-view></router-view>

  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';
@import '~bulma';

#app {
}
</style>
