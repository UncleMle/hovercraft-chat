import hoverAuth from './endpoints/hover.auth';
import hoverCharGen from './endpoints/hover.sessionGen';
import hoverLogin from './endpoints/hover.login';
import hoverAccountCreate from './endpoints/hover.accountCreate';
import hoverAuthDiscord from './endpoints/hover.authDiscord';
import hoverAuthDiscordCallback from './endpoints/hover.authDiscordCallback';

let routes: object[] = [
    { path: '/auth', location: hoverAuth },
    { path: '/sessiongen', location: hoverCharGen },
    { path: '/login', location: hoverLogin },
    { path: '/accountcreate', location: hoverAccountCreate },
    { path: '/auth/discord/login', location: hoverAuthDiscord },
    { path: '/auth/discord', location: hoverAuthDiscordCallback }

]

export default routes;