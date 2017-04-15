<template>
  <div class="rolepicker">
    <div v-if="roles.length === 0">
      <div class="columns">
        <div class="column">
          <article class="message is-warning">
            <div title="Why are we still here?" class="message-body">
              <span class="icon"><i class="fa fa-frown-o"></i></span>No roles
            </div>
          </article>
        </div>
      </div>
    </div>
    <div v-for="(role, index) in roles">
      <div class="field has-addons">
        <p class="control">
          <a class="button is-outlined is-danger" @click="removeRole(role.id)">
            Remove
          </a>
        </p>
        <p class="control is-expanded">
          <input class="input" v-model="roles[index].name" type="text" placeholder="Role">
        </p>
        <p class="control">
          <input class="input" v-model.number="roles[index].basePoints" type="number" min="0" step="1"placeholder="Base Point Value">
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a class="button is-info is-outlined is-pulled-right" @click="addRole">Add Role</a>
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
    removeRole(id) {
      this.$emit('removeRole', id);
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
