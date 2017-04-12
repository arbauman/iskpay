<template>
  <div id="app">
    <div class="flexframe">
        <navbar @setWeights="setWeights" @update="addPoints" :weights="weights" :corpCut="corpCut" ></navbar>
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
                    <div class="tile is-parent">
                      <article class="tile is-child">
                      <div class="field">
                        <input class="input is-fullwidth" v-model="totalISK" type="text" placeholder="Total ISK">
                      </div>
                      </article>
                    </div>
                    <div class="tile is-parent">
                      <article class="tile is-child notification">
                        <p class="title">Paystub</p>
                        <table class="table is-striped">
                          <thead>
                            <tr>
                              <th>Pilot</th>
                              <th>Roles</th>
                              <th>Points</th>
                              <th>Percentage</th>
                              <th>Payout</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th>Pilot</th>
                              <th>Roles</th>
                              <th>Points</th>
                              <th>Percentage</th>
                              <th>Payout</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            <tr v-if="corpCut > 0">
                              <td><strong>Corporation</strong></td>
                              <td>Tax</td>
                              <td>N/A</td>
                              <td>{{ (corpCut[0] * 100).toFixed(2) }}%</td>
                              <td>{{ (totalISK * corpCut).toFixed(2) }} ISK</td>
                            </tr>
                            <tr v-for="pilot in pilots">
                              <td>{{ pilot.name }}</td>
                              <td>{{ pilot.roles.join(', ') }}</td>
                              <td>{{ pilot.points }}</td>
                              <td>{{ ((pilot.points / adjustedPoints) * 100).toFixed(2) }}%</td>
                              <td>{{ (remainingISK * (pilot.points / totalPoints)).toFixed(2) }} ISK</td>
                            </tr>
                          </tbody>
                        </table>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="footer">
            <div class="container">
              <div class="content has-text-centered">
                <p>
                  <strong>Payouts</strong> by <a href="https://gitlab.com/arbauman">Arbauman</a>. The source code is licensed
                  <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                </p>
                <p>
                  <a class="icon" href="https://gitlab.com/arbauman/payouts">
                    <i class="fa fa-gitlab"></i>
                  </a>
                </p>
              </div>
            </div>
          </footer>
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
  data() {
    return {
      weights: [1, 0.75, 0.50, 0.25, 0.05],
      corpCut: [0],
      roles: [{ name: '', basePoints: 0 }],
      pilots: [{ name: '', roles: [], points: 0 }],
      totalISK: '',
      roleOn: true,
      aboutOn: false,
      totalOn: false,
      outputText: []
    };
  },
  computed: {
    adjustedPoints() {
      return this.totalPoints / (1 - this.corpCut);
    },
    totalPoints() {
      let total = 0;
      this.pilots.forEach((pilot) => {
        total += pilot.points;
      });
      return total;
    },
    remainingISK() {
      return this.totalISK * (1 - this.corpCut);
    }
  },
  methods: {
    setWeights(array) {
      this.weights = array;
    },
    addPoints() {
      const vm = this;
      this.pilots.forEach((pilot, pIndex) => {
        vm.pilots[pIndex].roles.sort((a, b) =>
          vm.roles.find(role => role.name === b).basePoints -
          vm.roles.find(role => role.name === a).basePoints);
        let points = 0;
        vm.pilots[pIndex].roles.forEach((role, index) => {
          points += vm.roles.find(item => item.name === role).basePoints * vm.weights[index]
          || vm.roles.find(item => item.name === role).basePoints * vm.weights[4];
        });
        /* eslint-disable no-param-reassign */
        pilot.points = points;
      });
    },
    addRole() {
      this.roles.push({ name: '', basePoints: 0 });
    },
    removeRole(index) {
      this.roles.splice(index, 1);
    },
    addPilot() {
      this.pilots.push({
        name: '',
        roles: [],
        points: 0
      });
    },
    removePilot(index) {
      this.pilots.splice(index, 1);
    },
    toggleRole(adding, pilot, pilotIndex, role, pilotRoleIndex) {
      if (adding) {
        this.pilots[pilotIndex].roles.push(role.name);
      } else {
        this.pilots[pilotIndex].roles.splice(pilotRoleIndex, 1);
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
