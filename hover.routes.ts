import hoverAuth from './endpoints/hover.auth';
import hoverCharGen from './endpoints/hover.sessionGen';
import hoverLogin from './endpoints/hover.login';
import hoverAccountCreate from './endpoints/hover.accountCreate';

let routes: object[] = [
    { path: '/auth', location: hoverAuth },
    { path: '/sessiongen', location: hoverCharGen },
    { path: '/login', location: hoverLogin },
    { path: '/accountcreate', location: hoverAccountCreate }
]

export default routes;