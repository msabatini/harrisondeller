# 🚀 Quick Start Guide - Local Development

## ⚡ TL;DR - Start Development Now

```bash
# Terminal 1 - Backend (stays running)
cd backend && npm run start:dev

# Terminal 2 - Frontend (stays running)  
cd frontend && npm start

# Open browser
open http://localhost:4200
```

✅ **MongoDB runs automatically in background**

---

## 📌 Important Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend (Angular) | 4200 | http://localhost:4200 |
| Backend API (NestJS) | 3000 | http://localhost:3000 |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

## 🔍 Verify Everything is Working

### Check Backend is Running
```bash
curl http://localhost:3000/
```
Should return a response (may be empty on first load)

### Check Frontend is Running
```bash
# Open in browser or curl:
curl http://localhost:4200/ | grep -i "angular"
```

### Check MongoDB is Running
```bash
brew services list | grep mongodb
```
Should show `mongodb-community@8.0 started`

---

## 📂 Project Structure

```
harrisondeller/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── auth/        # JWT authentication
│   │   ├── artworks/    # Artwork CRUD
│   │   ├── bodies/      # Bodies of work
│   │   ├── music/       # Music entries
│   │   ├── contact/     # Contact form
│   │   └── upload/      # File upload
│   └── .env            # Environment vars (configured)
│
└── frontend/            # Angular 20 app
    ├── src/app/
    │   ├── components/  # UI components
    │   ├── services/    # API services
    │   ├── models/      # TypeScript interfaces
    │   ├── guards/      # Route guards
    │   └── interceptors/# HTTP interceptors
    └── package.json    # Dependencies (all installed)
```

---

## 🎯 Current Capabilities

### ✅ Working
- [x] Backend API with 35+ routes
- [x] Frontend with all routing
- [x] MongoDB connection
- [x] Authentication module (ready)
- [x] File upload system (ready)
- [x] Hot reload development mode
- [x] Static file serving

### 🏗️ In Progress (Placeholders)
- [ ] Admin panel CRUD forms (next phase)
- [ ] Artwork management UI
- [ ] Music management UI
- [ ] Contact submissions viewer

---

## 🔑 Initial Admin User Setup

### Option 1: Register via API (Recommended)
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@harrisondeller.com",
    "password": "your-secure-password",
    "name": "Admin"
  }'
```

### Option 2: Create in MongoDB (Direct)
```bash
mongosh
use harrisondeller
db.users.insertOne({
  email: "admin@harrisondeller.com",
  password: "$2b$10$HASH_HERE",  // Use bcrypt hash
  name: "Admin",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 🐛 Troubleshooting

### Problem: "Port 3000 already in use"
```bash
# Kill the process
pkill -f "nest start"
# Then restart
cd backend && npm run start:dev
```

### Problem: "Port 4200 already in use"
```bash
# Kill the process
pkill -f "ng serve"
# Then restart
cd frontend && npm start
```

### Problem: "MongoDB connection refused"
```bash
# Start MongoDB
brew services start mongodb-community@8.0
# Verify it's running
brew services list | grep mongodb
```

### Problem: "Frontend build fails"
```bash
# Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Problem: "API returns empty/404"
- Make sure backend is fully started (look for "Nest application successfully started")
- Verify MongoDB has data or check if endpoint is correct
- Test with curl: `curl http://localhost:3000/bodies`

---

## 📝 Common Development Tasks

### Add New Feature
```bash
# Create backend controller
cd backend/src
nest g module features/my-feature
nest g controller features/my-feature
nest g service features/my-feature

# Create frontend component
cd frontend/src/app/components
ng generate component my-feature
```

### Test Backend
```bash
cd backend

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e
```

### Build for Production
```bash
# Backend
cd backend
npm run build
# Output in: dist/

# Frontend
cd frontend
ng build --configuration production
# Output in: dist/frontend/
```

### Code Formatting
```bash
# Backend
cd backend
npm run format
npm run lint

# Frontend
cd frontend
ng lint
```

---

## 📚 Useful Resources

### Backend (NestJS)
- Docs: https://docs.nestjs.com
- API endpoints defined in: `src/*/controllers`
- Database schemas in: `src/schemas/`

### Frontend (Angular 20)
- Docs: https://angular.dev
- Components in: `src/app/components/`
- Services in: `src/app/services/`
- Models in: `src/app/models/`

### Database (MongoDB)
- Local URL: `mongodb://localhost:27017/harrisondeller`
- Check collections: `mongosh harrisondeller`
- List all dbs: `mongosh --eval "db.adminCommand('listDatabases')"`

---

## 🎓 Development Workflow

### 1. Make Code Changes
**Frontend:**
- Edit `.ts` files in `src/app/`
- Edit `.html` templates
- Edit `.scss` styles
- Changes auto-reload in browser

**Backend:**
- Edit `.ts` files in `src/`
- Changes auto-compile and reload
- May need to restart if import errors

### 2. Test Changes
```bash
# Frontend - Open browser
open http://localhost:4200

# Backend - Test API
curl http://localhost:3000/api-endpoint
```

### 3. Commit & Push
```bash
git add .
git commit -m "Feature: description"
git push origin branch-name
```

---

## 🎊 You're All Set!

Your development environment is now:
- ✅ Configured
- ✅ Tested
- ✅ Ready for coding

**Next Steps:**
1. Start both services (Backend + Frontend)
2. Open http://localhost:4200 in browser
3. Begin implementing admin panel features
4. Set up GitHub Actions (see roadmap item #2)

---

**Happy coding! 🚀**