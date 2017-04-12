<template>
  <div class="pilotpicker">
    <div class="content">
      <p>Now, enter the pilots who took part in the mission.  The roles you specified will populate the tag cloud on the right; click them to assign.</p>
    </div>
    <div v-for="(pilot, pilotIndex) in pilots">
      <div class="columns">
        <div class="column">
          <button @click="remPilot(pilotIndex)" class="delete"></button>
        </div>
        <div class="column is-4">
          <input class="input" v-model="pilot.name" type="text" placeholder="Pilot Name">
        </div>
        <div class="column is-7">
            <div style="display:inline;" v-for="(role, roleIndex) in roles">
              <a @click="toggleRole(pilot, pilotIndex, role)"  v-bind:id="pilot.name + role.name" class="tag">{{ role.name }}</a>
            </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a class="button is-pulled-right" @click="addPilot">Add Pilot</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pilotpicker',
  props: ['pilots', 'roles'],
  methods: {
    remPilot(index) {
      this.$emit('removePilot', index);
    },
    addPilot() {
      this.$emit('addPilot');
    },
    toggleRole(pilot, pilotIndex, role) {
      const pilotRoleIndex = this.pilots[pilotIndex].roles
      .findIndex(item => role.name === item);
      if (pilotRoleIndex === -1) {
        /* eslint-disable no-console */
        console.log('Not Found, Adding');
        document.getElementById(pilot.name + role.name).classList.add('is-success');
        this.$emit('toggleRole', true, pilot, pilotIndex, role, pilotRoleIndex);
      } else {
        /* eslint-disable no-console */
        console.log('Found, removing');
        document.getElementById(pilot.name + role.name).classList.remove('is-success');
        this.$emit('toggleRole', false, pilot, pilotIndex, role, pilotRoleIndex);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

button.delete {
  position: relative;
  top: 6px;
  left: 15px;
}

</style>
