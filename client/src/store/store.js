import { createStore } from "vuex";

const store = createStore({
    state: {
        session: {
            sessionData: [],
            roomJoin: true
        }
    },
    mutations: {
        setRoom(state, tog) {
            state.session.roomJoin = tog;
        },
        flushSessionData(state) {
            state.session.sessionData = [];
        }
    },
    getters: {
        getSessionData: (state) => {
            return state.session.sessionData;
        },
        getRoomStatus: (state) => {
            return state.session.roomJoin;
        }
    }
})

export default store;