<template>
    <div>
        <body class="h-screen  bg-gray-900" style="overflow-x:hidden; overflow-y:hidden;">
            <div>
                <div class="bg-gray-800 h-16 border-b-2 border-gray-600">
                    <div class="text-white pt-4 ml-3 text-lg">
                        <font v-if="roomId"><font v-if="isOwner" style="color:gold" title="You are the owner of this chat room."><i class="fa-solid fa-crown"></i></font> Room ID </font>
                        <font v-if="roomId" class=" text-gray-400">{{roomId}}</font>

                        <button v-if="isOwner" title="Delete Session." class="bg-gray-700 ml-6 p-1 rounded-lg text-red-400 ease-in-out duration-300 hover:text-red-700"><i class="fa-solid fa-trash w-10"></i></button>
                        <button @click="regenSession()" title="Regenerate New Session and delete old." class="bg-gray-700 ml-4 p-1 rounded-lg text-gray-400 ease-in-out duration-300  hover:text-green-600"><i class="fa-solid fa-arrows-rotate w-10"></i></button>
                        <button @click="returnToHome()" title="Return to homepage." class="bg-gray-700 ml-4 p-1 rounded-lg text-gray-400 ease-in-out duration-300  hover:bg-gray-700 hover:text-orange-500"><i class="fa-solid fa-house w-10"></i></button>

                        <b v-if="isOwner" class=" ml-3" style="overflow-x:hidden; overflow-y:hidden;">
                            <label class="relative inline-flex cursor-pointer" style="overflow-x:hidden; overflow-y:hidden;">
                                <input @click="setPrivateSession()" type="checkbox" value="" class="sr-only peer" v-model="isPrivate">
                                <div class="bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-red-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-green-400" style="width:60px;" ></div>
                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Private Session</span>
                            </label>
                        </b>
                        <font v-else></font>

                        <div style="float:right;" class=" mr-3">
                            <font class=" pr-3">Time Remaining <font class=" text-gray-400">{{Math.floor(sessionTime/60, 2)}} minutes</font></font>
                            <font class=" pl-3 border-l-2 border-gray-400">Hovercraft.chat</font>
                        </div>

                    </div>
                </div>
                <div v-if="!roomId && loadWidth != 0" class="bg-gray-400 h-2" :style="loader"></div>

                <div style="position:absolute;">
                    <div id="messagesArea" style="text-align:center; margin-left:20vw; width:72vw; height:36vw;" class=" mt-4 h-screen"  >
                        <div class="text-white" v-for="i in messages" :key="i">
                            <div v-if="i.user != 'System'" :style="{'float': i.user === 'You' ? 'right' : 'left'}" style="min-width:20vw; max-width:40vw;" class="p-3 rounded-lg mt-2">

                                <p :style="{'text-align': i.user === 'You' ? 'right' : 'left'}" class="text-gray-400 mb-2">{{ i.user }} - {{fUnix(i.timesent)}} {{ i.edited ? '(edited)' : ""}}</p>

                                <div :class="i.user === 'You' ? 'bg-green-700' : 'bg-gray-700'" class=" p-3 rounded-lg">
                                    <p v-if="i.user === 'You'" style="cursor:pointer">
                                        <i v-if="editingData.length > 0 && editingData[0].msgId == i.id-1" style="float:left; margin-left:.5vw;" class="fa-solid fa-pen"></i>
                                        <i @click="delMsg(i.id)" style="float:right; margin-left:.5vw;" class="fa-solid fa-trash text-red-400"></i>
                                        <i @click="editMsg(i.id)" style="float:right;" class="fa-solid fa-pen-to-square"></i>
                                    </p>
                                    <div>
                                        <form>
                                            <input v-if="editingData.length > 0 && editingData[0].msgId == i.id-1" @keydown.enter.exact.prevent="updateMsg(i.id, i.message)" class=" bg-green-700" :style="{'width': editingData.length > 0 && editingData[0].msgId == i.id-1 ? '20vw' : '0'}" style="text-align:center; overflow-wrap:break-word;" v-model="i.message">
                                            <p v-else :style="{'text-align': i.user === 'You' ? 'right' : 'left'}">{{i.message}}</p>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div v-else>
                                <p class=" text-gray-400 mt-7">Hoverchat System - {{i.message}}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="bg-gray-800 ">
                    <div id="messagingArea" class=" absolute bottom-0 left-0 mb-7">
                        <div style="background-color:rgba(77, 77, 77, 0.07); padding:.5vw; width:70vw; margin-left:25vw; text-align:center;" class="rounded-lg">
                            <form @submit.prevent>
                                <input @keydown.enter.exact.prevent="sendMsg(), currentMsg = ''" class="text-white bg-slate-800 p-2  border border-gray-600 rounded-lg" style="width:50vw;" placeholder="Enter a message..." v-model="currentMsg">
                                <button @click="sendMsg(), currentMsg = ''" title="Send a new message" class="bg-gray-800 p-3 ml-4 rounded-lg text-gray-400 hover:bg-sky-700"><i class="fa-solid fa-paper-plane w-10"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="bg-[#0c121c] h-screen" style="width:14vw;">
                        <div style="text-align:center; " class="text-white p-3 text-xl">
                            <h1>Other Users <font v-if="users.length > 0" class="text-gray-400">({{ users.length }})</font></h1>
                        </div>
                        <div style="max-height:30vw;">
                            <table v-if="users.length > 0">
                                <tr style="height:2vw; color:grey;" v-for="x in users" :key="x">
                                    <td class=" flex justify-center h-16">
                                        <font class="mt-4">{{x.username}}</font>
                                    </td>
                                </tr>
                            </table>
                            <div v-else style="text-align:center;"><p class="text-gray-400 text-lg">Nothing to see.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>

        </body>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../assets/api';
import { Round } from '../assets/api';
import { io } from 'socket.io-client';
import { _shared } from '@/constants';
import { toast } from 'vue3-toastify';


let loadWidth = 0;
let loadInter;

export default {
    data() {
        return {
            users: [],
            currentMsg: '',
            editingData: [],
            sessionTime: 1800,
            ownerId: '',
            socketCon: null,
            roomId: null,
            isOwner: null,
            isPrivate: false,
            messages: [
                {"id": 1, "user": "System", "message": "Welcome to hovercraft.chat", "timesent": api.getUnix()},
            ],
            loader: {
                "transition": "2s",
                "width": "0vw"
            }
        }
    },
    async created() {

        if(!window.sessionStorage.getItem('SsessionId') || !window.sessionStorage.getItem('Stoken')) return this.$router.push('home');

        let con = false;

        const id = toast.loading(
            'Loading...',
            {
                theme: "dark",
                position: toast.POSITION.BOTTOM_LEFT,
                toastClassName: ['toasting']
            },
        );

        this.startLoad('setItem', 'roomId', window.sessionStorage.getItem('SsessionId'));

        fetch(`${_shared.serverUrl}/auth`, {
            method: 'GET',
            headers: {
                'x-auth-token': window.sessionStorage.getItem('Stoken')
            }
        })
        .then(resp => resp.json())
        .then(res => {
            if(!res.status) return this.$router.push('home');
            else con = true;
        })
        .then(() => {
            if(!con) return;

            const socket = io(_shared.socketUrl);
            this.socketCon = socket;

            socket.emit('get-users', ({ roomId: window.sessionStorage.getItem('SsessionId'), token: window.sessionStorage.getItem('Stoken') }));
            socket.emit('get-messages', ({ roomId: window.sessionStorage.getItem('SsessionId'), token: window.sessionStorage.getItem('Stoken') }));

            socket.on('connect', () => {
                this.systemMsg(`You connected with ID: ${socket.id} to Room ${window.sessionStorage.getItem('SsessionId')}`);
            });

            socket.on('disconnect', () => {
                socket.emit('disconnect-server')
            })

            socket.on('recieve-message', (message) => {
                this.messages.push({"id": this.messages.length-1, "user": "Anonymous User", "message": message, "timesent": Math.round(Date.now() / 1000)},)
            });

            socket.emit('join-room', ({ roomId: window.sessionStorage.getItem('SsessionId'), token: window.sessionStorage.getItem('Stoken') }));
            socket.emit('get-users', ({ roomId: window.sessionStorage.getItem('SsessionId'), token: window.sessionStorage.getItem('Stoken') }));

            socket.on('add-user', async(usersArray) => {
                this.users = [];
                console.log(usersArray);
                usersArray.forEach((user) => {
                    this.users.push({ idx: this.users.length, username: `User #${user.id}${this.users.length}`, sqlid: user.id  });
                })

            })

            fetch(`${_shared.serverUrl}/socket/sessiondata`, {
                method: 'GET',
                headers: {
                    'x-auth-token': window.sessionStorage.getItem('Stoken'),
                    'x-auth-roomid': window.sessionStorage.getItem('SsessionId')
                }
            })
            .then(resp => resp.json())
            .then(res => {
                if(res.status) {
                    this.isPrivate = res.private;
                    this.ownerId = res.ownerSQLID;
                }
            })

        })
        .then(() => {
            fetch(`${_shared.serverUrl}/auth/sessionowner`, {
                method: 'GET',
                headers: {
                    'x-auth-token': window.sessionStorage.getItem('Stoken'),
                    'x-auth-roomid': window.sessionStorage.getItem('SsessionId')
                }
            })
            .then(resp => resp.json())
            .then(res => {
                if(res.status) {
                    this.isOwner = true;
                    return;
                } else return this.isOwner = false;
            })
        })
        .then(() => {

            setInterval(() => {
                this.socketCon? this.socketCon.emit('get-users', ({ roomId: window.sessionStorage.getItem('SsessionId'), token: window.sessionStorage.getItem('Stoken') })):(null);
            }, 1000);

            setTimeout(() => {
                toast.update(id, {
                    render: `Started session ${window.sessionStorage.getItem('SsessionId')}`,
                    autoClose: 3000,
                    closeOnClick: true,
                    closeButton: true,
                    type: 'success',
                    isLoading: false,
                    theme: "dark"
                });
            }, 2000);

        })

    },
    methods: {
        fUnix(unix) {
            const date = new Date(unix * 1000)
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const seconds = date.getSeconds()
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        },
        returnToHome() {
            this.$router.push('home');

        },
        regenSession() {
            if(!window.sessionStorage.getItem('Stoken')) return api.getToken(), this.$router.push('home');
            this.messages.length = 1;
            this.isOwner = null;
            this.roomId = null;

            fetch(`${_shared.serverUrl}/sessiongen`, {
                method: 'GET',
                headers: {
                    'x-auth-token': window.sessionStorage.getItem('Stoken')
                }
            })
            .then(resp => resp.json())
            .then(res => {
                if(res.status && res.data) {
                    window.sessionStorage.setItem('SsessionId', res.data[0].sessionId);
                    this.$router.push('chat');
                    this.startLoad('setItem', 'roomId', window.sessionStorage.getItem('SsessionId'));
                    this.socketCon.emit('join-room', ({ roomId: window.sessionStorage.getItem('SsessionId'), token: window.sessionStorage.getItem('Stoken') }));
                    this.isOwner = true;
                    this.systemMsg(`You connected with ID: ${this.socketCon.id} to Room ${window.sessionStorage.getItem('SsessionId')}`);
                } else return ( api.getToken(), this.$router.push('home') );
            })
        },
        rNum(num, value) {
            return Round(num, value);
        },
        sendMsg() {
            if(this.currentMsg.length > 0) {
                this.messages.push({ id: this.messages.length+1, user: "You", message: this.currentMsg, timesent: Math.round(Date.now() / 1000) });

                let sendObj = {
                    message: this.currentMsg,
                    applyData: 'None',
                    token: window.sessionStorage.getItem('Stoken')
                }

                this.socketCon != null? this.socketCon.emit('send-message',  JSON.stringify(sendObj)): (null);
            }
        },
        delMsg(index) {
            var search = this.findMsg(index);
            if(search) {
                this.messages.splice(search, 1);
            }
        },
        editMsg(id) {
            this.editingData = [];
            var index = this.findMsg(id);
            if(index) {
                var editObj = { msgId: index, editStart: Math.round(Date.now() / 1000), currentContent: this.messages[index].message, edited: true };
                this.editingData.push(editObj);
            }
        },
        findMsg(id) {
            var idx = null;
            this.messages.find(function(item, i) {
                if(item.id == id) {
                    idx = i;
                }
            })
            return idx != null ? idx : false;
        },
        updateMsg(msgId, message) {
            var search = this.findMsg(msgId);
            if(search) {
                this.editingData = [];
                this.messages[search].message = message;
                this.messages[search].edited = true;
            }
        },
        systemMsg(message) {
            this.messages.push({ id: this.messages.length+1, user: "System", message: message, timesent: Math.round(Date.now() / 1000) })
        },
        startLoad(callback, ...args) {
            if(loadInter != null) clearInterval(loadInter);
            setInterval(loadInter);

            loadInter = setInterval(() => {

                let loaderValues = [2, 5, 4, 6, 9];
                let loaderLogic = Math.floor(Math.random() * loaderValues.length);

                loadWidth > 90?(
                    loadWidth = 0,
                    this.loader = { "width": "0vw" },
                    this[callback](args),
                    clearInterval(loadInter)
                ):(
                    this.loader = {
                        "transition": "1s",
                        "width": (loadWidth+=loaderValues[loaderLogic]) +"vw"
                    }
                );

            }, 20);

        },
        setItem(propName) {
            var functionName = propName[0];
            var args = propName[1];
            this[functionName] = " "+args;
        },
        setPrivateSession() {
            this.isPrivate = !this.isPrivate;
            fetch(`${_shared.serverUrl}/socket/sessionmodify`, {
                method: 'GET',
                headers: {
                    'x-auth-token': window.sessionStorage.getItem('Stoken'),
                    'x-auth-roomid': window.sessionStorage.getItem('SsessionId'),
                    'x-auth-modifier': 'private',
                    'x-auth-modifier-value': this.isPrivate
                }
            })
            .then(resp => resp.json())
            .then(res => {
                console.log(res);
            })
        }
    },
    components: {
    },
    computed: {
        ...mapGetters({ sessionData: 'getSessionData' }),
        ...mapGetters({ roomStatus: 'getRoomStatus' })
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

td {
    text-align: center;
}
table, th, td {
    border-collapse: separate;
    border-spacing: 0 9px;
    background-color: rgba(0, 0, 0, 0.226);
    border-radius: 5px;
}

.point {
    cursor: pointer;
}
</style>

