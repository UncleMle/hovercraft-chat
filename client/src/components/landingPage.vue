<template>
<div>
    <div class="h-screen  bg-gray-900">
        <navBar name="Hovercraft.chat" :buttons='[
            {"name": "Home", "ref": "showLogin", "value": "true"},
            {"name": "Terms of service", "ref": "termsofservice", "value": "true"},
            {"name": "Privacy Policy", "ref": "showLogin", "value": "true"},
            {"name": "Login", "ref": "login", "value": "true"},
            {"name": `Discord`, "ref": "discord", "value": "true"},
            {"name": "Donate", "ref": "showLogin", "value": "true"}
            ]'/>
        <div class="flex justify-center">
            <div class=" p-10 rounded-xl border border-gray-600 text-white w-96" style="margin-top:4vw; background-color:rgba(0, 0, 0, 0.303);">
                <form @submit.prevent>
                    <div class="flex justify-center">
                        <input @keydown.enter.exact.prevent="joinRoom()" placeholder="Enter a room ID" class="p-3 rounded-lg" :class="error!=null ? 'border border-red-500 text-red-500' : ''" style=" background-color:rgba(0, 0, 0, 0.272);" v-model="joinSession">
                    </div>
                    <div class=" mt-6 flex justify-center">
                        <button @click="joinRoom()" class="ease-in-out duration-300 flex justify-center mt-6 p-3 text-white rounded-lg hover:opacity-70" :class="error!=null ? 'border border-red-500 text-red-500' : ''" style="background-color:rgba(0, 0, 0, 0.272); width:30vw;">Join Room</button>
                    </div>
                    <div class=" flex justify-center">
                        <button @click="generateRoom()" class="ease-in-out duration-300 flex justify-center mt-6 p-3 text-white rounded-lg hover:opacity-70" :class="error!=null ? 'border border-red-500 text-red-500' : ''" style="background-color:rgba(0, 0, 0, 0.272); width:30vw;">Generate new room</button>
                    </div>
                    <div class=" flex justify-center mt-4">
                        <p class="text-red">{{error}}</p>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import navBar from './navBar.vue';
import apiMethods from '../assets/api';
import { _shared } from '@/constants';
import { toast } from 'vue3-toastify';

export default {
    data() {
        return {
            subView: "none",
            queried: false,
            joinSession: '',
            error: null
        }
    },
    async created() {
        fetch(`${_shared.serverUrl}/auth`, {
            method: 'GET',
        })
        .then(resp => resp.json())
        .then(res => {
            res.status? window.sessionStorage.setItem('Stoken', res.token): (null);
        })

    },
    components: {
        navBar,
    },
    computed: {
        ...mapGetters({ session: 'getSessionData' })
    },
    methods: {
        generateRoom() {
            if(!window.sessionStorage.getItem('Stoken')) return;

            fetch(`${_shared.serverUrl}/sessiongen`, {
                method: 'GET',
                headers: {
                    'x-auth-token': window.sessionStorage.getItem('Stoken')
                }
            })
            .then(resp => resp.json())
            .then(res => {
                if(res.status && res.data) {
                    window.sessionStorage.setItem('SsessionId', res.data[0].sessionId)
                    this.$router.push('chat');
                } else return ( apiMethods.getToken(), this.$router.push('home') );
            })
        },
        joinRoom() {
            if(this.joinSession == '' || !this.joinSession) return toast.error('Enter a valid room ID', { autoClose: 2500, theme: "colored" });
            this.error = null;
            fetch(`${_shared.serverUrl}/auth/sessioncheck`, {
                method: 'GET',
                headers: {
                    'x-auth-token': window.sessionStorage.getItem('Stoken'),
                    'x-auth-roomid': this.joinSession
                }
            })
            .then(resp => resp.json())
            .then(res => {
                if(res.status) {
                    window.sessionStorage.setItem('SsessionId', this.joinSession);
                    this.$router.push('chat');
                    global.storeSys.commit('setRoom', true);
                    return;
                } else {
                    this.error = `${res.error}`;
                    console.log(this.error  );
                }
            })
        }
    }
}

</script>

<style scoped>
* {
    transition-duration: 0.4s;
}

button:hover {
    opacity: .7;
}

#notif {
    color: yellow !important;
    background-color: pink !important;
}


</style>