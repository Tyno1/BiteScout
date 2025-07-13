// Simple Socket.IO connection test
const { io } = require('socket.io-client');

const socket = io('http://localhost:5001', {
  transports: ['websocket', 'polling'],
  timeout: 5000,
});

socket.on('connect', () => {
  console.log('✅ Successfully connected to Socket.IO server');
  console.log('Socket ID:', socket.id);
  
  // Test authentication
  socket.emit('authenticate', 'test-user-id');
});

socket.on('authenticated', (data) => {
  console.log('✅ Authentication successful:', data.message);
  
  // Disconnect after successful test
  setTimeout(() => {
    socket.disconnect();
    console.log('✅ Test completed successfully');
    process.exit(0);
  }, 1000);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error.message);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.error('❌ Test timeout - server not responding');
  process.exit(1);
}, 10000); 