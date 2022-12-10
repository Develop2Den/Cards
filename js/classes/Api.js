const baseUrls = {
    baseUrl: 'https://ajax.test-danit.com/api/',
    baseUrlLogin: 'login',
    baseUrlCards: 'v2/cards/',
}


class API {
    constructor({baseUrl, baseUrlLogin, baseUrlCards}) {
        this.baseUrl = baseUrl;
        this.baseUrlLogin = baseUrlLogin;
        this.baseUrlCards = baseUrlCards;
        this.token = null;
        this.id = null;
        this.getTokenLocalStorage();
    }

    async postLogin({email, password}) {
        const response = await fetch(`${this.baseUrl}${this.baseUrlCards}${this.baseUrlLogin}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        if (response.ok) {
            this.token = await response.text()
            localStorage.setItem("token", this.token)
            return response;
        }
    }

    setToken(token) {
        this.token = token;
    }


    getTokenLocalStorage() {
        const token = localStorage.getItem("token");
        if (token) {
            this.token = token;
        }
        return token
    }

    async getUrlRequest() {
        // console.log(this.token);
        if (!this.token) {
            throw new Error('you are not authorized')
        } else {
            const response = await fetch(`${this.baseUrl}${this.baseUrlCards}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            })
            return await response.json();
        }
    }

    async getRequestAll() {
        if(!this.token) return;
        const response = await fetch(`${this.baseUrl}${this.baseUrlCards}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
        return await response.json();
    }

    async getRequestOne(id) {
        const response = await fetch(`${this.baseUrl}${this.baseUrlCards}${id}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
        return await response.json()

    }

    async postRequest(appointment) {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(appointment)
        })
        return await response.json()
    }

    async putRequest(cardId, appointmentChange) {

        const response = await fetch(this.baseUrl+this.baseUrlCards+cardId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(appointmentChange)
        })
        return await response.json();
    }

    async deleteRequest(cardId) {
        const response = await fetch(this.baseUrl+this.baseUrlCards+cardId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
        })
        return response.status;
    }
}

const api = new API(baseUrls);

export default api;








