<template>
  <div class="mx-auto" style="width: 70%;">
    <span v-if="loading">Loading...</span>

    <div v-else>
      <div class="card mx-auto" style="width: 40vw;">
        <img class="card-img-top" :src="movie.image_url" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">
            {{ movie.overview }}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            {{ movie.vote_average }} ({{ movie.vote_count }})
          </li>
        </ul>
        <div class="card-body">
          <form class="d-flex" @submit.prevent="rateMovie">
            <input
              v-model="rating"
              class="form-control me-2"
              type="number"
              placeholder="Rating"
              required
            />
            <button class="btn btn-outline-success" type="submit">
              Submit
            </button>
          </form>
          <span v-if="ratingMessage">{{ ratingMessage }}</span>
        </div>
      </div>
    </div>
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
      loading: true,
      rating: null,
      error: null,
      ratingMessage: null,
    };
  },
  async mounted() {
    await this.fetchMovie();
  },
  methods: {
    async fetchMovie() {
      this.loading = true;
      try {
        let res = await fetch("http://localhost:5000/movies/" + this.id, {
          method: "get",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        var data = await res.json();
        this.movie = data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async rateMovie() {
      this.loading = true;
      this.ratingMessage = null;
      try {
        let res = await fetch(
          "http://localhost:5000/movies/" + this.id + "/ratings",
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ ratingVal: this.rating }),
          }
        );
        await this.fetchMovie();

        if (!res.ok) {
          let errData = await res.json();
          let err = new Error(errData.message);
          err.response = res;
          err.status = res.status;
          throw err;
        }
        this.ratingMessage = "Rated Successfully";
      } catch (error) {
        this.ratingMessage = error.message;
        console.log(error);
      }
    },
  },
};
</script>
