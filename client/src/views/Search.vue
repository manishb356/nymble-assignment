<template>
  <div class="mx-auto" style="width: 70%;">
    <ul class="list-group">
      <li class="list-group-item" v-for="movie in movies" :key="movie.id">
        <router-link to="/movie/1">{{ movie.title }}</router-link>
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
      query: this.$route.params.query,
    };
  },
  async mounted() {
    await this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        let res = await fetch("http://localhost:5000/search/" + this.query, {
          method: "get",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        var data = await res.json();
        this.movies = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
