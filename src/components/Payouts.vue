<template>
  <div class="payouts container">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-4">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification">
              <p class="title">Instructions</p>
              <div class="content">
                <ul>
                  <li>Go to the Config page to set up a list of roles and associate point values with them.</li>
                  <li>Return to the Payouts page and set the number of participants.</li>
                  <li>Enter names for each participant and assign at least one role to each.</li>
                  <li>Enter the total value of the site run in ISK, and press calculate.</li>
                  <li>A breakdown of each pilot's payout will be generated!</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification">
          <div class="content">
            <p class="title">Tall tile</p>
            <p class="subtitle">With even more content</p>
            <div class="content">
              <!-- Content -->
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Payouts'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
