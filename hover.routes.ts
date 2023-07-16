import hoverAuth from './endpoints/hover.auth';
import hoverCharGen from './endpoints/hover.chargen';

let routes: object[] = [
    { path: '/auth', location: hoverAuth },
    { path: '/chargen', location: hoverCharGen }
]

export default routes;