# Admin Panel - Quick Start (5 min)

## TL;DR Access Admin Panel

```bash
# Terminal 1: Start backend
cd backend && npm run start:dev

# Terminal 2: Start frontend
cd frontend && npm start

# Browser: Visit admin
open http://localhost:4200/admin/login
```

---

## 🔑 Login

**URL:** `http://localhost:4200/admin/login`

**Default Admin User:**
```
Email:    admin@harrisondeller.com
Password: (check your .env file or ask team)
```

After login → redirects to `/admin` dashboard

---

## 🗂️ Main Sections

Click sidebar links to navigate:

### 1. **Bodies of Work**
Create portfolio collections like:
- "Landscapes Series" 
- "Abstract Collection"
- "Portrait Studies"

```
Admin → Bodies of Work → "+ Add Body of Work"
```

### 2. **Artworks** 
Add individual pieces with images:
```
Admin → Artworks → "+ Add Artwork"
1. Select Body of Work
2. Click to upload image
3. Fill details
4. Save
```

### 3. **Music**
Add music/audio links:
```
Admin → Music → "+ Add Music"
1. Add title, artist, album
2. Add Spotify or audio URL (optional)
3. Save
```

### 4. **Contact Submissions**
Monitor contact form messages:
```
Admin → Contact Submissions
- See all submissions
- Click to view & reply
- Unread count shown
```

---

## ⚡ Quick Tasks

### Add a Body of Work
```
1. Click "Bodies of Work" in sidebar
2. Click "+ Add Body of Work" button
3. Enter:
   - Title: "My Collection"
   - Year: 2024
   - Published: ON
4. Click "Create"
✅ Done!
```

### Upload Artwork
```
1. Click "Artworks"
2. Click "+ Add Artwork"
3. Fill:
   - Title: "Sunset Painting"
   - Body: Select from dropdown
   - Click upload box
   - Select image file
   - Wait for upload ⏳
4. Fill optional fields (medium, dimensions, etc.)
5. Click "Create"
✅ Art is now on your site!
```

### Check Contact
```
1. Click "Contact Submissions"
2. See unread submissions (yellow badge)
3. Click "open_in_new" icon
4. Read full message
5. Type reply
6. Click "Send Reply"
✅ Email sent!
```

---

## 🎨 UI Patterns

### Status Badges
- 🟢 **Green** = Published (visible on site)
- 🟡 **Yellow** = Draft (hidden from public)

### Buttons
- **Blue** = Action (Create, Update)
- **Red** = Delete (with confirmation)
- **Accent** = View/Edit

### Icons
- ✏️ **Edit** = Open edit form
- 🗑️ **Delete** = Remove item
- ➕ **Add** = Create new

---

## 📸 Image Upload Tips

### Formats Supported
✅ JPG, PNG, GIF, WebP

### Size Limit
✅ Max 10 MB per image

### How It Works
1. Click upload area (or drag file)
2. Select image from computer
3. Preview shows immediately
4. Upload completes → URL populated
5. Form ready to save

### Troubleshooting
- ❌ File too large? Resize locally first
- ❌ Wrong format? Convert to PNG/JPG
- ❌ Upload stuck? Check network (F12)

---

## 🔄 Common Workflows

### Publish Content
```
1. Edit item (pencil icon)
2. Toggle "Published" switch to ON
3. Click "Update"
✅ Now visible on public site
```

### Reorder Items
```
Edit item → Change "Order" number → Update
Lower numbers = appear first
```

### Delete Content
```
Click trash icon → Confirm → Item removed
⚠️ Cannot undo - make sure!
```

---

## 🔐 Admin Features

### Auto-Protection
- ✅ Only you can access `/admin/*`
- ✅ Login required for all changes
- ✅ Automatic logout if idle too long
- ✅ Each operation logged

### What's Protected
- Create new content ← Login required
- Edit existing ← Login required  
- Delete items ← Login required
- Upload images ← Login required

### What's Public
- View gallery
- Read artworks
- Play music
- Submit contact form

---

## 🐛 Troubleshooting

### "Login Failed"
```
✓ Check email spelling
✓ Check password (case-sensitive)
✓ Make sure backend is running
✓ Check console (F12 → Network tab)
```

### "Can't Upload Image"
```
✓ Image smaller than 10MB?
✓ Format is JPG/PNG/GIF/WebP?
✓ Backend running?
✓ /backend/uploads/images/ folder exists?
```

### "Form Won't Save"
```
✓ All required fields filled? (marked with *)
✓ Backend running?
✓ Network connected?
✓ Check browser console (F12)
```

### "Table Won't Reload"
```
✓ Click "Refresh" button (contacts section)
✓ Press F5 to reload page
✓ Backend logs - any errors?
```

---

## 📊 What Gets Saved

### On Your Computer (Frontend)
- Login token (localStorage)
- UI state (temporary)

### On Your Server (Backend)
- All content data (MongoDB)
- All uploaded images (/uploads/images/)
- Timestamps & metadata

### Recovery
- MongoDB backups (set up separately)
- Images in /backend/uploads/ folder
- Git history (code changes)

---

## ⚙️ Technical Details

### For Developers

**Local URLs:**
- Admin UI: `http://localhost:4200/admin`
- Backend API: `http://localhost:3000`
- Image uploads: `http://localhost:3000/uploads/images/[filename]`

**API Endpoints Used:**
```
POST   /bodies              Create body
PATCH  /bodies/:id          Update body
DELETE /bodies/:id          Delete body

POST   /artworks            Create artwork
PATCH  /artworks/:id        Update artwork
DELETE /artworks/:id        Delete artwork

POST   /music               Create music
PATCH  /music/:id           Update music
DELETE /music/:id           Delete music

GET    /contact             Get submissions
PATCH  /contact/:id/read    Mark as read
DELETE /contact/:id         Delete submission

POST   /upload/image        Upload file
```

**Form Validation:**
- All required fields must be filled
- Image upload validates file type
- Email/URL fields check format
- Numbers must be valid numbers

---

## ✨ Pro Tips

1. **Use Tab to navigate forms** - Faster than mouse
2. **Click outside dialog to cancel** - No need for cancel button
3. **Refresh button in Contacts** - Updates unread count
4. **Green/Yellow badges** - Quick published status check
5. **Sort by newest first** - Contacts always sort by date
6. **Copy email button** - In contact detail view
7. **Preview before save** - Image shows before upload

---

## 🚀 Ready?

```
✅ Backend running?    npm run start:dev
✅ Frontend running?   npm start
✅ Browser at admin?   localhost:4200/admin/login
✅ Logged in?          You should be!

→ Start adding content!
```

---

**Got questions?** See `ADMIN_PANEL_GUIDE.md` for detailed docs.