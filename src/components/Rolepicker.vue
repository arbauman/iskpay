<template>
  <div class="rolepicker">
    <div class="content">
      <p>First, set the roles you would like to assign, along with their corresponding point values.</p>
    </div>
    <div v-for="(role, index) in roles">
      <div class="columns">
        <div class="column">
          <button @click="remRole(index)" class="delete"></button>
        </div>
        <div class="column is-6">
          <input class="input" v-model="roles[index].name" type="text" placeholder="Role">
        </div>
        <div class="column is-5">
          <input class="input" v-model.number="roles[index].basePoints" type="number" placeholder="Base Point Value">
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-9"></div>
      <div class="column is-3">
        <a class="button" @click="addRole">Add Role</a>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'Rolepicker',
  methods: {
    addRole() {
      this.$store.commit('addRole');
    }
  },
  computed: {
    roles: {
      get() {
        return this.$store.state.roles;
      },
      set(value) {
        this.$store.commit('updateRoles', value);
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
}
</style>
