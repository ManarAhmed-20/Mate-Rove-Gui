const {SerialPort} = require("serialport");
const {ReadlineParser} = require("@serialport/parser-readline");

const BAUD_RATE = 115200;
const DELIMITER = "\n";

let port = null;
let parser = null;
let isArduinoReady = false;
let arduinoPath = null;
let io = null;

const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[Arduino] ${message}`);
  if (io) {
    io.emit("rov:log", {timestamp, message});
  }
};

const emitConnectionStatus = (status, message, path = null) => {
  const payload = {status, message};
  if (path) payload.path = path;
  io.emit("rov:connection-status", payload);
};

const handleArduinoData = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    log(`Error parsing JSON: ${error.message}`);
    log(`Malformed data: ${data}`);
  }
};

const sendDataToArduino = (data) => {
  if (!isArduinoReady || !port || !port.isOpen) return;

  const dataString = JSON.stringify(data) + DELIMITER;
  port.write(dataString, (err) => {
    if (err) log(`Error writing to serial port: ${err.message}`);
  });
};

const listPorts = async () => {
  try {
    const ports = await SerialPort.list();
    log(`Found ${ports.length} available ports.`);
    return ports.map((p) => ({
      path: p.path,
      manufacturer: p.manufacturer,
    }));
  } catch (error) {
    log(`Error listing serial ports: ${error.message}`);
    throw error;
  }
};

const resetConnectionState = () => {
  isArduinoReady = false;
  port = null;
  parser = null;
  arduinoPath = null;
};

const disconnectFromArduino = () => {
  if (!port || !port.isOpen) {
    log("Already disconnected.");
    return;
  }

  port.close((err) => {
    if (err) {
      log(`Error closing port: ${err.message}`);
    } else {
      resetConnectionState();
      emitConnectionStatus("disconnected", "ROV has been disconnected.");
    }
  });
};

const setupPortEventHandlers = (path) => {
  port.on("open", () => {
    isArduinoReady = true;
    log(`Successfully connected to ROV at ${path}.`);
    emitConnectionStatus("connected", `ROV connected successfully on ${path}.`, path);
  });

  parser.on("data", handleArduinoData);

  port.on("error", (err) => {
    log(`Serial Port Error: ${err.message}`);
    isArduinoReady = false;
    emitConnectionStatus("error", `Error with ROV connection: ${err.message}`);
  });

  port.on("close", () => {
    isArduinoReady = false;
    if (arduinoPath) {
      log(`Connection to ${arduinoPath} closed.`);
      emitConnectionStatus("disconnected", "ROV connection lost.");
      arduinoPath = null;
    }
  });
};

const connectToArduino = (path) => {
  if (isArduinoReady) {
    if (path === arduinoPath) {
      log(`Already connected to ${path}.`);
      return;
    }
    disconnectFromArduino();
  }

  log(`Attempting to connect to ${path}...`);
  arduinoPath = path;

  port = new SerialPort({path, baudRate: BAUD_RATE});
  parser = port.pipe(new ReadlineParser({delimiter: DELIMITER}));

  setupPortEventHandlers(path);
};

const initializeArduino = (socketIoInstance) => {
  io = socketIoInstance;
  log("Arduino Connection Manager Initialized.");
  listPorts();

  module.exports.api = {
    connectToArduino,
    disconnectFromArduino,
    listPorts,
    sendDataToArduino,
    isArduinoReady: () => isArduinoReady,
  };
};

module.exports.initializeArduino = initializeArduino;
