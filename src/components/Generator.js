//import { argon2 } from 'argon2';
//var blake2 = require('blake2');

class GeneratorAPI {
    constructor(baseUrl, username, password) {
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
    }

    setToken(token) {
        this.token = token;
    }

    post_urlencoded(url, data, authRequest = true) {
        if (authRequest === true) {
            return fetch(this.baseUrl + url, {
                method: 'POST',
                headers: {
                    'Allowed-Origins': '*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + this.token
                },
                body: Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
            });
        } else {
            return fetch(this.baseUrl + url, {
                method: 'POST',
                headers: {
                    'Allowed-Origins': '*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
            });
        }
    }

    post(url, data, authRequest = true) {
        if (authRequest === true) {
            return fetch(this.baseUrl + url, {
                method: 'POST',
                headers: {
                    'Allowed-Origins': '*',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Headers",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify(data)
            });
        } else {
            return fetch(this.baseUrl + url, {
                method: 'POST',
                headers: {
                    'Allowed-Origins': '*',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Headers",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        }
    }

    get(url) {
        return fetch(this.baseUrl + url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Headers",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }
        });
    }

    auth(username, password) {
        console.error('Not implemented');
        return null;
    }

    generate(args) {
        console.error('Not implemented');
        return null;
    }
}

class Sukima_API extends GeneratorAPI {
    constructor(baseUrl, username, password) {
        super(baseUrl, username, password);
        this.baseUrl = baseUrl;
        this.token = this.auth(username, password);
    }

    auth(username, password) {
        this.post_urlencoded('/api/v1/token', {
            'username': username,
            'password': password
        }, false).then(response => response.json()).then(data => {
            this.token = data.access_token;
        });
    }

    generate(args) {
        let model="lit-6b";
        let parameters = {
            "temp": args.genOptions.samplingTemperature,
            "top_p": args.genOptions.topPSampling,
            "top_k": args.genOptions.topKSampling,
            "tfs": args.genOptions.tailFreeSampling,
            "rep_p": args.genOptions.repetitionPenalty,
            "rep_p_range": args.genOptions.repetitionPenaltyRange,
            "rep_p_slope": args.genOptions.repetitionPenaltySlope,
        };
        let gen_args = {
            "max_length": args.genOptions.responseLength,
        };

        let request = {
            "model": model,
            "prompt": args.work,
            "sample_args": parameters,
            "gen_args": gen_args
        };

        console.log(args);
        console.log(request);

        return this.post('/api/v1/generate', request, true).then(response => response.json()).then(data => {
            return data.completion.text;
        });
    
   }

}
/*
class NovelAI_API extends GeneratorAPI {
    constructor(baseUrl, username, password) {
        super(baseUrl, username, password);
        this.baseUrl = baseUrl;
        this.token = this.auth(username, password);
    }

    argon_hash(email, password, size, domain) {
        let salt = password.substring(0, 6) + email + domain;
        var blake = blake(16);
        blake.update(salt);
        salt = blake.digest();

        var raw = argon2.hash(password, salt, {
            timeCost: 2,
            memoryCost: 2000000 / 1024,
            parallelism: 1,
            hashLength: size,
            type: argon2.argon2id
        }).then(function (hash) {
            return hash;
        });

        return raw.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }

    auth(username, password) {
        let access_key = this.argon_hash(username, password, 64, 'novelai_data_access_key');
        let response = this.post('/auth', {
            'key': access_key
        })
        return response.then(response => response.json()).then(data => {
            return data.token;
        });
    }

    generate(args) {
        let model = "6B-v4";
        let parameters = {
            "use_string": true,
            "temperature": args.samplingTemperature,
            "min_length": 1,
            "max_length": args.responseLength,
            "do_sample": true,
            "top_k": args.topKSampling,
            "top_p": args.topPSampling,
            "repetition_penalty": args.repetitionPenalty,
            "repetition_penalty_range": args.repetitionPenaltyRange,
            "repetition_penalty_slope": args.repetitionPenaltySlope,
            "tail_free_sampling": args.tailFreeSampling,
        };
        let request = {
            "input": args.work,
            "model": model,
            "parameters": parameters
        };

        return this.post('/generate', request, true).then(response => {
            if (response.status === 200) {
                return response.json().then(data => data.output);
            } else {
                return null;
            }
        });
    }
}
*/
export { GeneratorAPI, Sukima_API };