const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('node:fs');
const path = require('node:path');

const app = express();
const PORT = 3001;

// Read and parse the OpenAPI spec
const specPath = path.join(__dirname, 'openapi', 'spec.yaml');
const spec = yaml.load(fs.readFileSync(specPath, 'utf8'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'BiteScout API Documentation'
}));

// Redirect root to docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'OpenAPI docs server is running' });
});

app.listen(PORT, () => {
  console.log('🚀 OpenAPI documentation server running at:');
  console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`🏠 Home: http://localhost:${PORT}`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log('\nPress Ctrl+C to stop the server');
});
