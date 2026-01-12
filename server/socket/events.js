const arduinoConnection = require("../utils/esp/connection");
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

const getSensitivityScalars = (config) => ({
  joystick: SENSITIVITY_VALUES[config.sensitivity.joystick] || SENSITIVITY_VALUES.High,
  yaw: YAW_SENSITIVITY_VALUES[config.sensitivity.yaw] || YAW_SENSITIVITY_VALUES.High,
});

const calculateMovementIntents = (controllerReadings, sensitivity) => ({
  surge: (controllerReadings.axes.L[1] || 0) * sensitivity.joystick,
  sway: 0,
  yaw: (-(controllerReadings.buttons.R2 || 0) + (controllerReadings.buttons.L2 || 0)) * sensitivity.yaw,
  heave: (controllerReadings.axes.R[1] || 0) * -1 * sensitivity.joystick,
});

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

const clampPower = (power) => Math.max(-1.0, Math.min(1.0, power));

const applyThrusterConfig = (power, thrusterConfig) => {
  if (!thrusterConfig.enabled) return 0.0;
  if (thrusterConfig.reversed) power = -power;
  if (power === -0) power = 0;

  return clampPower(power);
};

const mapThrusters = (config, intents) => {
  return config.thrusters.map((thrusterConfig) => {
    const power = calculateThrusterPower(thrusterConfig.location, intents);
    return applyThrusterConfig(power, thrusterConfig);
  });
};

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

const mapLights = (controllerReadings) => {
  if (controllerReadings.buttons.R1) return [1, 1];
  return [0, 0];
};

function mapControllerToCommand(controllerReadings, config) {
  const sensitivity = getSensitivityScalars(config);
  const intents = calculateMovementIntents(controllerReadings, sensitivity);

  return {
    esc: mapThrusters(config, intents),
    servo: mapGrippers(controllerReadings, config),
    lights: mapLights(controllerReadings),
  };
}

const registerEventHandlers = (io, socket) => {
  const arduino = () => arduinoConnection.api;

  socket.on("rov:connection-status", () => {
    const api = arduino();
    const isReady = api.isArduinoReady();
    io.emit("rov:connection-status", {
      status: isReady ? "connected" : "disconnected",
      message: isReady ? "ROV is connected." : "ROV is disconnected.",
    });
  });

  socket.on("rov:find-com-ports", async () => {
    try {
      const api = arduino();
      if (!api) return socket.emit("rov:error", {message: "Arduino module not ready."});
      const ports = await api.listPorts();
      socket.emit("rov:com-ports-list", ports);
    } catch (error) {
      socket.emit("rov:error", {
        message: "Failed to find COM ports.",
        error: error.message,
      });
    }
  });

  socket.on("rov:connect", (comPort) => {
    const api = arduino();
    if (!api) return socket.emit("rov:error", {message: "Arduino module not ready."});
    if (!comPort) return socket.emit("rov:error", {message: "No COM Port was provided."});
    api.connectToArduino(comPort);
  });

  socket.on("rov:disconnect", () => {
    const api = arduino();
    if (api) api.disconnectFromArduino();
  });

  socket.on("controller:data", (controllerReadings) => {
    const api = arduino();
    if (!api || !api.isArduinoReady()) return;

    const command = mapControllerToCommand(controllerReadings, rovConfiguration);
    api.sendDataToArduino(command);
  });

  socket.on("config:get", () => {
    socket.emit("config:data", rovConfiguration);
  });

  socket.on("config:update", (newConfig) => {
    rovConfiguration = {...rovConfiguration, ...newConfig};
    socket.emit("config:updated", {
      success: true,
      newConfig: rovConfiguration,
    });
  });

  socket.on("config:thruster-test", ({thrusterIndex, value}) => {
    const api = arduino();
    if (!api || !api.isArduinoReady()) return;

    const escCommand = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    if (thrusterIndex >= 0 && thrusterIndex < 6) {
      escCommand[thrusterIndex] = value / 100.0;
    }

    api.sendDataToArduino({
      esc: escCommand,
      servo: [0, 0, 0, 0],
      lights: [0, 0],
    });
  });

  socket.on("config:gripper-test", ({gripperIndex, value}) => {
    const api = arduino();
    if (!api || !api.isArduinoReady()) return;

    const servoCommand = [0, 0, 0, 0];
    if (gripperIndex === 1) {
      servoCommand[0] = value;
      servoCommand[1] = value;
    } else if (gripperIndex === 2) {
      servoCommand[2] = value;
      servoCommand[3] = value;
    }

    api.sendDataToArduino({
      esc: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      servo: servoCommand,
      lights: [0, 0],
    });
  });
};

module.exports = registerEventHandlers;
