<template>
<div>
    <navBar name="Hovercraft.chat | Discord" :buttons='[
        {"name": "Home", "ref": "showLogin", "value": "true"},
        {"name": "Terms of service", "ref": "termsofservice", "value": "true"},
        {"name": "Privacy Policy", "ref": "showLogin", "value": "true"},
        {"name": "Create an account", "ref": "showLogin", "value": "true"},
        {"name": "Donate", "ref": "showLogin", "value": "true"}
    ]'/>
    <div class=" h-screen bg-gray-900">

        <div class="flex justify-center">
            <p class=" text-3xl mt-5 text-white"></p>
        </div>

        <div class=" flex justify-center mt-11 pb-11" >
            <p class="text-white text-3xl">Join the official hovercraft app discord server today!</p>
        </div>
        <div class=" flex justify-center mt-11">
            <a href="" class="text-white p-3 rounded-lg w-56 border-b-2 border-gray-500 hover:bg-gray-500" style="background-color:#5865f2; text-align:center;">Join</a>
        </div>

        <div class=" mt-24">
            <div class="flex justify-center">
                <div style="display:inline-block;">
                    <div class="bg-gray-700 mt-5 p-3 text-white rounded-md p-5 mt-7" style="width:25vw; ">
                        <div style="text-align:center;" class=" pb-5  border-b border-gray-500">
                            <p class=" text-xl">Total Users {{dcMembers.length}}</p>
                        </div>
                        <div style="height:15vw; margin-top:1vw;">
                            <div v-for="user in dcMembers" :key="user.id">
                                <div class="mt-3 bg-gray-800 p-4 rounded-lg mr-2">
                                    <img :src="user.avatar_url" style="height:2vw; border-radius:50px;">
                                    <p style="float:left;">{{user.username}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        </div>


    </div>
</div>
</template>

<script>
import navBar from './navBar.vue';

export default {
    data() {
        return {
            dcMembers: '',
            dcChannels: '',
            dcInv: ''
        }
    },
    components: {
        navBar
    },
    async created() {
        fetch('', {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then(res => {
            if(!res) return console.log('Requires setup');
            this.dcMembers = res.members;
            this.dcChannels = res.channels;
        })
    }
}
</script>