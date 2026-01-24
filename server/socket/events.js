const rosBridgeConnection = require("../utils/ros/connection");

const SENSITIVITY_VALUES = {
  High: 1.0,
  Normal: 0.75,
  Low: 0.5,
};

const YAW_SENSITIVITY_VALUES = {
  High: 1.0,
  Normal: 0.7,
  Low: 0.4,
};

let rovConfiguration = {
  thrusters: [
    { location: "top", enabled: true, reversed: false },
    { location: "frontLeft", enabled: true, reversed: false },
    { location: "backLeft", enabled: true, reversed: false },
    { location: "frontRight", enabled: true, reversed: false },
    { location: "backRight", enabled: true, reversed: false },
  ],
  grippers: [
    { location: "front", enabled: true },
    { location: "back", enabled: true },
  ],
  sensors: [
    { type: "depth", enabled: true },
    { type: "temperature", enabled: true },
    { type: "acceleration", enabled: true },
    { type: "rotation", enabled: true },
  ],
  sensitivity: {
    joystick: "High",
    yaw: "High",
  },
};

/**
 * Gets sensitivity scalar values from configuration
 * @param {object} config - ROV configuration
 * @returns {object} Sensitivity scalars for joystick and yaw
 */
const getSensitivityScalars = (config) => ({
  joystick: SENSITIVITY_VALUES[config.sensitivity.joystick] || SENSITIVITY_VALUES.High,
  yaw: YAW_SENSITIVITY_VALUES[config.sensitivity.yaw] || YAW_SENSITIVITY_VALUES.High,
});

/**
 * Calculates movement intents from controller readings
 * @param {object} controllerReadings - Controller input data
 * @param {object} sensitivity - Sensitivity scalars
 * @returns {object} Movement intents (surge, sway, yaw, heave)
 */
const calculateMovementIntents = (controllerReadings, sensitivity) => ({
  surge: (controllerReadings.axes.L[1] || 0) * sensitivity.joystick,
  sway: 0,
  yaw: (-(controllerReadings.buttons.R2 || 0) + (controllerReadings.buttons.L2 || 0)) * sensitivity.yaw,
  heave: (controllerReadings.axes.R[1] || 0) * -1 * sensitivity.joystick,
});

/**
 * Calculates thruster power based on location and movement intents
 * @param {string} location - Thruster location
 * @param {object} intents - Movement intents
 * @returns {number} Thruster power value
 */
const calculateThrusterPower = (location, intents) => {
  switch (location) {
    case "top":
      return intents.heave;
    case "frontLeft":
      return intents.sway + intents.yaw + intents.surge;
    case "frontRight":
      return -intents.surge + intents.sway - intents.yaw;
    case "backLeft":
      return -intents.surge - intents.sway + intents.yaw;
    case "backRight":
      return intents.surge + intents.sway + intents.yaw;
    default:
      return 0.0;
  }
};

/**
 * Clamps power value between -1.0 and 1.0
 * @param {number} power - Power value
 * @returns {number} Clamped power value
 */
const clampPower = (power) => Math.max(-1.0, Math.min(1.0, power));

/**
 * Applies thruster configuration (enabled/reversed) to power value
 * @param {number} power - Raw power value
 * @param {object} thrusterConfig - Thruster configuration
 * @returns {number} Configured power value
 */
const applyThrusterConfig = (power, thrusterConfig) => {
  if (!thrusterConfig.enabled) return 0.0;
  if (thrusterConfig.reversed) power = -power;
  if (power === -0) power = 0;

  return clampPower(power);
};

/**
 * Maps thruster configuration to power array
 * @param {object} config - ROV configuration
 * @param {object} intents - Movement intents
 * @returns {number[]} Array of thruster power values
 */
const mapThrusters = (config, intents) => {
  return config.thrusters.map((thrusterConfig) => {
    const power = calculateThrusterPower(thrusterConfig.location, intents);
    return applyThrusterConfig(power, thrusterConfig);
  });
};

/**
 * Maps gripper controls from controller readings
 * @param {object} controllerReadings - Controller input data
 * @param {object} config - ROV configuration
 * @returns {number[]} Array of servo values
 */
const mapGrippers = (controllerReadings, config) => {
  const servo = [0, 0, 0, 0];

  if (config.grippers[0].enabled) {
    if (controllerReadings.buttons.Y) servo[0] = 1;
    if (controllerReadings.buttons.A) servo[0] = -1;
    if (controllerReadings.buttons.B) servo[1] = 1;
    if (controllerReadings.buttons.X) servo[1] = -1;
  }

  if (config.grippers[1].enabled) {
    if (controllerReadings.buttons.up) servo[2] = 1;
    if (controllerReadings.buttons.down) servo[2] = -1;
    if (controllerReadings.buttons.left) servo[3] = 1;
    if (controllerReadings.buttons.right) servo[3] = -1;
  }

  return servo;
};

/**
 * Maps light controls from controller readings
 * @param {object} controllerReadings - Controller input data
 * @returns {number[]} Array of light values
 */
const mapLights = (controllerReadings) => {
  if (controllerReadings.buttons.R1) return [1, 1];
  return [0, 0];
};

/**
 * Maps controller input to ROV command
 * @param {object} controllerReadings - Controller input data
 * @param {object} config - ROV configuration
 * @returns {object} Command object with esc, servo, and lights
 */
function mapControllerToCommand(controllerReadings, config) {
  const sensitivity = getSensitivityScalars(config);
  const intents = calculateMovementIntents(controllerReadings, sensitivity);

  return {
    esc: mapThrusters(config, intents),
    servo: mapGrippers(controllerReadings, config),
    lights: mapLights(controllerReadings),
  };
}

/**
 * Registers Socket.IO event handlers for ROV communication
 * @param {object} io - Socket.IO server instance
 * @param {object} socket - Socket.IO socket instance
 */
const registerEventHandlers = (io, socket) => {
  const rosApi = () => rosBridgeConnection.api;

  // Check ROS Bridge connection status
  socket.on("rov:connection-status", () => {
    const api = rosApi();
    const isReady = api.isRosReady();
    io.emit("rov:connection-status", {
      status: isReady ? "connected" : "disconnected",
      message: isReady ? "ROS Bridge is connected." : "ROS Bridge is disconnected.",
      url: api.getCurrentUrl(),
    });
  });

  // Connect to ROS Bridge
  socket.on("rov:connect", (rosBridgeUrl) => {
    const api = rosApi();
    if (!api) return socket.emit("rov:error", { message: "ROS Bridge module not ready." });
    if (!rosBridgeUrl) return socket.emit("rov:error", { message: "No ROS Bridge URL was provided." });
    api.connectToRosBridge(rosBridgeUrl);
  });

  // Disconnect from ROS Bridge
  socket.on("rov:disconnect", () => {
    const api = rosApi();
    if (api) api.disconnectFromRosBridge();
  });

  // Handle controller data and publish command to ROS
  socket.on("controller:data", (controllerReadings) => {
    const api = rosApi();
    if (!api || !api.isRosReady()) return;

    const command = mapControllerToCommand(controllerReadings, rovConfiguration);
    api.publishCommand(command);
  });

  // Get current configuration
  socket.on("config:get", () => {
    socket.emit("config:data", rovConfiguration);
  });

  // Update configuration
  socket.on("config:update", (newConfig) => {
    rovConfiguration = { ...rovConfiguration, ...newConfig };
    socket.emit("config:updated", {
      success: true,
      newConfig: rovConfiguration,
    });
  });

  // Test individual thruster
  socket.on("config:thruster-test", ({ thrusterIndex, value }) => {
    const api = rosApi();
    if (!api || !api.isRosReady()) return;

    const escCommand = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    if (thrusterIndex >= 0 && thrusterIndex < 6) {
      escCommand[thrusterIndex] = value / 100.0;
    }

    api.publishCommand({
      esc: escCommand,
      servo: [0, 0, 0, 0],
      lights: [0, 0],
    });
  });

  // Test individual gripper
  socket.on("config:gripper-test", ({ gripperIndex, value }) => {
    const api = rosApi();
    if (!api || !api.isRosReady()) return;

    const servoCommand = [0, 0, 0, 0];
    if (gripperIndex === 1) {
      servoCommand[0] = value;
      servoCommand[1] = value;
    } else if (gripperIndex === 2) {
      servoCommand[2] = value;
      servoCommand[3] = value;
    }

    api.publishCommand({
      esc: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      servo: servoCommand,
      lights: [0, 0],
    });
  });
};

module.exports = registerEventHandlers;
