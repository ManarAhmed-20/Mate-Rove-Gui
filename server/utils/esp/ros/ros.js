import WebSocket from "ws";

let rosSocket;

export function initROS() {
    rosSocket = new WebSocket("ws://localhost:9090"); 

    rosSocket.on("open", () => {
        console.log("[ROS] Connected to ROS Bridge");
    });

    rosSocket.on("message", (data) => {
        const msg = JSON.parse(data);
       
        console.log("[ROS] Message:", msg);
    });
}

export function publishToROS(topic, message) {
    rosSocket.send(JSON.stringify({
        op: "publish",
        topic,
        msg: message
    }));
}

export { rosSocket };
