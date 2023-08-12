<template>
    <div>
        <navBar name="Hovercraft.chat | Authentication" :buttons='[
            {"name": "Home", "ref": "showLogin", "value": "true"},
            {"name": "Terms of service", "ref": "termsofservice", "value": "true"},
            {"name": "Privacy Policy", "ref": "showLogin", "value": "true"},
            {"name": `Discord`, "ref": "discord", "value": "true"},
            {"name": "Donate", "ref": "showLogin", "value": "true"}
            ]'/>
        <div class="h-screen bg-gray-900">

                <div class="flex justify-center">
                    <div v-if="appView === 'home'" class=" p-10 rounded-xl border border-gray-600 text-white w-96" style="margin-top:4vw; background-color:rgba(0, 0, 0, 0.303);">
                        <form @submit.prevent>
                            <div class="flex justify-center">
                                <input @keydown.enter.exact.prevent="login()" placeholder="Enter your username..." class="p-3 rounded-lg" :class="error.length > 0 ? 'border border-red-500 text-red-500' : ''" style=" background-color:rgba(0, 0, 0, 0.272);" v-model="username">
                            </div>
                            <div class=" mt-6 flex justify-center">
                                <input @keydown.enter.exact.prevent="login()" placeholder="Enter your password..." class="p-3 rounded-lg" :class="error.length > 0 ? 'border border-red-500 text-red-500' : ''" type="password" style=" background-color:rgba(0, 0, 0, 0.272);" v-model="pass">
                            </div>
                            <div class="mt-4 text-sm ease-in-out duration-300 ml-6">
                                <a @click="appView = 'create'" class="ease-in-out duration-300 text-gray-400 hover:opacity-70">Create an account</a>
                            </div>
                            <div class=" flex justify-center">
                                <button @click="login()" class="ease-in-out duration-300 flex justify-center mt-6 p-3 text-white rounded-lg hover:opacity-70" :class="error.length > 0 ? 'border border-red-500 text-red-500' : ''" style="background-color:rgba(0, 0, 0, 0.272); width:30vw;">Login</button>
                            </div>
                            <div class=" flex justify-center mt-4">
                                <p v-if="error.length > 0" class=" text-red-500">{{error}}</p>
                            </div>
                        </form>
                    </div>

                    <div v-if="appView === 'create'" class=" p-10 rounded-xl border border-gray-600 text-white" style="margin-top:4vw; background-color:rgba(0, 0, 0, 0.303); width:30vw;">
                        <form @submit.prevent>
                            <div class="flex justify-center">
                                <input @keydown.enter.exact.prevent="createAccount()" placeholder="Enter a username..." class="p-3 rounded-lg w-96" style=" background-color:rgba(0, 0, 0, 0.272);" v-model="username">
                            </div>
                            <div class="mt-6 flex justify-center">
                                <input @keydown.enter.exact.prevent="createAccount()" placeholder="Enter your email address..." class="p-3 rounded-lg w-96" style=" background-color:rgba(0, 0, 0, 0.272);" v-model="email">
                            </div>
                            <div class="mt-6 flex justify-center pb-3">
                                <input @keydown.enter.exact.prevent="createAccount()" placeholder="Enter your password..." class="p-3 rounded-lg w-96" type="password" style=" background-color:rgba(0, 0, 0, 0.272);" v-model="pass">
                            </div>
                            <a @click="appView = 'home'" class="ease-in-out duration-300 text-gray-400 hover:opacity-70 text-sm ml-14">Back to login</a>
                            <div class="flex justify-center">
                                <button @click="createAccount()" class="ease-in-out duration-300 mt-10 p-3 text-white rounded-lg hover:opacity-70" style="background-color:rgba(0, 0, 0, 0.272); width:30vw;">Create Account</button>
                            </div>
                        </form>
                    </div>

                    <div v-if="appView === 'create'" class=" ml-3 p-10 rounded-xl border border-gray-600 text-white w-96" style="margin-top:4vw; background-color:rgba(0, 0, 0, 0.303);">
                        <div>
                            <h2 class=" text-3xl">Disclaimer...</h2>
                            <div>
                                <p class="text-gray-400 mt-5 text-sm">By creating an account on hovercraft.chat you are allowing us to store your credentials for the long term in our secure database systems.</p>
                                <p class="text-gray-400 mt-5 text-sm">You are also reminded that not having an account will not effect your usage of the hovercraft.chat service however having an account will allow for a more streamlined and
                                    user-friendly experience due to us having
                                    the ability to store data regarding your use of the service allowing for you being able to access that data and using it accordingly with your needs for the service.</p>

                            </div>
                        </div>
                    </div>

                </div>
        </div>
    </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import { _shared } from '@/constants';
import navBar from './navBar.vue';


export default {
    data() {
        return {
            appView: 'home',
            username: '',
            email: '',
            pass: '',
            error: ''
        }
    },
    components: {
        navBar
    },
    methods: {
        login() {
            this.error = ''
            if(this.username.length == 0 || this.pass.length == 0) {
                this.error = 'Enter valid credentials';
                toast.error('Enter valid credentials', {
                    autoClose: 2500,
                    theme: 'colored'
                })
                return;
            } else {
                fetch(`${_shared.serverUrl}/login`, {
                    method: 'GET',
                    headers: {
                        'x-auth-token': window.sessionStorage.getItem('Stoken'),
                        'x-auth-user': this.username,
                        'x-auth-pass': this.pass
                    }
                })
                .then(resp => resp.json())
                .then(res => {
                    if(res.status) {
                        console.log(res);
                    } else return this.error = res.error;
                })
            }
        },
        createAccount() {
            if(this.username.length == 0 || this.pass.length == 0 || this.email.length == 0) {
                toast.error('Enter valid credentials', {
                    autoClose: 2500,
                    theme: 'colored'
                })
                return;
            }
        }
    }
}
</script>