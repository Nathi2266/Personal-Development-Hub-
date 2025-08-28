# Quick Setup Guide

## Environment Variables Setup

✅ **Create `.env` file** in the backend directory with your Firebase credentials
✅ **Install dotenv package** to load environment variables
✅ **Server configuration** uses environment variables

## Steps to Run:

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Firebase Authentication (Choose ONE option)

**Option A: Firebase CLI (Recommended)**
```bash
npm install -g firebase-tools
firebase login
firebase use debugthugs-37266
```

**Option B: Service Account Key**
- Go to [Firebase Console](https://console.firebase.google.com/project/debugthugs-37266/settings/serviceaccounts/adminsdk)
- Click "Generate new private key"
- Save the JSON file
- Set environment variable: `set GOOGLE_APPLICATION_CREDENTIALS=path/to/your-key.json`

### 3. Start the Server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start

# Or use Windows batch file
start.bat
```

## Test Your Setup:

1. **Health Check**: http://localhost:5000/api/health
2. **Firebase Test**: http://localhost:5000/api/test

## What's Configured:

- **Port**: From .env (default: 5000)
- **Firebase Project**: From .env (debugthugs-37266)
- **CORS Origin**: From .env (default: http://localhost:3000)
- **Collections**: users, goals, milestones, badges, seasons

## Files Updated:

- `config.js` - Now uses environment variables
- `firebase.config.js` - Now uses environment variables
- `server.js` - Loads .env file and uses config
- `package.json` - Added dotenv dependency

## Environment Variables Used:

- `REACT_APP_FIREBASE_*` - Firebase configuration
- `PORT` - Server port
- `CORS_ORIGIN` - Allowed CORS origin
- `FIREBASE_*` - Firebase admin configuration

## Troubleshooting:

- **Port 5000 in use?** Change PORT in .env
- **CORS issues?** Update CORS_ORIGIN in .env
- **Firebase connection error?** Make sure you're authenticated
- **Environment variables not loading?** Check .env file location and format
