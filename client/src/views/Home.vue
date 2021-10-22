<template>
  <div class="mx-auto" style="width: 70%;">
    <h2>All Movies</h2>

    <span v-if="loading">Loading...</span>

    <ul class="list-group" v-else>
      <div class="row justify-content-end pb-3">
        <div style="width:100px">
          <button
            type="button"
            class="btn btn-primary"
            @click="fetchMovies('sortedMovies')"
          >
            Sort
          </button>
        </div>
      </div>

      <li
        class="list-group-item"
        v-for="movie in filterdMovies"
        :key="movie.id"
      >
        <router-link :to="'/movie/' + movie.id">{{ movie.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      movies: [],
      loading: true,
    };
  },
  async mounted() {
    await this.fetchMovies("movies");
  },
  computed: {
    filterdMovies() {
      return this.movies.filter((movie) => {
        return (
          movie.title
            .toLowerCase()
            .match(this.$store.state.searchQuery.toLowerCase()) ||
          movie.overview
            .toLowerCase()
            .match(this.$store.state.searchQuery.toLowerCase())
        );
      });
    },
  },

  methods: {
    async fetchMovies(param) {
      //param to distingush between two diffrent api call
      this.loading = true;
      try {
        let res = await fetch("http://localhost:5000/" + param, {
          method: "get",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        var data = await res.json();
        this.movies = data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
