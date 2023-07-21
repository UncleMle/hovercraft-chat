import hoverAuth from './endpoints/hover.auth';
import hoverCharGen from './endpoints/hover.sessionGen';
import hoverUsers from './endpoints/hover.users';
import hoverLogin from './endpoints/hover.login';

let routes: object[] = [
    { path: '/auth', location: hoverAuth },
    { path: '/sessiongen', location: hoverCharGen },
    { path: '/users', location: hoverUsers },
    { path: '/login', location: hoverLogin }
]

export default routes;