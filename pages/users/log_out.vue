<template>
  
</template>

<script>
export default {
    async mounted(){
        let vm = this;
        var response = await vm.$axios.post('/users/log_out');
        if (response.data.success) {
            vm.$bus.$emit('log_out')

            vm.$router.push({ path:'/' })
        }
    },
}
</script>

<style>

</style>