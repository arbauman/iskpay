<template>
  <div class="navbar">
    <nav class="nav">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <i class="fa">Ƶ Pay</i>
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
      </div>
    </nav>
    <div id="configOn" class="modal">
      <div @click="update" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Config</p>
          <button @click="update" class="delete"></button>
        </header>
        <section class="modal-card-body">
        <div class="content">
          <div class="columns">
            <div class="column is-12">
              <div :title="weightsInfo" class="is-pulled-left">
                <p class="title">Weights <span class="icon is-small"><i class="fa fa-info-circle"></i></span></p>
              </div>
              <div class="is-pulled-right">
                <a @click="setWeights([100, 100, 100, 100, 100])" class="button">Flat</a>
                <a @click="setWeights([100, 95, 85, 60, 45])" class="button">Gradual</a>
                <a @click="setWeights([100, 75, 50, 25, 1])" class="button">Linear</a>
                <a @click="setWeights([100, 30, 10, 2, 1])" class="button">Steep</a>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column" v-for="(weight, index) in weights">
              <div class="field has-addons">
                <p class="control has-icon has-icon-right">
                  <input class="input" v-model.number="weights[index]" type="number" placeholder="Weight">
                  <span class="icon is-small">
                    <i class="fa">%</i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <div :title="corpInfo" class="is-pulled-left">
                <p class="title">Corporation Cut <span class="icon is-small"><i class="fa fa-info-circle"></i></span></p>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <div class="field has-addons">
                <p class="control has-icon has-icon-right">
                  <input class="input" v-model.number="corpCut[0]" type="number" min="0" max="100" step="1" placeholder="Corporation %">
                  <span class="icon is-small">
                    <i class="fa">%</i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        </section>
        <section class="modal-card-foot">
          <a @click="reset" title="Resets weights, corp cut, roles, and pilots to default." class="button is-outlined is-fullwidth is-danger"><span class="icon is-small"><i class="fa fa-exclamation-circle"></i></span>Reset Defaults</a>
          <a @click="update" class="button is-outlined is-info is-fullwidth">Close</a>
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
          <div class="content is-small">
            <p>Wormhole anomalies are a challenging and lucrative type of dungeon in EVE Online.  The more difficulty anomalies require a well-coordinated fleet of pilots in a variety of roles.</p>
            <p>When I was in a wormhole corporation, the corp sold the loot from the sites and split the proceeds among those who participated.  The division was done manually, but in a process similar to what this app allows.</p>

            <h1>How to Use</h1>
            <p>Pronounced 'ISK Pay', this app is designed to automate the process of distributing payouts to a corporation.  The idea is to create a list of roles (Logistics, DPS, Scouts, Webs, Neuts, etc.) and assign point values to them.  These points mean nothing other than how they compare to each other; higher-value roles get more points than lower-value roles.  Then add all the pilots and assign the roles they performed.  Below in the Paystub, you'll see a table that will quickly tell you how much ISK each pilot will get.</p>
            <p>This app uses localStorage to save your Roles, Pilot names, Corp tax, and weights between reloads.  If you clear your cache, you'll have to redo all of it.</p>

            <h1>Advanced Features</h1>
            <p>In the Config menu, you can set your role weights.  These are percentages out of 100, and only apply if you have pilots with more than one role (as in alts).  If a pilot has more than one role, the most valuable role is multiplied by the modifier in the first weight slot, the second-most-valuable by the modifier in the second slot, and so on.  If you have more than 5 roles assigned to a pilot (over achiever much?), the modifier of the final slot will be used for all subsequent roles.  By default all slots are set to 100, so pilots will receive full points for all roles.</p>
            <p>Additionally, you may set a Corporation Tax modifier.  The set percentage of the total ISK will be reserved for the corporation, and the rest of the ISK will be divided among the pilots as normal.</p>

            <h1>Disclaimers</h1>
            <p>No guarantees are made regarding complete accuracy of calculations.  This is not professional financial software, there may be wayward ISK-pennies floating around if you have some odd percentages.  Don't blame me if someone in your corp is skimming off the top.</p>

            <h1>Issues?</h1>
            <p>This app is build with Vue.js and the Bulma css framework.  Check the footer for links.  If you've found a bug, or have ideas/suggestions for improvement, submit an issue (in order of preference) on GitLab, GitHub, or PM it to me on Discord.  The GitHub is mirrored from GitLab, so please direct all pull requests to GitLab.  My Discord is DarkArcher#1520.</p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a @click="toggle('aboutOn')" class="button is-outlined is-info is-fullwidth">Done</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['weights', 'corpCut'],
  data() {
    return {
      aboutOn: false,
      configOn: false,
      weightsInfo: 'Example: Pilot A has 6 roles.  Each is worth 10 points.  The roles are in order of point value, from highest to lowest.\n[Flat]  ((role1 * 1) + (role2 * 1) + (role3 * 1) + (role4 * 1) + (role5 * 1) + (role6 * 1)) = 60 points\n[Gradual] ((role1 * 1) + (role2 * 0.95) + (role3 * 0.85) + (role4 * 0.60) + (role5 * 0.45) + (role6 * 0.45)) = 43 points\n[Linear] ((role1 * 1) + (role2 * 0.75) + (role3 * 0.50) + (role4 * 0.25) + (role5 * 0.01) + (role6 * 0.01)) = 25.2 points\n[Steep] ((role1 * 1) + (role2 * 0.30) + (role3 * 0.10) + (role4 * 0.02) + (role5 * 0.01) + (role6 * 0.01)) = 14.4 points',
      corpInfo: 'This percentage of the total ISK is reserved automatically by the Corporation.\nThe remaining ISK is divided amongst the pilots as usual.  Set to 0 to disable.'
    };
  },
  methods: {
    setWeights(array) {
      this.$emit('setWeights', array);
    },
    reset() {
      this.$emit('reset');
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
.nav {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
}
a span i.fa {
  padding-right: 5px;
}
</style>
