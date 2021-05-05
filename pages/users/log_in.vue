<template>
    <div>
        <div class="container">

            <v-card
            shaped
            style=" background: white; color: black;"
            >
            <div class="container">
                <div class="text-center">
                    <span>
                        註冊
                    </span>
                </div>
                <hr>
                <div>
                    <div class="form-group">
                        <label for="InputEmail">Email address</label>
                        <input type="email" v-model="email" class="form-control" id="InputEmail" aria-describedby="emailHelp">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="InputPassword">Password</label>
                        <input type="password" v-model="password" class="form-control" id="InputPassword">
                    </div>
                    <v-btn
                        block
                        elevation="2"
                        large
                        x-large
                        color="primary"
                        @click="log_in()"
                    >
                    註冊
                    </v-btn>
                </div>
            </div>
            </v-card>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    async mounted(){
        let vm = this;
        var response = await vm.$axios.post('/users/is_user');
        if (parseInt(response.data.user_id) > 0) {
            vm.$router.push({ path:'/' })
        }
    },
    methods: {
        async log_in() {
            let vm = this;
            var response = await vm.$axios.post('/users/log_in', {
                email: vm.email,
                password: vm.password
            })
            if (response.data.success){
                vm.$router.push({ path:'/' })
            }
            else {
                alert('登入失敗');
            }
        }
    },
}
</script>

<style scoped>
</style>