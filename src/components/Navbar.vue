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
        <a @click="toggle('configOn')" class="nav-item">Config</a>
        <a @click="toggle('aboutOn')" class="nav-item">About</a>
      </div>
      <div id="configOn" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Config</p>
          </header>
          <section class="modal-card-body">
          <div class="content">
            <div class="columns">
              <div class="column is-12">
                <h1 class="title">Weights</h1>        
                <a @click="setWeights([1, 0.3, 0.1, 0.01, 0.001])" class="button">Steep</a>
                <a @click="setWeights([1, 0.75, 0.5, 0.25, 0.01])" class="button">Linear</a>
                <a @click="setWeights([1, 0.85, 0.65, 0.50, 0.30])" class="button">Gentle</a>
                <a @click="setWeights([1, 1, 1, 1, 1])" class="button">Equal</a>
              </div>
            </div>
            <div class="columns">
              <div class="column" v-for="(weight, index) in weights">
                <input class="input" v-model.number="weights[index]" type="number" placeholder="Weight">
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <h1 class="title">Corporation Cut</h1>
                <input class="input" v-model.number="corpCut[0]" type="number" placeholder="Corporation %">
              </div>
            </div>
          </div>
          </section>
          <section class="modal-card-foot">
            <a @click="update" class="button is-fullwidth is-info">Update</a>
          </section>
        </div>
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
              <h1 class="title">About</h1>
              <p>This SPA is intended to be used to calculate earnings per pilot for Wormhole sites in EVE Online.</p>
              <h1 class="title">Roles</h1>
              <p>Each role is given a point value.  The important aspect is how each role compares to each other; a role worth 2 points is worth twice as much as a role worth 1.  Keep this in mind as you assign points to roles.</p>
              <h1 class="title">Pilots</h1>
              <p>Here you add the pilots who participated in the mission, and assign the roles you specified previously.  Keep in mind that there is an optional diminishing return effect.  In the config screen, you may set up to 5 multipliers.  A pilot's highest role will always recieve the first multiplier, the second-highest role will recieve the second multiplier, and so on.  If a pilot has more than 5 roles, the 5th role will be used for all additional roles.  And get that guy a coffee, he's working too hard.</p>
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
  props: ['weights', 'corpCut'],
  data() {
    return {
      aboutOn: false,
      configOn: false
    };
  },
  methods: {
    setWeights(array) {
      this.$emit('setWeights', array);
    },
    update() {
      this.$emit('update');
      this.toggle('configOn');
    },
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
.nav { position: fixed !important; top: 0; left: 0; right: 0; }
</style>
