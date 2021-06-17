<template>
  <div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="createCode();">生成新串流碼</button>
        </div>
        <input type="text" readonly class="form-control" v-model="code">
      </div>
      <hr>
      <div>
        <div class="row">
          <div class="col-3">
            <div class="text-center">
              生成觀眾密碼
            </div>
          </div>
          <div class="col-3">
            <input type="text" v-model="audienceCode" class="form-control">
          </div>
          <div class="col-3">
            <input type="number" v-model="audienceCodeCounter" class="form-control">
          </div>
          <div class="col-3">
            <button class="btn btn-info" @click="createAudienceCode()">確認</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: '',
      audienceCode: '',
      audienceCodeCounter: 1
    }
  },
  methods: {
    async createCode() {
      let vm = this;
      let response = await vm.$axios.post('/stream/create_code');
      if (response.data.success){
        vm.code = response.data.code;
      }
    },
    async createAudienceCode() {
        let vm = this;
        let code = vm.audienceCode;
        let counter = vm.audienceCodeCounter;
        let response = await vm.$axios.post('/stream/create_audience_code', { code, counter });
        if (response.data.success){
          alert('新增金鑰成功');
          vm.audienceCode = '';
          vm.audienceCodeCounter = 1;
        }else{
          alert('新增金鑰失敗')
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