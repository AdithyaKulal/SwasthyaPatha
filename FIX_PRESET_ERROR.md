# Fix "Upload preset not found" Error

## Quick Fix Steps

### Step 1: Find Your Upload Preset Name in Cloudinary

1. Go to [Cloudinary Dashboard](https://console.cloudinary.com)
2. Click **Settings** (gear icon) in the top right
3. Go to **Upload** tab
4. Click **Upload presets** in the left sidebar
5. You'll see a list of your presets
6. **Copy the exact preset name** (it's case-sensitive!)

### Step 2: Update Your .env File

Open your `.env` file in the `health-dashboard` folder and update:

```env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=exact-preset-name-here
```

**Important:**
- The preset name must match **exactly** (including capitalization)
- No spaces or extra characters
- If your preset is named `health_records`, use `health_records` (not `health-records`)

### Step 3: Create Upload Preset (If You Don't Have One)

If you don't have an upload preset yet:

1. In Cloudinary Dashboard → **Settings** → **Upload** → **Upload presets**
2. Click **Add upload preset**
3. **Preset name**: Enter a name (e.g., `health-records-unsigned`)
   - **Remember this name exactly!**
4. **Signing mode**: Select **Unsigned** (very important!)
5. **Folder**: Optional (e.g., `health-records`)
6. **Allowed formats**: Select formats or "All formats"
7. **Max file size**: Set to 10MB or higher
8. Click **Save**

### Step 4: Restart Dev Server

After updating `.env`:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 5: Verify

1. Check the Records page - you should see: "Cloudinary configured: [your-cloud-name] | Preset: [your-preset-name]"
2. Try uploading a file
3. Check browser console (F12) - it will show the preset name being used

## Common Mistakes

❌ **Wrong**: Preset name has different capitalization
```env
VITE_CLOUDINARY_UPLOAD_PRESET=Health-Records  # Wrong if preset is "health-records"
```

✅ **Correct**: Exact match
```env
VITE_CLOUDINARY_UPLOAD_PRESET=health-records  # Matches exactly
```

❌ **Wrong**: Preset is set to "Signed" instead of "Unsigned"
- Solution: Edit preset and change to "Unsigned"

❌ **Wrong**: Using API secret instead of preset name
- Solution: Use the preset **name**, not the API secret

## Still Getting Error?

1. **Double-check preset name** in Cloudinary dashboard
2. **Verify preset is "Unsigned"** (not "Signed")
3. **Check browser console** - it shows the preset name being used
4. **Restart dev server** after changing .env
5. **Clear browser cache** and try again

## Example Working Configuration

```env
# In .env file
VITE_CLOUDINARY_CLOUD_NAME=demo
VITE_CLOUDINARY_UPLOAD_PRESET=ml_default
```

The preset name `ml_default` is Cloudinary's default preset. You can use this for testing, but create your own for production.

