<template>
  <div class="navbar container">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item title">
          <i class="fa fa-rocket logo"></i><h1>Eve Pay</h1>
        </a>
      </div>

      <div class="nav-center">
        <a class="nav-item">
          <span class="icon">
            <i class="fa fa-github"></i>
          </span>
        </a>
        <a class="nav-item">
          <span class="icon">
            <i class="fa fa-twitter"></i>
          </span>
        </a>
      </div>

      <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
      <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
      <span class="nav-toggle" :class="{'is-active': isActive}" @click="isActive = !isActive">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div class="nav-right nav-menu">
        <router-link to="/payouts" class="nav-item" >
          Payouts
        </router-link>
        <router-link to="/config" class="nav-item">
          Config
        </router-link>
        <router-link to="/about" class="nav-item">
          About
        </router-link>

        <span class="nav-item">
          <a class="button" >
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
            <span>Tweet</span>
          </a>
          <a class="button is-primary">
            <span class="icon">
              <i class="fa fa-download"></i>
            </span>
            <span>Download</span>
          </a>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isActive: false
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
