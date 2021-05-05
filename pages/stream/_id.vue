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
        let response = await vm.$axios.get(`/stream/get_code_by_email?email=${vm.$route.params.id}`);
        if (response.data.success){
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                    url: `http://localhost:8000/live/${response.data.code}.flv`
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();
            }
        }
    }
}
</script>

<style>

</style>