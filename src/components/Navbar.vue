<template>
  <div class="navbar">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item title">
          <i class="fa fa-rocket logo"></i><h1>Payouts</h1>
        </a>
      </div>

      <div class="nav-center">
      </div>

      <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
      <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div class="nav-right nav-menu">
        <a @click="toggle('aboutOn')" class="nav-item">
          About
        </a>
      </div>
      <div id="aboutOn" class="modal">
        <div @click="toggle('aboutOn')" class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">About</p>
            <button @click="toggle('aboutOn')" class="delete"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <ul>
                <li>Go to the Config page to set up a list of roles and associate point values with them.</li>
                <li>Return to the Payouts page and set the number of participants.</li>
                <li>Enter names for each participant and assign at least one role to each.</li>
                <li>Enter the total value of the site run in ISK, and press calculate.</li>
                <li>A breakdown of each pilot's payout will be generated!</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      aboutOn: false
    };
  },
  methods: {
    toggle(id) {
      this[id]
      ? document.getElementById(id).classList.remove('is-active')
      : document.getElementById(id).classList.add('is-active');
      this[id] = !this[id];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
