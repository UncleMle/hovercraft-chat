import { createRouter, createWebHistory } from "vue-router";
import landingPage from '../components/landingPage.vue';
import redirectHome from '../components/redirectHome.vue';
import chatRoom from '../components/chatRoom.vue';
import termsOfService from '../components/termsOfService.vue';
import discordPage from '../components/discordPage.vue';
import loginPage from '../components/loginPage.vue';

const routes = [
    {
        path: '/home',
        component: landingPage
    },
    {
        path: '/chat',
        component: chatRoom
    },
    {
        path: '/discord',
        component: discordPage
    },
    {
        path: '/termsofservice',
        component: termsOfService
    },
    {
        path: '/login',
        component: loginPage
    },
    {
        path: "/:catchAll(.*)",
        component: redirectHome
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;