<template>
  <div class="mx-auto" style="width: 70%;">
    <h1>Title: {{ movie.title }}</h1>
    <h2>Rating: {{ movie.vote_average }} ({{ movie.vote_count }})</h2>
    <h6>Overview: {{ movie.overview }}</h6>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      movie: {},
    };
  },
  async mounted() {
    await this.fetchMovies();
    console.log(this.id);
  },
  methods: {
    async fetchMovies() {
      try {
        let res = await fetch("http://localhost:5000/movies/" + this.id, {
          method: "get",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        var data = await res.json();
        this.movie = data;
        console.log(this.movie);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
