<template>
  <div>
    asijdhsaidhiasdihu
    <button @click="submit">submit</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    submit() {
      /**$.post('http://localhost:8000/testNe', {id: '123'}, function(data){
        console.log(data);
      }) */
      axios
        .post("http://localhost:8000/testNe", { id: "123" },{prams: { id: "123" }})
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
</style>