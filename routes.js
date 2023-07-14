exports.routes = [
    { path: '/home', location: './endpoints/landing', func: 'init' },
    { path: '/chatgen', location: './endpoints/chatgen', func: 'sessionGen' },
    { path: '/authtoken', location: './endpoints/authToken', func: 'checkToken' }
]

