# Cloudinary Setup Guide

This project uses Cloudinary for secure medical record storage and image management.

## Prerequisites

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name from the Dashboard
3. Create an Upload Preset

## Setup Steps

### 1. Get Your Cloud Name

1. Log in to [Cloudinary Dashboard](https://console.cloudinary.com)
2. Your **Cloud Name** is displayed at the top of the dashboard
3. Example: `your-cloud-name`

### 2. Create an Upload Preset

1. Go to **Settings** → **Upload** → **Upload presets**
2. Click **Add upload preset**
3. Configure:
   - **Preset name**: `health-records-unsigned` (or any name you prefer)
   - **Signing mode**: Select **Unsigned** (for frontend uploads)
   - **Folder**: `health-records` (optional, but recommended)
   - **Allowed formats**: Select formats you want to allow (images, PDFs, etc.)
   - **Max file size**: Set appropriate limit (e.g., 10MB)
4. Click **Save**

### 3. Configure Environment Variables

Create a `.env` file in the `health-dashboard` folder:

```env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=health-records-unsigned
```

**Important**: Replace `your-cloud-name` and `health-records-unsigned` with your actual values.

### 4. Security Best Practices

For production:
- Use **Signed** uploads with backend validation
- Implement file type validation
- Set file size limits
- Use folder organization per user
- Enable Cloudinary's security features

## Features

✅ **Drag & Drop Upload** - Easy file upload interface  
✅ **Image Thumbnails** - Automatic thumbnail generation  
✅ **Multiple File Types** - Supports images, PDFs, documents  
✅ **Progress Tracking** - Real-time upload progress  
✅ **Secure Storage** - Files stored in Cloudinary cloud  
✅ **Optimized Delivery** - Automatic image optimization  

## Usage

The Cloudinary integration is already set up in:
- `src/pages/Records.jsx` - Medical records upload page
- `src/components/CloudinaryUpload.jsx` - Reusable upload component
- `src/utils/cloudinary.js` - Cloudinary utility functions

## Testing

1. Start the dev server: `npm run dev`
2. Navigate to `/records` page
3. Upload a test file
4. Check your Cloudinary Media Library to see uploaded files

## Troubleshooting

**Error: Missing VITE_CLOUDINARY_CLOUD_NAME**
- Make sure your `.env` file exists in the `health-dashboard` folder
- Restart your dev server after adding environment variables

**Upload fails**
- Check that your upload preset is set to **Unsigned**
- Verify file size is within limits
- Check browser console for detailed error messages

**Images not displaying**
- Verify the `publicId` is correctly stored
- Check Cloudinary dashboard to confirm uploads succeeded

