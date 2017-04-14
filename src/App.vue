<template>
  <div id="app">
    <div class="flexframe">
        <navbar @reset="reset" @setWeights="setWeights" @update="addPoints" :weights="weights" :corpCut="corpCut" ></navbar>
        <div class="section flexcontent">
          <div class="container">
            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile">
                  <div class="tile is-parent">
                    <article class="tile is-child">
                      <p class="title">Roles</p>
                      <div class="content">
                        <rolepicker @removeRole="removeRole" @addRole="addRole" :roles="roles"></rolepicker>
                      </div>
                    </article>
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child">
                      <p class="title">Pilots</p>
                      <div class="content">
                        <pilotpicker @toggleRole="toggleRole" @removePilot="removePilot" @addPilot="addPilot" :roles="roles" :pilots="pilots"></pilotpicker>
                      </div>
                    </article>
                  </div>
                </div>
                <div class="tile is-vertical">
                  <div class="tile">
                    <div class="tile is-parent">
                      <article class="tile is-child">
                      </article>
                      <article class="tile is-child">
                        <div class="field is-horizontal">
                          <div class="field-label is-normal">
                            <label class="label">Total ISK</label>
                          </div>
                          <div class="field-body">
                            <div class="field is-grouped">
                              <p class="control is-expanded">
                                <input class="input" v-model.number="totalISK" type="number" min="0" step="1000"placeholder="ISK">
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div class="tile is-parent">
                    <article class="tile is-child notification">
                      <p class="title">Paystub<!--<a class="button is-pulled-right">Copy</a>--></p>
                      <paystub :roles="roles" :adjustedCorpCut="adjustedCorpCut" :pilots="pilots" :adjustedPoints="adjustedPoints" :corpISK="corpISK" :remainingISK="remainingISK" :totalPoints="totalPoints"></paystub>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <foot></foot>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral';
import shortid from 'shortid';
import Navbar from './components/Navbar';
import Rolepicker from './components/Rolepicker';
import Pilotpicker from './components/Pilotpicker';
import Paystub from './components/Paystub';
import Foot from './components/Foot';

export default {
  name: 'app',
  components: {
    Navbar,
    Rolepicker,
    Pilotpicker,
    Paystub,
    Foot
  },
  mounted() {
    this.$ga.trackPage('/');
    this.getSettings();
  },
  watch: {
    roles: {
      handler() {
        this.updateThings();
      },
      deep: true
    }
  },
  data() {
    return {
      weights: [100, 100, 100, 100, 100],
      corpCut: [0],
      roles: [{ name: '', basePoints: 0 }],
      pilots: [{ name: '', roles: [], points: 0 }],
      totalISK: 0
    };
  },
  computed: {
    adjustedWeights() {
      const results = [];
      this.weights.forEach((weight) => {
        results.push((weight / 100).toFixed(2));
      });
      return results;
    },
    adjustedCorpCut() {
      const result = [];
      result.push((this.corpCut[0] / 100));
      return result;
    },
    corpISK() {
      return numeral(this.totalISK * this.adjustedCorpCut).format('0,0.00');
    },
    adjustedPoints() {
      return this.totalPoints / (1 - this.adjustedCorpCut);
    },
    totalPoints() {
      let total = 0;
      this.pilots.forEach((pilot) => {
        total += pilot.points;
      });
      return total;
    },
    remainingISK() {
      return this.totalISK * (1 - this.adjustedCorpCut);
    }
  },
  methods: {
    updateThings() {
      this.pilots.forEach((pilot) => {
        pilot.roles.forEach((pilotRole) => {
          if (this.roles.find(role => role.id === pilotRole) === undefined) {
            pilot.roles = pilot.roles.filter(r => r !== pilotRole);
          }
        });
      });
      this.addPoints();
    },
    reset() {
      this.weights = [100, 100, 100, 100, 100];
      this.corpCut = [0];
      this.roles = [];
      this.pilots = [];
      this.saveSettings();
    },
    setWeights(array) {
      this.weights = array;
      this.addPoints();
    },
    saveSettings() {
      localStorage.setItem('weights', JSON.stringify(this.weights));
      localStorage.setItem('corpCut', JSON.stringify(this.corpCut));
      localStorage.setItem('roles', JSON.stringify(this.roles));
      const pilotsClean = [];
      this.pilots.forEach((pilot) => {
        pilotsClean.push({
          name: pilot.name,
          id: pilot.id,
          roles: [],
          points: 0
        });
      });
      localStorage.setItem('pilots', JSON.stringify(pilotsClean));
    },
    getSettings() {
      this.weights = JSON.parse(localStorage.getItem('weights')) || [100, 100, 100, 100, 100];
      this.corpCut = JSON.parse(localStorage.getItem('corpCut')) || [0];
      this.roles = JSON.parse(localStorage.getItem('roles')) || [{ name: '', basePoints: 0 }];
      this.pilots = JSON.parse(localStorage.getItem('pilots')) || [{ name: '', roles: [], points: 0 }];
    },
    addPoints() {
      this.saveSettings();
      const vm = this;
      this.pilots.forEach((pilot) => {
        pilot.roles.sort((a, b) =>
          vm.roles.find(role => role.id === b).basePoints -
          vm.roles.find(role => role.id === a).basePoints);
        let points = 0;
        pilot.roles.forEach((role, index) => {
          points += vm.roles.find(item => item.id === role).basePoints * vm.adjustedWeights[index]
          || vm.roles.find(item => item.id === role).basePoints * vm.adjustedWeights[4];
        });
        pilot.points = points;
      });
    },
    addRole() {
      this.roles.push({
        name: '',
        id: shortid.generate(),
        basePoints: 0
      });
      this.addPoints();
    },
    removeRole(id) {
      this.roles = this.roles.filter(role => role.id !== id);
      this.pilots.forEach((pilot) => {
        pilot.roles = pilot.roles.filter(role => role.id !== id);
      });
    },
    addPilot() {
      this.pilots.push({
        name: '',
        id: shortid.generate(),
        roles: [],
        points: 0
      });
      this.addPoints();
    },
    removePilot(id) {
      this.pilots = this.pilots.filter(pilot => pilot.id !== id);
      this.addPoints();
    },
    toggleRole(pilot, role) {
      if (pilot.roles.includes(role.id)) {
        pilot.roles = pilot.roles.filter(r => r !== role.id);
      } else {
        pilot.roles.push(role.id);
      }
      this.addPoints();
    }
  }
};
</script>

<style lang="scss">
@import '~bulma';

.flexframe {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.flexcontent {
  flex: 1;
}

#app {
}
</style>
