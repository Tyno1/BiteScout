import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import FormData from 'form-data';

// Test configuration
const BACKEND_URL = 'http://localhost:5002';
const MEDIA_SERVICE_URL = 'http://localhost:3002';

// Test JWT token (you'll need to get a real one from login)
const TEST_TOKEN = 'your-test-jwt-token';

async function testMediaServiceHealth() {
  try {
    console.log('🔍 Testing Media Service Health...');
    const response = await axios.get(`${MEDIA_SERVICE_URL}/api/v1/media/health/check`);
    console.log('✅ Media Service Health:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Media Service Health Check Failed:', error.message);
    return false;
  }
}

async function testBackendHealth() {
  try {
    console.log('🔍 Testing Backend Health...');
    const response = await axios.get(`${BACKEND_URL}/health`);
    console.log('✅ Backend Health:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Backend Health Check Failed:', error.message);
    return false;
  }
}

async function testMediaUpload() {
  try {
    console.log('🔍 Testing Media Upload...');
    
    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0xCF, 0x00, 0x00,
      0x03, 0x01, 0x01, 0x00, 0x18, 0xDD, 0x8D, 0xB0, 0x00, 0x00, 0x00, 0x00,
      0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);

    const formData = new FormData();
    formData.append('file', testImageBuffer, {
      filename: 'test-image.png',
      contentType: 'image/png'
    });
    formData.append('title', 'Test Image');
    formData.append('description', 'Test image for media service integration');

    const response = await axios.post(`${BACKEND_URL}/api/media/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${TEST_TOKEN}`
      }
    });

    console.log('✅ Media Upload Success:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ Media Upload Failed:', error.response?.data || error.message);
    return null;
  }
}

async function runTests() {
  console.log('🚀 Starting Media Service Integration Tests...\n');

  // Test 1: Health Checks
  const mediaServiceHealthy = await testMediaServiceHealth();
  const backendHealthy = await testBackendHealth();

  if (!mediaServiceHealthy || !backendHealthy) {
    console.log('\n❌ Health checks failed. Please ensure both services are running.');
    console.log('   Backend: npm run dev (in apps/backend)');
    console.log('   Media Service: npm run start:dev (in apps/media-service)');
    return;
  }

  // Test 2: Media Upload
  const uploadResult = await testMediaUpload();

  if (uploadResult) {
    console.log('\n✅ All tests passed! Media service integration is working.');
  } else {
    console.log('\n❌ Media upload test failed. Check the logs above for details.');
  }
}

// Run the tests
runTests().catch(console.error); 