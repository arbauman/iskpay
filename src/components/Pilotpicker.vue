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
      <div class="columns is-mobile">
        <div id="pilot" class="column">
          <div class="field has-addons">
          <p class="control">
            <a class="button is-outlined is-danger" title="Delete this pilot" @click="remPilot(pilot.id)">
              Remove
            </a>
          </p>
          <p class="control">
            <input class="input" v-model="pilot.name" type="text" title="Type a name for this pilot" placeholder="Pilot Name">
          </p>
          <p class="control">
            <span class="select">
              <select title="Participation Percentage" @click="update" v-model.number="pilot.participation">
                <option>100</option>
                <option>90</option>
                <option>80</option>
                <option>70</option>
                <option>60</option>
                <option>50</option>
                <option>40</option>
                <option>30</option>
                <option>20</option>
                <option>10</option>
                <option>0</option>
              </select>
            </span>
          </p>
        </div>
        </div>
        <div id="tag" class="column">
          <span v-for="(role, roleIndex) in roles" v-if="role.name !== ''">
            <span v-if="pilot.roles.includes(role.id)">
              <a @click="toggleRole(pilot, role)" :title="helpAssign('unassign', pilot.name)" v-bind:id="pilot.id + role.id" class="tag is-dark">{{ role.name }}</a>
            </span>
            <span v-else>
              <a @click="toggleRole(pilot, role)" :title="helpAssign('assign', pilot.name)" v-bind:id="pilot.id + role.id" class="tag">{{ role.name }}</a>
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
    },
    update() {
      this.$emit('update');
    },
    helpAssign(verb, name) {
      const conj = verb === 'assign' ? 'to' : 'from';
      return `Click to ${verb} this role ${conj} ${name}`;
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
