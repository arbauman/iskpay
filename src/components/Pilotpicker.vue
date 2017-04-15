<template>
  <div class="pilotpicker">
    <div v-if="pilots.length === 0">
      <div class="columns">
        <div class="column">
          <article class="message is-warning">
            <div title="Just to suffer?"class="message-body">
              <span class="icon"><i class="fa fa-meh-o"></i></span>No pilots
            </div>
          </article>
        </div>
      </div>
    </div>
    <div v-for="(pilot, pilotIndex) in pilots">
      <div class="columns">
        <div id="pilot" class="column">
          <div class="field has-addons has-addons-centered">
          <p class="control">
            <a class="button is-outlined is-danger" @click="remPilot(pilot.id)">
              Remove
            </a>
          </p>
          <p class="control is-expanded">
            <input class="input" v-model="pilot.name" type="text" placeholder="Pilot Name">
          </p>
        </div>
        </div>
        <div class="column">
          <span v-for="(role, roleIndex) in roles" v-if="role.name !== ''">
            <span v-if="pilot.roles.includes(role.id)">
              <a @click="toggleRole(pilot, role)"  v-bind:id="pilot.id + role.id" class="tag is-dark">{{ role.name }}</a>
            </span>
            <span v-else>
              <a @click="toggleRole(pilot, role)"  v-bind:id="pilot.id + role.id" class="tag">{{ role.name }}</a>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a class="button is-outlined is-info is-pulled-right" @click="addPilot">Add Pilot</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pilotpicker',
  props: ['pilots', 'roles'],
  methods: {
    remPilot(id) {
      this.$emit('removePilot', id);
    },
    addPilot() {
      this.$emit('addPilot');
    },
    toggleRole(pilot, role) {
      this.$emit('toggleRole', pilot, role);
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
.column#pilot {
  padding-bottom: 0rem;
}


</style>
