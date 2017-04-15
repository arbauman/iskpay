<template>
  <div class="paystub">
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Pilot</th>
          <th>Roles</th>
          <th>Points</th>
          <th>Percentage</th>
          <th><div class="is-pulled-right">Payout</div></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Pilot</th>
          <th>Roles</th>
          <th>Points</th>
          <th>Percentage</th>
          <th><div class="is-pulled-right">Payout</div></th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-if="adjustedCorpCut > 0">
          <td><strong>Corporation</strong></td>
          <td>Tax</td>
          <td>N/A</td>
          <td>{{ getCorpPercent() }}</td>
          <td><div class="is-pulled-right">{{ corpISK }} ISK</div></td>
        </tr>
        <tr title="...You feel it too, don't you?" v-if="adjustedCorpCut <= 0 && pilots.length === 0" >
          <td>No data</td>
          <td>No data</td>
          <td>No data</td>
          <td>No data</td>
          <td><div class="is-pulled-right">No data</div></td>
        </tr>
        <tr v-for="pilot in pilots" v-if="pilots.length > 0">
          <td>{{ getPilotName(pilot) }}</td>
          <td>{{ getRoles(pilot) }}</td>
          <td>{{ getPoints(pilot) }}</td>
          <td>{{ getPercent(pilot) }}</td>
          <td><div class="is-pulled-right">{{ getISK(pilot.points) }} ISK</div></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'Paystub',
  props: [
    'adjustedCorpCut',
    'pilots',
    'adjustedPoints',
    'corpISK',
    'remainingISK',
    'totalPoints',
    'roles'
  ],
  methods: {
    getCorpPercent() {
      return numeral(this.adjustedCorpCut[0]).format('0.[00]%');
    },
    getPilotName(pilot) {
      return pilot.name || 'Nameless Pilot';
    },
    getPoints(pilot) {
      return numeral(pilot.points).format('0.[00]');
    },
    getISK(points) {
      return numeral(this.remainingISK * (points / this.totalPoints)).format('0,0.00');
    },
    getPercent(pilot) {
      const result = (pilot.points / this.adjustedPoints);
      return isNaN(result) ? 0 : numeral(result).format('0.[00]%');
    },
    getRoles(pilot) {
      const results = [];
      pilot.roles.forEach((roleId) => {
        const match = this.roles.find(role => role.id === roleId);
        if (match !== undefined) results.push(match.name);
      });
      return results.length === 0 ? 'No Roles' : results.join(', ');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
