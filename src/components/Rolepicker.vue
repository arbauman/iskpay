<template>
  <div class="rolepicker">
  
    <div v-for="(role, index) in roles">
      <div class="columns">
        <div class="column">
          <button @click="removeRole(index)" class="delete"></button>
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
      <div class="column">
        <a class="button is-pulled-right" @click="addRole">Add Role</a>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'Rolepicker',
  props: ['roles'],
  methods: {
    addRole() {
      this.$emit('addRole');
    },
    removeRole(index) {
      this.$emit('removeRole', index);
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
