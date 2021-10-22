<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Nymble Movies</a>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <input
          v-model="searchQuery"
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          @change="changeSearchQuery"
          @keyup="changeSearchQuery"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    changeSearchQuery() {
      this.$store.commit("setSearchQuery", this.searchQuery);
    },
  },
};
</script>
