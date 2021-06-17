<template>
  <div>
        <video 
        id="videoElement"
        width="100%" 
        controls
        ></video>

  </div>
</template>
<script>
export default {

    async mounted() {
        let vm = this;
        let pass = await prompt("請輸入密碼");
        let checkPass = await vm.$axios.post(`/stream/check_audience_code`, 
            {
                streamerEmail: vm.$route.params.id,
                code: pass
            }
        )
        if (checkPass.data.success) {
            let response = await vm.$axios.get(`/stream/get_code_by_email?email=${vm.$route.params.id}`);
            if (response.data.success){
                if (flvjs.isSupported()) {
                    var videoElement = document.getElementById('videoElement');
                    var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                        url: `http://108.160.135.60:8000/live/${response.data.code}.flv`
                    });
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load();
                    flvPlayer.play();
                }
            }
        }
        else{
            alert(checkPass.data.msg);
        }
    }
}
</script>

<style>

</style>