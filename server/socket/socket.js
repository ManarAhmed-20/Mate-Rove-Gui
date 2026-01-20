const { Server } = require('socket.io');
const events = require('./events');
const { initROS, rosSocket } = require('../utils/ros/ros.js');

initROS();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    socket.emit('connection-status', {
      status: 'connected',
      clientId: socket.id,
      timestamp: new Date().toISOString()
    });

    events(io, socket);

    socket.on('disconnect', (reason) => {
      console.log('🔴 Client disconnected:', socket.id, 'Reason:', reason);
    });

    socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
    });
  });

  // ✅ هنا نضيف sensor updates
  rosSocket.on('message', (data) => {
      try {
          const parsedData = JSON.parse(data);
          io.emit('sensor:update', parsedData);
      } catch (err) {
          console.error('[ROS] Failed to parse message:', err);
      }
  });

  return io;
};

module.exports = initializeSocket;
