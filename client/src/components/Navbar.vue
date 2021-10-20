<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Nymble Movies</a>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <form class="d-flex" @submit.prevent="search">
          >
          <input
            v-model="term"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      term: "",
    };
  },
  methods: {
    search() {
      this.$router.push({ name: "Search", params: { query: this.term } });
    },
  },
};
</script>
