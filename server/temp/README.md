# ROS Bridge Communication Guide

This guide explains how to use ROS Bridge with roslib to send control commands from the Node.js server to the ROV hardware via ROS topics.

## Overview

The ROV communication system uses ROS Bridge WebSocket server to enable bidirectional communication between the Node.js backend and the ROS system running on the Raspberry Pi.

## Connection Setup

```javascript
import * as ROSLIB from "roslib";

const ros = new ROSLIB.Ros({
    url: "ws://RASPBERRY_PI_IP:9090", // Replace with actual Raspberry Pi IP
});

ros.on("connection", () => {
    console.log("Connected to ROS Bridge!");
});

ros.on("error", (error) => {
    console.log("Error connecting to ROS Bridge:", error);
});

ros.on("close", () => {
    console.log("Connection to ROS Bridge closed");
});
```

## Sending Control Commands

### 1. Define a Publisher Topic

Create a topic to publish control commands to ROS:

```javascript
const controlPublisher = new ROSLIB.Topic({
    ros: ros,
    name: "/rov/control_commands",
    messageType: "std_msgs/String", // Or custom message type
});
```

### 2. Send Control Commands

#### Current Command Format

The system uses a structured command format that includes ESC (thrusters), servo (grippers), and lights:

```javascript
// Command structure sent to hardware
const command = {
    esc: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5], // 6 thrusters, values from -1.0 to 1.0
    servo: [0, 0, 0, 0], // 4 servo channels, values -1, 0, or 1
    lights: [0, 0], // 2 light channels, values 0 or 1
};
```

#### Example 1: Sending Complete ROV Command

```javascript
const rovCommandPublisher = new ROSLIB.Topic({
    ros: ros,
    name: "/rov/command",
    messageType: "std_msgs/String",
});

// Receive controller data from client via Socket.IO
socket.on("controller:data", (controllerReadings) => {
    // controllerReadings format:
    // {
    //   axes: { L: [x, y], R: [x, y] },
    //   buttons: { A, B, X, Y, L1, L2, R1, R2, up, down, left, right }
    // }

    // Process controller input and generate command
    const command = mapControllerToCommand(
        controllerReadings,
        rovConfiguration
    );

    // Send to ROS
    rovCommandPublisher.publish({
        data: JSON.stringify(command),
    });
});
```

#### Example 2: Sending Thruster Test Command

```javascript
// For testing individual thrusters
socket.on("config:thruster-test", ({thrusterIndex, value}) => {
    const escCommand = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]; // Neutral position

    const testCommand = {
        esc: escCommand,
        servo: [0, 0, 0, 0],
        lights: [0, 0],
    };

    rovCommandPublisher.publish({
        data: JSON.stringify(testCommand),
    });
});
```

#### Example 3: Sending Gripper Test Command

```javascript
// For testing grippers
socket.on("config:gripper-test", ({gripperIndex, value}) => {
    const servoCommand = [0, 0, 0, 0];

    if (gripperIndex === 1) {
        servoCommand[0] = value; // Front gripper (2 servos)
        servoCommand[1] = value;
    } else if (gripperIndex === 2) {
        servoCommand[2] = value; // Back gripper (2 servos)
        servoCommand[3] = value;
    }

    const testCommand = {
        esc: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        servo: servoCommand,
        lights: [0, 0],
    };

    rovCommandPublisher.publish({
        data: JSON.stringify(testCommand),
    });
});
```

## Receiving Sensor Data

### Subscribe to ROS Topics

```javascript
// Subscribe to sensor data from ROS
const sensorListener = new ROSLIB.Topic({
    ros: ros,
    name: "/rov/sensor_data",
    messageType: "std_msgs/String",
});

sensorListener.subscribe((message) => {
    const sensorData = JSON.parse(message.data);

    // Expected sensor data format:
    // {
    //   depth: number,        // Depth in meters
    //   temperature: number,  // Temperature in Celsius
    //   pitch: number,        // Pitch angle in degrees
    //   roll: number,         // Roll angle in degrees
    //   yaw: number          // Yaw angle in degrees
    // }

    // Forward sensor data to connected clients via Socket.IO
    io.emit("sensor:data", sensorData);
});
```

## ROV Configuration

The system maintains a configuration object that defines the ROV's hardware setup:

```javascript
const rovConfiguration = {
    thrusters: [
        {location: "top", enabled: true, reversed: false},
        {location: "frontLeft", enabled: true, reversed: false},
        {location: "backLeft", enabled: true, reversed: false},
        {location: "frontRight", enabled: true, reversed: false},
        {location: "backRight", enabled: true, reversed: false},
    ],
    grippers: [
        {location: "front", enabled: true},
        {location: "back", enabled: true},
    ],
    sensors: [
        {type: "depth", enabled: true},
        {type: "temperature", enabled: true},
        {type: "acceleration", enabled: true},
        {type: "rotation", enabled: true},
    ],
    sensitivity: {
        joystick: "High", // "High" | "Normal" | "Low"
        yaw: "High", // "High" | "Normal" | "Low"
    },
};

// Handle configuration updates from client
socket.on("config:update", (newConfig) => {
    rovConfiguration = {...rovConfiguration, ...newConfig};

    // Optionally publish updated config to ROS
    const configPublisher = new ROSLIB.Topic({
        ros: ros,
        name: "/rov/config",
        messageType: "std_msgs/String",
    });

    configPublisher.publish({
        data: JSON.stringify(rovConfiguration),
    });

    socket.emit("config:updated", {
        success: true,
        newConfig: rovConfiguration,
    });
});

// Send current configuration to client
socket.on("config:get", () => {
    socket.emit("config:data", rovConfiguration);
});
```

## Integration with Socket.IO Server

Here's how to integrate ROS Bridge with the existing Socket.IO server:

```javascript
import express from "express";
import {Server} from "socket.io";
import * as ROSLIB from "roslib";

const app = express();
const server = app.listen(4000);
const io = new Server(server);

// Connect to ROS Bridge on Raspberry Pi
const ros = new ROSLIB.Ros({
    url: "ws://192.168.1.100:9090", // Replace with Raspberry Pi IP
});

// Create publishers
const rovCommandPublisher = new ROSLIB.Topic({
    ros: ros,
    name: "/rov/command",
    messageType: "std_msgs/String",
});

const configPublisher = new ROSLIB.Topic({
    ros: ros,
    name: "/rov/config",
    messageType: "std_msgs/String",
});

// ROV Configuration
let rovConfiguration = {
    thrusters: [
        {location: "top", enabled: true, reversed: false},
        {location: "frontLeft", enabled: true, reversed: false},
        {location: "backLeft", enabled: true, reversed: false},
        {location: "frontRight", enabled: true, reversed: false},
        {location: "backRight", enabled: true, reversed: false},
    ],
    grippers: [
        {location: "front", enabled: true},
        {location: "back", enabled: true},
    ],
    sensors: [
        {type: "depth", enabled: true},
        {type: "temperature", enabled: true},
        {type: "acceleration", enabled: true},
        {type: "rotation", enabled: true},
    ],
    sensitivity: {
        joystick: "High",
        yaw: "High",
    },
};

// ROS connection events
ros.on("connection", () => {
    console.log("Connected to ROS Bridge!");
    io.emit("rov:connection-status", {
        status: "connected",
        message: "Connected to ROS Bridge",
    });
});

ros.on("error", (error) => {
    console.log("Error connecting to ROS Bridge:", error);
    io.emit("rov:connection-status", {
        status: "disconnected",
        message: "Failed to connect to ROS Bridge",
    });
});

// Handle client connections
io.on("connection", (socket) => {
    console.log("Client connected");

    // Controller data - main control loop
    socket.on("controller:data", (controllerReadings) => {
        const command = mapControllerToCommand(
            controllerReadings,
            rovConfiguration
        );
        rovCommandPublisher.publish({
            data: JSON.stringify(command),
        });
    });

    // Thruster testing
    socket.on("config:thruster-test", ({thrusterIndex, value}) => {
        const escCommand = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

        rovCommandPublisher.publish({
            data: JSON.stringify({
                esc: escCommand,
                servo: [0, 0, 0, 0],
                lights: [0, 0],
            }),
        });
    });

    // Gripper testing
    socket.on("config:gripper-test", ({gripperIndex, value}) => {
        const servoCommand = [0, 0, 0, 0];
        if (gripperIndex === 1) {
            servoCommand[0] = value;
            servoCommand[1] = value;
        } else if (gripperIndex === 2) {
            servoCommand[2] = value;
            servoCommand[3] = value;
        }

        rovCommandPublisher.publish({
            data: JSON.stringify({
                esc: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                servo: servoCommand,
                lights: [0, 0],
            }),
        });
    });

    // Configuration management
    socket.on("config:get", () => {
        socket.emit("config:data", rovConfiguration);
    });

    socket.on("config:update", (newConfig) => {
        rovConfiguration = {...rovConfiguration, ...newConfig};
        configPublisher.publish({
            data: JSON.stringify(rovConfiguration),
        });
        socket.emit("config:updated", {
            success: true,
            newConfig: rovConfiguration,
        });
    });

    // ROV connection status
    socket.on("rov:connection-status", () => {
        socket.emit("rov:connection-status", {
            status: ros.isConnected ? "connected" : "disconnected",
            message: ros.isConnected
                ? "ROV is connected"
                : "ROV is disconnected",
        });
    });
});

// Subscribe to ROS topics and forward to clients
const sensorListener = new ROSLIB.Topic({
    ros: ros,
    name: "/rov/sensors",
    messageType: "std_msgs/String",
});

sensorListener.subscribe((message) => {
    io.emit("sensor:data", JSON.parse(message.data));
});
```

## Message Types

### Common ROS Message Types

-   `std_msgs/String`: Generic string messages
-   `std_msgs/Int32`: Integer values (e.g., gripper position)
-   `std_msgs/Float32`: Float values (e.g., single thruster PWM)
-   `geometry_msgs/Twist`: Velocity commands (linear and angular)
-   Custom message types can be defined in ROS

### Using Custom Message Types

If you define custom ROS messages for your ROV, specify them in the `messageType` field:

```javascript
const customPublisher = new ROSLIB.Topic({
    ros: ros,
    name: "/rov/custom_command",
    messageType: "rov_msgs/ThrusterArray",
});
```

## Best Practices

1. **Connection Management**: Always handle connection, error, and close events
2. **Message Validation**: Validate data before publishing to ROS topics
3. **Error Handling**: Implement proper error handling for failed publishes
4. **Reconnection Logic**: Implement automatic reconnection if the connection drops

## Troubleshooting

### Connection Issues

-   Verify ROS Bridge is running on Raspberry Pi: `roslaunch rosbridge_server rosbridge_websocket.launch`
-   Check Raspberry Pi IP address and network connectivity
-   Ensure port 9090 is open and accessible

### Message Not Received

-   Verify topic names match between publisher and subscriber
-   Check message types are correctly specified
-   Use `rostopic list` on Raspberry Pi to see available topics
-   Use `rostopic echo /topic_name` to monitor messages

## Example: Complete Control Flow

```javascript
// 1. Client sends gamepad input via Socket.IO
socket.emit("controller:data", {
    axes: {
        L: [0.5, -0.3], // Left stick X, Y
        R: [0.2, 0.8], // Right stick X, Y
    },
    buttons: {
        A: false,
        B: false,
        X: false,
        Y: true,
        L1: false,
        L2: 0.0, // Analog trigger 0.0 to 1.0
        R1: true,
        R2: 0.5, // Analog trigger 0.0 to 1.0
        up: false,
        down: false,
        left: false,
        right: false,
    },
});

// 2. Server receives and processes controller data
socket.on("controller:data", (controllerReadings) => {
    // Calculate movement intents based on controller input
    const sensitivity = getSensitivityScalars(rovConfiguration);
    const intents = calculateMovementIntents(
        controllerReadings,
        sensitivity
    );
    // intents = { surge, sway, yaw, heave }

    // Map intents to thruster powers
    const esc = mapThrusters(rovConfiguration, intents);

    // Map buttons to gripper commands
    const servo = mapGrippers(controllerReadings, rovConfiguration);

    // Map buttons to lights
    const lights = mapLights(controllerReadings);

    const command = {esc, servo, lights};

    // Publish to ROS
    rovCommandPublisher.publish({
        data: JSON.stringify(command),
    });
});

// 3. ROS receives command and forwards to hardware
// (Handled by ROS nodes on Raspberry Pi)
// Example command sent to ROS:
// {
//   esc: [0.5, 0.7, 0.3, 0.4, 0.6, 0.5],
//   servo: [1, 1, 0, 0],
//   lights: [1, 1]
// }

// 4. ROS publishes sensor data back
// (Handled by ROS nodes on Raspberry Pi)

// 5. Server receives sensor data and forwards to client
sensorListener.subscribe((message) => {
    const sensorData = JSON.parse(message.data);
    io.emit("sensor:data", sensorData);
});

// 6. Client receives and displays sensor data
socket.on("sensor:data", (data) => {
    // Update UI with sensor readings
    // data = { depth, temperature, pitch, roll, yaw }
    updateSensorDisplay(data); // This is just a placeholder function example that we will define elsewhere
});
```
