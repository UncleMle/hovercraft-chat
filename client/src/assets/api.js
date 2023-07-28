import { _shared } from '@/constants';

class apiMethods {

    static resetRoute() {
        window.sessionStorage.setItem('Stoken', null);
    }

    static async formatUnix(unix) {
        const date = new Date(unix * 1000)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    static async getUnix() {
        return Math.round(Date.now() / 1000);
    }

    static async Round(n, k) {
        var factor = Math.pow(10, k + 1);
        n = Math.round(Math.round(n * factor) / 10);
        return n / (factor / 10);
    }

    static async getToken(router) {
        router? ( router.push('home') ):(null);

        if(window.sessionStorage.getItem('Stoken') != null) {
            let validToken = false;

            fetch(`${_shared.serverUrl}/auth`, {
                method: 'GET',
                headers: {
                    'x-auth-token': window.sessionStorage.getItem('Stoken')
                }
            })
            .then(resp => resp.json())
            .then(res => {
                if(res.status && res.data) {
                    validToken = true;
                }
            })
            .then(() => {
                if(!validToken) return;
                try {
                    fetch(`${_shared.serverUrl}/auth`, {
                        method: 'GET'
                    })
                    .then(resp => resp.json())
                    .then(res => {
                        if(res.status && res.token) {
                            window.sessionStorage.setItem('Stoken', res.token);
                        }
                    })
                } catch(e) { apiMethods.log(e) }
            })
        } else {
            fetch(`${_shared.serverUrl}/auth`, {
                method: 'GET',
            })
            .then(resp => resp.json())
            .then(res => {
                console.log(res);
                res.status? window.sessionStorage.setItem('Stoken', res.token):(null);
            })
        }
    }

    static async getTokenData(token) {
        fetch(`${_shared.serverUrl}/auth`, {
            method: 'GET',
            headers: {
                'x-auth-token': token
            }
        })
        .then(resp => resp.json())
        .then(res => {
            return res.status? res.data: false;
        })
    }

    static async charGen(len) {
        const tokenChars = "1234567890QWERTYUIOPLKJHGFDDSAQWEZXCVBNM";
        var res = '';
        for(var i = 0; i < len; i++) {
            res += tokenChars.charAt(Math.floor(Math.random() * tokenChars.length));
        }
        return res;
    }

    static fetchHome(router) {
        window.sessionStorage.setItem('Stoken', null);
        router.push('home');
    }

}

export default apiMethods;

