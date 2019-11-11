import JWTConsumer from "./jwt-consumer";

class Heartbeat extends JWTConsumer {
    async ping() {
        const res = await fetch(this.resolveUrl("/ping"), {
            ...this.ajaxOption()
        });
        return res.json();
    }
}

export default new Heartbeat();