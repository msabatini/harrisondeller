# Harrison Deller - Artist & Musician Portfolio

A full-stack MEAN application showcasing Harrison Deller's artwork and music. Built with MongoDB, NestJS, Angular, and Node.js.

## Project Structure

```
harrisondeller/
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── auth/           # JWT authentication
│   │   ├── artworks/       # Artwork management
│   │   ├── bodies/         # Bodies of work
│   │   ├── music/          # Music entries
│   │   ├── contact/        # Contact form handling
│   │   ├── upload/         # File upload handling
│   │   ├── schemas/        # MongoDB schemas
│   │   └── common/         # Guards, decorators
│   ├── uploads/images/     # Uploaded artwork images
│   └── .env               # Environment variables
│
└── frontend/         # Angular application
    └── src/
        └── app/
            ├── components/     # UI components
            │   ├── home/
            │   ├── gallery/
            │   ├── about/
            │   ├── music/
            │   ├── contact/
            │   └── admin/      # Admin panel
            ├── services/       # API services
            ├── models/         # TypeScript interfaces
            ├── guards/         # Route guards
            └── interceptors/   # HTTP interceptors
```

## Features

### Public Features
- **Home Page**: Landing page with artist introduction
- **Gallery**: Browse artworks organized by bodies of work
- **About**: Artist biography and statement
- **Music**: Spotify integration for music playback
- **Contact**: Contact form with email notifications

### Admin Features
- **Authentication**: Secure JWT-based login
- **Bodies of Work Management**: Create and manage artwork collections
- **Artwork Management**: Upload and organize paintings
- **Music Management**: Add Spotify links and metadata
- **Contact Submissions**: View and manage inquiries

## Technology Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **Multer**: File upload handling
- **Nodemailer**: Email service for contact form
- **bcrypt**: Password hashing

### Frontend
- **Angular 19**: Modern web framework
- **RxJS**: Reactive programming
- **Angular Material**: UI component library
- **SCSS**: Styling

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Edit `backend/.env` with your settings:
   ```env
   MONGODB_URI=mongodb://localhost:27017/harrisondeller
   JWT_SECRET=your-secret-key-change-this-in-production
   JWT_EXPIRATION=7d
   
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=noreply@harrisondeller.com
   CONTACT_EMAIL=harrison@example.com
   
   PORT=3000
   ```

4. **Start MongoDB**:
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the backend**:
   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend**:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4200`

## Creating the First Admin User

You'll need to create an admin user directly in MongoDB:

```javascript
// Connect to MongoDB
use harrisondeller

// Create admin user (password will be hashed by the API)
// You can use the register endpoint or create directly:
db.users.insertOne({
  email: "admin@harrisondeller.com",
  password: "$2b$10$...", // Use bcrypt to hash your password
  name: "Admin",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the register endpoint once, then disable it in production:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@harrisondeller.com",
    "password": "your-secure-password",
    "name": "Admin"
  }'
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login

### Bodies of Work
- `GET /bodies` - Get all published bodies
- `GET /bodies/admin` - Get all bodies (admin)
- `GET /bodies/:id` - Get single body
- `POST /bodies` - Create body (admin)
- `PATCH /bodies/:id` - Update body (admin)
- `DELETE /bodies/:id` - Delete body (admin)

### Artworks
- `GET /artworks` - Get all published artworks
- `GET /artworks?bodyId=:id` - Get artworks by body
- `GET /artworks/admin` - Get all artworks (admin)
- `GET /artworks/:id` - Get single artwork
- `POST /artworks` - Create artwork (admin)
- `PATCH /artworks/:id` - Update artwork (admin)
- `DELETE /artworks/:id` - Delete artwork (admin)

### Music
- `GET /music` - Get all published music
- `GET /music/admin` - Get all music (admin)
- `GET /music/:id` - Get single music entry
- `POST /music` - Create music entry (admin)
- `PATCH /music/:id` - Update music entry (admin)
- `DELETE /music/:id` - Delete music entry (admin)

### Contact
- `POST /contact` - Submit contact form
- `GET /contact` - Get all submissions (admin)
- `PATCH /contact/:id/read` - Mark as read (admin)
- `DELETE /contact/:id` - Delete submission (admin)

### Upload
- `POST /upload/image` - Upload image file (admin)

## Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `SMTP_PASSWORD`

## Deployment Considerations

### Backend
- Set strong `JWT_SECRET` in production
- Use environment-specific `.env` files
- Configure MongoDB Atlas for cloud database
- Set up proper CORS origins
- Enable HTTPS
- Consider using a cloud storage service (AWS S3, Cloudinary) for images

### Frontend
- Update `environment.prod.ts` with production API URL
- Build for production: `ng build --configuration production`
- Deploy to hosting service (Netlify, Vercel, AWS S3)

## Next Steps

### Admin Panel Enhancement
The admin CRUD components are currently placeholders. To complete them:

1. **Bodies Management**: Implement full CRUD with forms
2. **Artworks Management**: Add image upload integration
3. **Music Management**: Create forms for Spotify URLs
4. **Contacts Management**: Display submissions in a table

### Additional Features
- Image optimization and thumbnails
- Pagination for large collections
- Search functionality
- Social media integration
- Analytics
- SEO optimization
- Progressive Web App (PWA) features

## Development Commands

### Backend
```bash
npm run start          # Start in production mode
npm run start:dev      # Start in development mode
npm run start:debug    # Start in debug mode
npm run build          # Build the project
npm run lint           # Lint the code
```

### Frontend
```bash
npm start              # Start development server
npm run build          # Build for production
npm run watch          # Build and watch for changes
npm test               # Run unit tests
npm run lint           # Lint the code
```

## License

Copyright © 2025 Harrison Deller Art. All rights reserved.

## Support

For questions or issues, please contact through the website's contact form.
