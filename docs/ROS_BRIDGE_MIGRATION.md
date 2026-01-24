# ROS Bridge Architecture Migration

## Overview

The system has been migrated from a **serial communication architecture** to a **ROS Bridge architecture**. This change enables better integration with ROS2 ecosystem and allows the microcontroller to communicate via ROS topics instead of direct serial connection.

## Architecture Changes

### Old Architecture

```
Client → Server → Microcontroller (Serial) ↔ Sensors
```

### New Architecture

```
Client → Server → ROS Bridge → ROS Topics ↔ Microcontroller
                                    ├── /rov/command (publish)
                                    └── /rov/sensors (subscribe)
```

## Key Changes

### Server Side

1. **New Dependency**: Added `roslib` package for ROS Bridge WebSocket communication
2. **New Module**: Created `server/utils/ros/connection.js` to manage ROS Bridge connection
3. **Updated Event Handlers**: Refactored `server/socket/events.js` to:
    - Use ROS Bridge instead of serial communication
    - Publish control commands to `/rov/command` topic
    - Subscribe to sensor data from `/rov/sensors` topic
    - Removed COM port discovery functionality

### Client Side

1. **Updated Socket Events**: Refactored `client/src/utils/socket/events.ts` with:
    - New method names following clean code principles
    - Better JSDoc documentation

2. **Updated Communication UI**: Refactored the Communication component to:
    - Accept ROS Bridge WebSocket URLs instead of COM ports
    - Provide quick-select buttons for common URLs
    - Custom URL input field
    - Real-time connection status checking

## ROS Topics

### `/rov/command`

**Type**: `std_msgs/String`  
**Direction**: Server → Microcontroller  
**Purpose**: Sends control commands to the ROV

**Message Format** (JSON string):

```json
{
    "esc": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    "servo": [0, 0, 0, 0],
    "lights": [0, 0]
}
```

### `/rov/sensors`

**Type**: `std_msgs/String`  
**Direction**: Microcontroller → Server  
**Purpose**: Receives sensor data from the ROV

**Message Format** (JSON string):

```json
{
    "depth": 0.0,
    "temperature": 25.0,
    "acceleration": [0, 0, 0],
    "rotation": [0, 0, 0]
}
```

## Setup Instructions

### Prerequisites

1. **ROS Bridge Server**: Install and run rosbridge_server on your ROS2 system

    ```bash
    sudo apt-get install ros-<distro>-rosbridge-server
    ros2 launch rosbridge_server rosbridge_websocket_launch.xml
    ```

2. **Server Dependencies**: Install the updated server dependencies
    ```bash
    cd server
    npm install
    ```

### Configuration

1. **ROS Bridge URL**: Default is `ws://localhost:9090`
2. Update the URL in the Communication Configuration UI to match your ROS Bridge server

### Common ROS Bridge URLs

- Local: `ws://localhost:9090`
- Raspberry Pi (typical): `ws://192.168.1.100:9090`

## API Reference

### Server Events

#### Connection Management

- `rov:connect` - Connect to ROS Bridge (param: `rosBridgeUrl`)
- `rov:disconnect` - Disconnect from ROS Bridge
- `rov:connection-status` - Check connection status

#### Control & Configuration

- `controller:data` - Send controller input (param: `controllerData`)
- `config:get` - Get ROV configuration
- `config:update` - Update ROV configuration (param: `config`)
- `config:thruster-test` - Test individual thruster
- `config:gripper-test` - Test individual gripper

### Client Socket Events API

#### New Method Names

```typescript
events.connectToRosBridge(rosBridgeUrl: string)
events.disconnectFromRosBridge()
events.checkRosBridgeStatus()
events.getRovConfiguration()
events.updateRovConfiguration(config: object)
events.testThruster(thrusterIndex: number, value: number)
events.testGripper(gripperIndex: number, value: number)
events.sendControllerData(controllerData: object)
```
