import hoverAuth from './endpoints/hover.auth';
import hoverCharGen from './endpoints/hover.sessionGen';
import hoverUsers from './endpoints/hover.users';

let routes: object[] = [
    { path: '/auth', location: hoverAuth },
    { path: '/sessiongen', location: hoverCharGen },
    { path: '/users', location: hoverUsers }

]

export default routes;