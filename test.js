import EventBus from "@vertx/eventbus-bridge-client.js";

const eb=new EventBus("http://localhost:8888/eventbus")

export default eb;