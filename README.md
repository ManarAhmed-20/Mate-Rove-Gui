# BRC-ROV-GUI

A comprehensive Remotely Operated Vehicle (ROV) control system built for IEEE Penguins robotics competitions. This full-stack application provides a modern web-based interface for controlling underwater ROVs, featuring real-time communication, sensor monitoring, and precise control capabilities.

## Overview

BRC-ROV-GUI is a sophisticated control system designed for underwater ROV operations in competitive environments. The system consists of a React-based frontend client and a Node.js backend server that communicates with ROV hardware through serial connections and WebSocket protocols.

### Key Features

-   **Real-time Control**: Instantaneous ROV control with gamepad/joystick support
-   **Live Sensor Monitoring**: Real-time display of depth, temperature, and orientation data
-   **Thruster Management**: Individual thruster control and configuration
-   **Gripper Control**: Precise gripper operation for object manipulation
-   **Competition Timer**: Built-in timer for competition scenarios
-   **Hardware Communication**: Direct ESP32/Arduino communication via serial port
-   **WebSocket Integration**: Low-latency bidirectional communication
-   **Responsive Design**: Modern UI built with React and Tailwind CSS

## Project Structure

The project is organized into two main directories: `client` (frontend) and `server` (backend).

### Client (Frontend)

The client directory contains the React-based user interface:

```
client/
├── atoms/
│   └── atoms.tsx           # Jotai state management atoms
├── public/                 # Static assets (images, fonts, etc.)
└── src/
    ├── App.css             # Global application styles
    ├── App.tsx             # Root application component
    ├── main.tsx            # Application entry point
    ├── temp.tsx            # Temporary/development components
    ├── vite-env.d.ts       # Vite environment type definitions
    ├── components/         # Reusable UI components
    │   ├── card.tsx        # Card component for content containers
    │   ├── layout.tsx      # Application layout wrapper
    │   ├── link-navigator.tsx  # Navigation link component
    │   ├── slider-value.tsx    # Value display for sliders
    │   ├── slider.tsx      # Slider input component
    │   └── connection/     # Connection-related components
    │       ├── connection-button.tsx      # Connection toggle button
    │       ├── connection.tsx             # Main connection manager
    │       ├── controller-connection.tsx  # Gamepad connection handler
    │       └── rov-connection.tsx         # ROV hardware connection
    ├── pages/              # Main application pages
    │   ├── configurations/ # Configuration page
    │   │   ├── page.tsx    # Configuration page layout
    │   │   └── components/ # Configuration-specific components
    │   │       ├── Checkbox.tsx           # Checkbox input component
    │   │       ├── ConfigItem.tsx         # Individual config item
    │   │       ├── ConfigurationRow.tsx   # Config row layout
    │   │       ├── LocationSelector.tsx   # Location selection UI
    │   │       ├── SelectMenu.tsx         # Dropdown select menu
    │   │       ├── communication/         # Communication settings
    │   │       │   ├── ActionButton.tsx   # Action buttons for comm
    │   │       │   ├── communication.tsx  # Communication config page
    │   │       │   ├── controllerData.tsx # Controller data display
    │   │       │   └── Logs.tsx           # Communication logs viewer
    │   │       ├── gripper/               # Gripper configuration
    │   │       │   └── gripper.tsx        # Gripper settings
    │   │       ├── sensor/                # Sensor configuration
    │   │       │   ├── NumberInput.tsx    # Number input component
    │   │       │   └── sensor.tsx         # Sensor settings
    │   │       └── thruster/              # Thruster configuration
    │   │           └── thruster.tsx       # Thruster settings
    │   └── control-panel/  # Control panel page
    │       ├── page.tsx    # Control panel layout
    │       └── components/ # Control panel components
    │           ├── analog-triggers-container.tsx  # Analog trigger display
    │           ├── clicked-buttons-container.tsx  # Button state display
    │           ├── competition-timer.tsx          # Competition timer
    │           ├── keypad-button.tsx              # Keypad button component
    │           ├── L2R2Triggers.tsx               # L2/R2 trigger display
    │           ├── sensors-display.tsx            # Sensor data display
    │           └── slider-container.tsx           # Slider controls
    └── utils/              # Utility functions
        └── socket/         # WebSocket utilities
            ├── events.ts   # Socket event definitions
            └── socket.ts   # Socket.IO client setup
```

### Server (Backend)

The server directory contains the Node.js backend:

```
server/
├── index.js              # Main server entry point
├── package.json          # Server dependencies and scripts
├── temp.js               # Temporary/development code
├── values.md             # Configuration values documentation
├── socket/               # WebSocket event handling
│   ├── events.js         # Socket event definitions
│   └── socket.js         # Socket.IO server setup
└── utils/                # Utility modules
    └── esp/              # ESP32/Arduino communication
        └── connection.js # Serial port connection handler
```

## Quick Start

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   **Serial port access** for hardware communication

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/IEEE-Penguins/BRC-ROV-GUI.git
    cd BRC-ROV-GUI
    ```

2. **Install server dependencies**

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. **Start the server** (Terminal 1)

    ```bash
    cd server
    npm run dev
    ```

    Server will start on `http://localhost:4000`

2. **Start the client** (Terminal 2)

    ```bash
    cd client
    npm run dev
    ```

    Client will start on `http://localhost:5173`

3. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## Usage

### Control Panel

-   **Main Interface**: Navigate to the control panel for primary ROV operations
-   **Gamepad Support**: Connect a compatible gamepad for intuitive control
-   **Sensor Display**: Monitor real-time sensor readings
-   **Thruster Control**: Fine-tune individual thruster outputs

### Configuration

-   **Hardware Settings**: Configure ESP32/Arduino communication parameters
-   **Sensor Calibration**: Set up and calibrate various sensors
-   **Controller Mapping**: Customize gamepad button assignments
-   **Communication Settings**: Adjust WebSocket and serial communication parameters

## Hardware Requirements

### ROV Hardware

-   **Microcontroller**: ESP32 or Arduino-compatible board
-   **Thrusters**: Brushless underwater motors (typically 6-8 thrusters)
-   **Sensors**:
    -   IMU (Inertial Measurement Unit)
    -   Pressure sensor for depth measurement
    -   Temperature sensor
    -   Camera system
-   **Gripper**: Servo-controlled gripper mechanism
-   **Power System**: Underwater-rated power distribution

### Project Stack

-   **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
-   **Backend**: Node.js, Express, Socket.IO
-   **State Management**: Jotai (atomic state management)
-   **Hardware Communication**: SerialPort, WebSocket
-   **Build Tools**: Vite, ESLint, TypeScript

### Development Scripts

#### Client

```bash
npm run dev      # Start development server
```

#### Server

```bash
npm run dev      # Start with nodemon (auto-restart)
node index.js    # Start production server
```

## Competition Use

This system has been designed specifically for underwater robotics competitions including:

-   **MATE ROV Competition**
-   **Regional Underwater Robotics Competitions**

---

**Built by IEEE Penguins**
