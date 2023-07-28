import hoverAuth from './endpoints/hover.auth';
import hoverCharGen from './endpoints/hover.sessionGen';
import hoverLogin from './endpoints/hover.login';
import hoverAccountCreate from './endpoints/hover.accountCreate';
import hoverAuthDiscord from './endpoints/hover.authDiscord';
import hoverAuthDiscordCallback from './endpoints/hover.authDiscordCallback';
import hoverCheckId from './endpoints/hover.checkId';
import hoverCheckSessionOwner from './endpoints/hover.checkSessionOwner';
import hoverUsers from './endpoints/hover.users';
import hoverClientSessionData from './endpoints/hover.clientSessionData';
import hoverSessionModify from './endpoints/hover.sessionModify';

export let routes: object[] = [
    { path: '/auth', location: hoverAuth },
    { path: '/sessiongen', location: hoverCharGen },
    { path: '/login', location: hoverLogin },
    { path: '/accountcreate', location: hoverAccountCreate },
    { path: '/auth/discord/login', location: hoverAuthDiscord },
    { path: '/auth/discord', location: hoverAuthDiscordCallback },
    { path: '/auth/sessioncheck', location: hoverCheckId },
    { path: '/auth/sessionowner', location: hoverCheckSessionOwner },
    { path: '/socket/users', location: hoverUsers },
    { path: '/socket/sessiondata', location: hoverClientSessionData},
    { path: '/socket/sessionmodify', location: hoverSessionModify }
];


export let socketEvents: object[] = [
    { name: 'get-messages' },
    { name: 'join-room' },
    { name: 'send-message' },
    { name: 'get-users' }
];
