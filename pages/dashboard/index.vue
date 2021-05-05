<template>
  <div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="createCode();">生成新串流碼</button>
        </div>
        <input type="text" readonly class="form-control" v-model="code">
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ''
    }
  },
  methods: {
    async createCode() {
      let vm = this;
      let response = await vm.$axios.post('/stream/create_code');
      if (response.data.success){
        vm.code = response.data.code;
      }
    }
  },
  async mounted(){
    // Get user code
    let vm = this;
    let response = await vm.$axios.get('/stream/get_code');
    console.log(response)
    vm.code = response.data.code
  }
}
</script>

<style>

</style>