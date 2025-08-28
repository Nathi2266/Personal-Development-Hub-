// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const config = require('./config');
const { db, bucket } = require('./functions/config/firebase');

const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors(config.server.cors));
app.use(express.json());

// Test endpoint to verify Firebase connection
app.get('/api/test', async (req, res) => {
  try {
    // Test Firestore connection
    const testDoc = await db.collection('test').doc('connection').get();
    
    res.json({
      message: 'Backend is running and connected to Firebase!',
      firestore: 'Connected',
      storage: 'Connected',
      projectId: config.firebase.projectId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Firebase connection error:', error);
    res.status(500).json({
      error: 'Failed to connect to Firebase',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    firebase: {
      projectId: config.firebase.projectId,
      connected: true
    },
    server: {
      port: config.server.port,
      cors: config.server.cors.origin
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Firebase project: ${config.firebase.projectId}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
});

module.exports = app;