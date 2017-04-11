<template>
  <div id="app">
    <navbar v-on:toggle="toggle" ></navbar>
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-vertical">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child">
                <p class="title">Roles</p>
                <div class="content">
                  <rolepicker></rolepicker>
                </div>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child">
                <p class="title">Pilots</p>
                <div class="content">
                  <pilotpicker></pilotpicker>
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification">
              <p class="title">Output</p>
              <div class="content">
                {{ outputText }}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Rolepicker from './components/Rolepicker';
import Pilotpicker from './components/Pilotpicker';

export default {
  name: 'app',
  components: {
    Navbar,
    Rolepicker,
    Pilotpicker
  },
  computed: {
    totalPoints() {
      let total = 0;
      this.$store.state.pilots.forEach((pilot) => {
        pilot.roles.forEach((role) => {
          total += role.effectivePoints;
        });
      });
      return total;
    }
  },
  methods: {
    toggle(id) {
      this[id] ? document.getElementById(id).classList.remove('is-active')
      : document.getElementById(id).classList.add('is-active');
      this[id] = !this[id];
    },
    addRole() {
      this.roles.push({
        name: '',
        value: ''
      });
    },
    remRole(index) {
      this.roles.splice(index, 1);
    },
    addPilot() {
      this.pilots.push({
        name: '',
        roles: [],
        points: 0
      });
    },
    remPilot(index) {
      this.pilots.splice(index, 1);
    },
    toggleRole(pilot, pilotIndex, roleIndex, role) {
      const accIndex = this.pilots[pilotIndex].roles.indexOf(role.name);
      if (accIndex === -1) {
        document.getElementById(pilot.name + role.name).classList.add('is-success');
        this.pilots[pilotIndex].roles.push(role.name);
        this.pilots[pilotIndex].points += Number.parseFloat(role.value);
        this.totalPoints += Number.parseFloat(role.value);
      } else {
        document.getElementById(pilot.name + role.name).classList.remove('is-success');
        this.pilots[pilotIndex].roles.splice(accIndex, 1);
        this.pilots[pilotIndex].points -= Number.parseFloat(role.value);
        this.totalPoints -= Number.parseFloat(role.value);
      }
    },
    calculate() {
      this.outputText = [];
      this.totalOn = !this.totalOn;
      document.getElementById('totalOn').classList.add('is-active');
      this.pilots.forEach((pilot) => {
        const payout = this.totalISK * (pilot.points / this.totalPoints);
        this.outputText.push(`${pilot.name}: ${payout.toFixed(2)}`);
      });
    }
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
