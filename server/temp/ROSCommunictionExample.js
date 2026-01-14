// Import roslib as ES module
import * as ROSLIB from 'roslib';

// 1. Connect to ROS Bridge
const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090' // We can adjust this to point to the ROS2 Bridge server on the Raspberry Pi with IP address
});

ros.on('connection', () => {
    console.log('Connected to ROS2 Bridge!');

    // Send a message after 1 second
    setTimeout(() => {
        console.log('!Sending message to ROS...');
        nodePublisher.publish({ data: 'Hello from Node.js World!' });
    }, 1000);

    setTimeout(() => {
        console.log('!Sending message to ROS...');
        for (let i = 1; i <= 5; i++) {
            nodePublisher.publish({ data: `Message ${i} from Node.js` });
        }

        let counter = 0;
        const counterInterval = setInterval(() => {
            counter++;
            nodePublisher.publish({ data: `Counter: ${counter}` });
            if (counter >= 50) {
                clearInterval(counterInterval);
            }
        }, 1000);
    }, 1000);
});

ros.on('error', (error) => {
    console.log('Error connecting to websocket server:', error);
});

// 2. Define Topic to Publish To (Talk to ROS)
const nodePublisher = new ROSLIB.Topic({
    ros: ros,
    name: '/node_to_ros',
    messageType: 'std_msgs/String'
});

// 3. Define Topic to Subscribe To (Listen to ROS)
const rosListener = new ROSLIB.Topic({
    ros: ros,
    name: '/ros_to_node',
    messageType: 'std_msgs/String'
});

rosListener.subscribe((message) => {
    console.log(`Received from ROS: "${message.data}"`);
});