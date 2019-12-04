import JWTConsumer from "./jwt-consumer";

class Messenger extends JWTConsumer {
    async send() {

    }

    // POST the notification token to whom ever will be sending out notification
    async registerToken(token) {
        const url = this.resolveUrl("/notifications/tokens");
        const res = await fetch(url, {
            ...this.ajaxOption(),
            method: "POST",
            body: JSON.stringify({token})
        });

        return await res.json();
    }
}

export default new Messenger();