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
                    <div class="form-group">
                        <label for="InputPassword">Confirm Password</label>
                        <input type="password" v-model="confirmPassword" class="form-control" id="InputPassword">
                    </div>
                    <v-btn
                        block
                        elevation="2"
                        large
                        x-large
                        color="primary"
                        @click="sign_up()"
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
            confirmPassword: '',
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
        async sign_up() {
            let vm = this;
            console.log(
                vm.email, vm.password, vm.confirmPassword
            )
            if (vm.passwordCorrect) {
                var response = await vm.$axios.post('/users/sign_up', {
                    email: vm.email,
                    password: vm.password
                })
                if (response.data.success){
                    alert('註冊成功');
                }
                else {
                    alert('發生錯誤');
                }
            }
            else {
                alert('密碼不一致')
            }
        }
    },
    computed: {
        passwordCorrect(){
            let vm = this;
            if (vm.password === vm.confirmPassword) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style scoped>
</style>