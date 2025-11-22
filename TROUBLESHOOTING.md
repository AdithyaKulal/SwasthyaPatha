# Cloudinary Upload Troubleshooting Guide

If you're having trouble uploading images to Cloudinary, follow these steps:

## Step 1: Check Environment Variables

1. **Create/Check `.env` file** in the `health-dashboard` folder:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name
   ```

2. **Verify the file exists** in the correct location:
   ```
   health-dashboard/
   ├── .env          ← Should be here
   ├── package.json
   └── src/
   ```

3. **Restart your dev server** after adding/updating `.env`:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

## Step 2: Verify Cloudinary Account Setup

### Get Your Cloud Name
1. Go to [Cloudinary Dashboard](https://console.cloudinary.com)
2. Your **Cloud Name** is at the top of the dashboard
3. Copy it exactly (case-sensitive)

### Create Upload Preset
1. Go to **Settings** → **Upload** → **Upload presets**
2. Click **Add upload preset** or edit existing
3. **Critical Settings:**
   - **Preset name**: Copy this exactly (e.g., `health-records-unsigned`)
   - **Signing mode**: Must be **Unsigned** (for frontend uploads)
   - **Folder**: Optional (e.g., `health-records`)
   - **Allowed formats**: Select `All formats` or specific ones
   - **Max file size**: Set to at least 10MB
4. Click **Save**

## Step 3: Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Try uploading a file
4. Look for error messages

### Common Errors:

**"Missing VITE_CLOUDINARY_CLOUD_NAME"**
- Solution: Add `.env` file with correct variable names
- Restart dev server

**"Invalid upload preset"**
- Solution: Check preset name matches exactly (case-sensitive)
- Verify preset is set to **Unsigned**

**"Upload failed: 400 Bad Request"**
- Solution: Check upload preset configuration
- Verify file size is within limits
- Check allowed file formats

**"Upload failed: 401 Unauthorized"**
- Solution: Upload preset must be **Unsigned**
- Check preset name is correct

## Step 4: Test Upload Preset

1. Go to Cloudinary Dashboard → **Media Library**
2. Click **Upload** button
3. Try uploading a test image
4. If this works, your preset is configured correctly

## Step 5: Verify File Requirements

- **File size**: Must be under 10MB (or your preset limit)
- **File types**: Must match allowed formats in preset
- **File name**: Avoid special characters

## Step 6: Debug Mode

The app now includes console logging. Check browser console for:
- Upload URL being used
- File details (name, size, type)
- Cloudinary response
- Error details

## Quick Fix Checklist

- [ ] `.env` file exists in `health-dashboard` folder
- [ ] Environment variables are correct (no typos)
- [ ] Dev server restarted after adding `.env`
- [ ] Cloudinary account is active
- [ ] Upload preset exists and is **Unsigned**
- [ ] Preset name matches `.env` exactly
- [ ] File size is under limit
- [ ] Browser console shows no errors

## Still Not Working?

1. **Check the yellow warning banner** on the Records page - it shows configuration issues
2. **Open browser console** and look for detailed error messages
3. **Verify in Cloudinary Dashboard** that files aren't uploading there either
4. **Test with a small image** (under 1MB) first
5. **Check network tab** in DevTools to see the actual API request/response

## Example Working `.env` File

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=my-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=health-records-unsigned
```

**Important**: Replace with your actual values!

