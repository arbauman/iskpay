<template>
  <div id="app">
    <navbar v-on:toggle="toggle" ></navbar>
    <div class="container">
      <div id="roleOn" class="modal">
        <div @click="toggle('roleOn')" class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Set Roles</p>
            <button @click="toggle('roleOn')" class="delete"></button>
          </header>
          <section class="modal-card-body">
            <div v-for="role in roles">
              <div class="field-body">
                <p class="control">
                  <input class="input" v-model="role.name" type="text" placeholder="Role title">
                  <input class="input" v-model="role.value" type="number" placeholder="Point Value">
                </p>
              </div>
              
            </div>
            <div v-if="roles.length > 1">
              <button @click="remRole">-</button>  
            </div>
            <button @click="addRole">+</button>
          </section>
          <footer class="modal-card-foot">
            <a class="button is-success">Save changes</a>
            <a class="button">Cancel</a>
          </footer>
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
      <div class="columns">
        <div class="column">
          
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
      roles: [{ name: 'DPS', value: '10' }],
      pilots: [{ name: 'Conrad', roles: ['DPS'] }],
      totalISK: 0,
      roleOn: false,
      aboutOn: false
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
        value: 0
      });
    },
    remRole() {
      this.roles.pop();
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
