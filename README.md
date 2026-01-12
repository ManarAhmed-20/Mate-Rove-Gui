# BRC-ROV-GUI 🚀

A comprehensive Remotely Operated Vehicle (ROV) control system built for IEEE Penguins robotics competitions. This full-stack application provides a modern web-based interface for controlling underwater ROVs, featuring real-time communication, sensor monitoring, and precise control capabilities.

## 🌊 Overview

BRC-ROV-GUI is a sophisticated control system designed for underwater ROV operations in competitive environments. The system consists of a React-based frontend client and a Node.js backend server that communicates with ROV hardware through serial connections and WebSocket protocols.

### Key Features

- **Real-time Control**: Instantaneous ROV control with gamepad/joystick support
- **Live Sensor Monitoring**: Real-time display of depth, temperature, and orientation data
- **Thruster Management**: Individual thruster control and configuration
- **Gripper Control**: Precise gripper operation for object manipulation
- **Competition Timer**: Built-in timer for competition scenarios
- **Hardware Communication**: Direct ESP32/Arduino communication via serial port
- **WebSocket Integration**: Low-latency bidirectional communication
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## 🏗️ Project Structure

```
BRC-ROV-GUI/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   │   ├── control-panel/    # Main control interface
│   │   │   └── configurations/   # Settings and config pages
│   │   └── utils/         # Utility functions and socket handling
│   └── public/           # Static assets
├── server/                # Node.js backend server
│   ├── socket/           # WebSocket event handlers
│   └── utils/            # ESP32/Arduino communication utilities
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Serial port access** for hardware communication
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

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

## 🎮 Usage

### Control Panel
- **Main Interface**: Navigate to the control panel for primary ROV operations
- **Gamepad Support**: Connect a compatible gamepad for intuitive control
- **Sensor Display**: Monitor real-time sensor readings
- **Thruster Control**: Fine-tune individual thruster outputs

### Configuration
- **Hardware Settings**: Configure ESP32/Arduino communication parameters
- **Sensor Calibration**: Set up and calibrate various sensors
- **Controller Mapping**: Customize gamepad button assignments
- **Communication Settings**: Adjust WebSocket and serial communication parameters

## 🔧 Hardware Requirements

### ROV Hardware
- **Microcontroller**: ESP32 or Arduino-compatible board
- **Thrusters**: Brushless underwater motors (typically 6-8 thrusters)
- **Sensors**: 
  - IMU (Inertial Measurement Unit)
  - Pressure sensor for depth measurement
  - Temperature sensor
  - Optional: Camera system
- **Gripper**: Servo-controlled gripper mechanism
- **Power System**: Underwater-rated power distribution

### Control Station
- **Computer**: Any modern laptop/desktop with USB ports
- **Controller**: Xbox, PlayStation, or compatible gamepad
- **Network**: Stable connection for competition environments

## 🌐 API Documentation

### WebSocket Events

#### Client → Server
- `controller-data`: Gamepad input data
- `thruster-control`: Individual thruster commands
- `gripper-control`: Gripper position commands
- `request-sensor-data`: Request current sensor readings

#### Server → Client
- `sensor-data`: Real-time sensor information
- `connection-status`: Hardware connection state
- `system-health`: Overall system health status

### HTTP Endpoints
- `GET /health`: Server health check

## 🛠️ Development

### Project Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Socket.IO
- **State Management**: Jotai (atomic state management)
- **Hardware Communication**: SerialPort, WebSocket
- **Build Tools**: Vite, ESLint, TypeScript

### Development Scripts

#### Client
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

#### Server
```bash
npm run dev      # Start with nodemon (auto-restart)
node index.js    # Start production server
```

## 🤝 Contributing

We welcome contributions from the robotics and web development community!

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and patterns
- Add appropriate comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🏆 Competition Use

This system has been designed specifically for underwater robotics competitions including:
- **MATE ROV Competition**
- **Regional Underwater Robotics Competitions**


## 📞 Support

For questions, issues, or collaboration opportunities:

- **GitHub Issues**: [Report bugs or request features](https://github.com/IEEE-Penguins/BRC-ROV-GUI/issues)
- **IEEE Penguins**: Contact the team through official channels
---

**Built with ❤️ by IEEE Penguins**
