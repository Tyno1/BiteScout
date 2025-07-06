# BiteScout Setup Guide

## Overview
BiteScout is a restaurant management platform with real-time features, role-based access control, and comprehensive restaurant management tools.

## Security Improvements Made

### 🔒 **Critical Security Fixes**
- ✅ Enhanced password validation (8+ chars, complexity requirements)
- ✅ Improved CORS configuration with environment-based origins
- ✅ Enhanced Socket.IO security with rate limiting and validation
- ✅ Comprehensive error handling middleware
- ✅ Security headers implementation
- ✅ Environment variables properly configured and documented

### 🛡️ **Additional Security Features**
- ✅ MongoDB connection pooling and timeout configuration
- ✅ JWT token validation improvements
- ✅ Input validation and sanitization
- ✅ Rate limiting for authentication attempts
- ✅ Health check endpoints
- ✅ Proper error logging and handling

## Prerequisites

- Node.js 18+ 
- MongoDB 6+
- npm or yarn

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BiteScout
```

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment file
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Frontend Setup
```bash
cd web
npm install

# Copy environment file
cp env.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

## Environment Configuration

### Backend (.env)
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/bitescout

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend (.env.local)
```env
# Next.js Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Backend API Configuration
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

## Running the Application

### Development Mode

1. **Start Backend**
```bash
cd backend
npm run dev
```
Backend will start on: http://localhost:5001

2. **Start Frontend** (in new terminal)
```bash
cd web
npm run dev
```
Frontend will start on: http://localhost:3000

3. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/health

### Production Mode

1. **Build Backend**
```bash
cd backend
npm run build
npm start
```

2. **Build Frontend**
```bash
cd web
npm run build
npm start
```

## Socket.IO Configuration

### Important Notes
- Backend Socket.IO server runs on port 5001
- Frontend connects to `http://localhost:5001` by default
- Socket.IO uses the root namespace (`/`)
- CORS is configured to allow connections from frontend

### Troubleshooting Socket.IO Issues

1. **"Invalid namespace" Error**
   - Ensure backend is running on port 5001
   - Check `NEXT_PUBLIC_BACKEND_URL` environment variable
   - Verify CORS configuration allows your frontend origin

2. **Connection Refused**
   - Check if backend server is running
   - Verify port 5001 is not blocked by firewall
   - Check console for backend startup errors

3. **CORS Issues**
   - Ensure `ALLOWED_ORIGINS` includes your frontend URL
   - Check browser console for CORS error details

## Security Best Practices

### 🔐 **Environment Variables**
- Never commit `.env` files to version control
- Use strong, unique secrets for JWT tokens
- Rotate secrets regularly in production
- Use different secrets for different environments

### 🛡️ **Password Security**
- Minimum 8 characters
- Must contain uppercase, lowercase, number, and special character
- Consider implementing password strength indicators
- Implement account lockout after failed attempts

### 🌐 **CORS Configuration**
- Configure `ALLOWED_ORIGINS` for your specific domains
- Avoid using `*` in production
- Regularly review and update allowed origins

### 🔑 **JWT Security**
- Use short expiration times for access tokens
- Implement proper refresh token rotation
- Store tokens securely (httpOnly cookies recommended)
- Validate tokens on every request

### 📊 **Database Security**
- Use connection pooling
- Implement proper indexing
- Regular backups
- Monitor for suspicious queries

## Monitoring and Logging

### Health Checks
- Backend health: `GET /health`
- Monitor uptime and response times
- Set up alerts for health check failures

### Error Logging
- All errors are logged with stack traces in development
- Production errors are sanitized for security
- Consider implementing structured logging (Winston, Pino)

### Performance Monitoring
- Monitor MongoDB connection pool usage
- Track API response times
- Monitor Socket.IO connection counts

## Deployment Checklist

### Pre-Deployment
- [ ] Update all environment variables for production
- [ ] Generate strong, unique secrets
- [ ] Configure production database
- [ ] Set up SSL/TLS certificates
- [ ] Configure production CORS origins
- [ ] Set up monitoring and logging

### Post-Deployment
- [ ] Verify health check endpoints
- [ ] Test authentication flow
- [ ] Verify Socket.IO connections
- [ ] Monitor error logs
- [ ] Test rate limiting
- [ ] Verify security headers

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `ALLOWED_ORIGINS` configuration
   - Verify frontend URL is included in allowed origins

2. **JWT Token Issues**
   - Verify `JWT_SECRET` is set correctly
   - Check token expiration times
   - Ensure proper token format

3. **Socket.IO Connection Issues**
   - Check backend URL configuration
   - Verify CORS settings for Socket.IO
   - Check network connectivity
   - Ensure backend is running on port 5001

4. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check network connectivity
   - Verify database permissions

5. **Port Conflicts**
   - Backend should run on port 5001
   - Frontend should run on port 3000
   - Check if ports are already in use

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=*
```

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review error logs
3. Verify environment configuration
4. Test with minimal configuration

## Contributing

When contributing:
1. Follow security best practices
2. Add proper error handling
3. Include input validation
4. Update documentation
5. Test thoroughly

---

**⚠️ Security Notice**: This application handles sensitive data. Always follow security best practices and keep dependencies updated. 