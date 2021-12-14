function scaledRepetitionPenalty(rep_p) {
    let oldRange = 1.0 - 8.0;
    let newRange = 1.0 - 1.525;
    return (((rep_p-1.0) * newRange) / oldRange) + 1.0;
}

class GeneratorAPI {
    constructor(baseUrl, username, password) {
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
    }

    post_urlencoded(url, data, token) {
        return fetch(this.baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            },
            body: Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
        });
    }

    post(url, data, token) {
        return fetch(this.baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });
    }

    get(url, token = null) {
        return fetch(this.baseUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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
        this.auth(username, password);
    }

    auth(username, password) {
        this.post_urlencoded('/api/v1/token', {
            'username': username,
            'password': password
        }, false).then(response => response.json()).then(data => {
            this.token = data.access_token;
            console.log('Token: ' + this.token);
        });
    }

    generate(args) {
        let model="lit-6b";
        let parameters = {
            "temp": args.genOptions.samplingTemperature,
            "top_p": args.genOptions.topPSampling,
            "top_k": args.genOptions.topKSampling,
            "tfs": args.genOptions.tailFreeSampling,
            "rep_p": scaledRepetitionPenalty(args.genOptions.repetitionPenalty),
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

        return this.post('/api/v1/generate', request, this.token).then(response => response.json()).then(data => {
            let truncated_response = data.completion.text.substring(args.work.length, data.completion.text.length);
            return truncated_response;
        });
   }
}

let generator = null;

export function newGenerator(baseUrl, username, password) {
    generator = new Sukima_API(baseUrl, username, password);
    return generator;
}

export function getGenerator() {
    return generator;
}

export { GeneratorAPI, Sukima_API };