<template>
  <div class="navbar">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item">
          <i class="fa">Ƶ Pay</i>
        </a>
      </div>

      <span id="kazuhira" class="nav-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div id="hammenu"class="nav-right nav-menu">
        <a @click="toggle('configOn')" class="nav-item">Config</a>
        <a @click="toggle('aboutOn')" class="nav-item">About</a>
      </div>
    </nav>

    <div id="configOn" class="modal">
      <div @click="update" class="modal-background"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Config
          </p>

          <button @click="update" class="delete"></button>
        </header>

        <section class="modal-card-body">
          <div class="tabs is-centered">
            <ul>
              <li id="weights" class="is-active" @click="changeTab('weights')"><a>Weights</a></li>
              <li id="tax" @click="changeTab('tax')"><a>Corp Tax</a></li>
            </ul>
          </div>

          <div v-if="currentTab === 'weights'">
            <div class="field has-addons has-addons-centered">
              <p class="control">
                <a class="button" @click="setWeights([100, 100, 100, 100, 100])">
                  <span>Off</span>
                </a>
              </p>
              <p class="control">
                <a class="button" @click="setWeights([100, 95, 85, 60, 45])">
                  <span>Slow</span>
                </a>
              </p>
              <p class="control" @click="setWeights([100, 75, 50, 25, 1])">
                <a class="button">
                  <span>Steady</span>
                </a>
              </p>
              <p class="control" @click="setWeights([100, 30, 10, 2, 1])">
                <a class="button">
                  <span>Rapid</span>
                </a>
              </p>
            </div>

            <div class="columns is-multiline">
              <div class="column is-12" v-for="(weight, index) in weights">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">Weight {{index + 1}}</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icon has-icon-right">
                        <input class="input" v-model.number="weights[index]" min="-100" max="100" type="number">
                        <span class="icon is-small">
                          <i class="fa">%</i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="currentTab === 'tax'">
            <div class="columns">
              <div class="column is-12">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">Corp Tax %</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icon has-icon-right">
                        <input class="input" v-model.number="corpCut[0]" type="number" min="0" max="100" step="1" placeholder="Corporation %">
                        <span class="icon is-small">
                          <i class="fa">%</i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="modal-card-foot">
          <a @click="reset" title="Resets weights, corp cut, roles, and pilots to default." class="button is-outlined is-fullwidth is-danger">
            <span class="icon is-small"><i class="fa fa-exclamation-circle"></i></span>
            Reset
          </a>

          <a @click="update" class="button is-outlined is-info is-fullwidth">
            Close
          </a>
        </section>
      </div>
    </div>

    <div id="aboutOn" class="modal">
      <div @click="toggle('aboutOn')" class="modal-background"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            About
          </p>

          <button @click="toggle('aboutOn')" class="delete"></button>
        </header>

        <section class="modal-card-body">
          <div class="content is-small">
            <p>
              Wormhole anomalies are a challenging and lucrative type of dungeon in EVE Online.  The more difficulty 
              anomalies require a well-coordinated fleet of pilots in a variety of roles.
            </p>

            <p>
              When I was in a wormhole corporation, the corp sold the loot from the sites and split the proceeds among 
              those who participated.  The division was done manually, but in a process similar to what this app allows.
            </p>

            <h1>How to Use</h1>

            <p>
              Pronounced 'ISK Pay', this app is designed to automate the process of distributing payouts to a 
              corporation.  The idea is to create a list of roles (Logistics, DPS, Scouts, Webs, Neuts, etc.) and 
              assign point values to them.  These points mean nothing other than how they compare to each other; 
              higher-value roles get more points than lower-value roles.  Then add all the pilots and assign the roles 
              they performed.  Below in the Paystub, you'll see a table that will quickly tell you how much ISK each 
              pilot will get.
            </p>

            <p>
              This app uses localStorage to save your Roles, Pilot names, Corp tax, and weights between reloads.  
              If you clear your cache, you'll have to redo all of it.
            </p>

            <h1>Advanced Features</h1>

            <p>
              In the Config menu, you can set your role weights.  These are percentages out of 100, and only apply if 
              you have pilots with more than one role (as in alts).  If a pilot has more than one role, the most 
              valuable role is multiplied by the modifier in the first weight slot, the second-most-valuable by the 
              modifier in the second slot, and so on.  If you have more than 5 roles assigned to a pilot (over achiever 
              much?), the modifier of the final slot will be used for all subsequent roles.  By default all slots are 
              set to 100, so pilots will receive full points for all roles.
            </p>

            <p>
              Additionally, you may set a Corporation Tax modifier.  The set percentage of the total ISK will be 
              reserved for the corporation, and the rest of the ISK will be divided among the pilots as normal.
            </p>

            <h1>Disclaimers</h1>

            <p>
              No guarantees are made regarding complete accuracy of calculations.  This is not professional financial 
              software, there may be wayward ISK-pennies floating around if you have some odd percentages.  Don't blame 
              me if someone in your corp is skimming off the top.
            </p>

            <h1>Issues?</h1>

            <p>
              This app is build with Vue.js and the Bulma css framework.  Check the footer for links.  If you've found a 
              bug, or have ideas/suggestions for improvement, submit an issue (in order of preference) on GitLab, GitHub, 
              or PM it to me on Discord.  The GitHub is mirrored from GitLab, so please direct all pull requests to 
              GitLab.  My Discord is DarkArcher#1520.
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a @click="toggle('aboutOn')" class="button is-outlined is-info is-fullwidth">
            Done
          </a>
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
      kazuhira: false,
      currentTab: 'weights',
      configOn: false,
      weightsInfo: 'Example: Pilot A has 6 roles.  Each is worth 10 points.  The roles are in order of point value, from highest to lowest.\n[Flat]  ((role1 * 1) + (role2 * 1) + (role3 * 1) + (role4 * 1) + (role5 * 1) + (role6 * 1)) = 60 points\n[Gradual] ((role1 * 1) + (role2 * 0.95) + (role3 * 0.85) + (role4 * 0.60) + (role5 * 0.45) + (role6 * 0.45)) = 43 points\n[Linear] ((role1 * 1) + (role2 * 0.75) + (role3 * 0.50) + (role4 * 0.25) + (role5 * 0.01) + (role6 * 0.01)) = 25.2 points\n[Steep] ((role1 * 1) + (role2 * 0.30) + (role3 * 0.10) + (role4 * 0.02) + (role5 * 0.01) + (role6 * 0.01)) = 14.4 points',
      corpInfo: 'This percentage of the total ISK is reserved automatically by the Corporation.\nThe remaining ISK is divided amongst the pilots as usual.  Set to 0 to disable.'
    };
  },
  methods: {
    setWeights(array) {
      this.$emit('setWeights', array);
    },
    changeTab(string) {
      document.getElementById(this.currentTab).classList.remove('is-active');
      document.getElementById(string).classList.add('is-active');
      this.currentTab = string;
    },
    reset() {
      this.$emit('reset');
    },
    update() {
      this.$emit('update');
      this.toggle('configOn');
      this.toggleMenu();
    },
    toggleMenu() {
      if (this.kazuhira) {
        document.getElementById('kazuhira').classList.remove('is-active');
        document.getElementById('hammenu').classList.remove('is-active');
      } else {
        document.getElementById('kazuhira').classList.add('is-active');
        document.getElementById('hammenu').classList.add('is-active');
      }
      this.kazuhira = !this.kazuhira;
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

a span i.fa {
  padding-right: 5px;
}

</style>
