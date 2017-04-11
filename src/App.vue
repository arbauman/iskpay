<template>
  <div id="app">
    <navbar v-on:toggle="toggle" ></navbar>
    <div class="container">
      <!-- Role Settings -->
      <div id="roleOn" class="modal is-active">
        <div @click="toggle('roleOn')" class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Set Roles</p>
            <button @click="toggle('roleOn')" class="delete"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <p>First, set the roles you would like to assign, along with their corresponding point values.</p>
            </div>
            <div v-for="(role, index) in roles">
              <div class="field-body">
                <p class="control">
                <div class="columns">
                  <button @click="remRole(index)" class="delete"></button>
                  <input class="column input" v-model="role.name" type="text" placeholder="Role title">
                </div>
                <div class="columns">
                  <input class="column input" v-model="role.value" type="number" placeholder="Point Value">
                </div>
                </p>
              </div>
            </div>
            <button @click="addRole">Add Role</button>
          </section>
          <footer class="modal-card-foot">
            <a @click="toggle('roleOn')" class="button is-success">Done</a>
          </footer>
        </div>
      </div>
      <!-- About -->
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
      <!-- Total Payouts -->
      <div id="totalOn" class="modal">
        <div @click="toggle('totalOn')" class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Payouts </p>
            <button @click="toggle('totalOn')" class="delete"></button>
          </header>
          <section class="modal-card-body">
            <div v-for="line in outputText">
              {{ line }}
            </div>
          </section>
        </div>
      </div>
      <!-- Pilot Settings -->
      <div class="content">
        <p>Now, enter the pilots who took part in the mission.  The roles you specified will populate the tag cloud on the right; click them to assign.</p>
      </div>
      <div v-for="(pilot, pilotIndex) in pilots">
        <div class="columns">
          <div class="column">
            <button @click="remPilot(pilotIndex)" class="delete"></button>
          </div>
          <div class="column is-2">
            <input class="input" v-model="pilot.name" type="text" placeholder="Pilot Name">
          </div>
          <div class="column is-10">
              <div style="display:inline;" v-for="(role, roleIndex) in roles">
                <a @click="toggleRole(pilot, pilotIndex, roleIndex, role)"  v-bind:id="pilot.name + role.name" class="tag">{{ role.name }}</a>
              </div>
          </div>
        </div>
      </div>
      <button @click="addPilot">Add Pilot</button>
      <div class="columns">
        <div class="column">
          <input class="input" v-model="totalISK" type="text" placeholder="Total ISK">
          <button @click="calculate" class="button is-success">Calculate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
      roles: [{ name: '', value: '' }],
      pilots: [{ name: '', roles: [], points: 0 }],
      totalISK: '',
      totalPoints: 0,
      roleOn: true,
      aboutOn: false,
      totalOn: false,
      outputText: []
    };
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
