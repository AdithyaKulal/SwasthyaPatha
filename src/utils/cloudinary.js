// Cloudinary configuration utility
export const getCloudinaryConfig = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName) {
    throw new Error('Missing VITE_CLOUDINARY_CLOUD_NAME in environment variables')
  }

  if (!uploadPreset) {
    throw new Error('Missing VITE_CLOUDINARY_UPLOAD_PRESET in environment variables')
  }

  return {
    cloudName,
    uploadPreset,
  }
}

// Generate Cloudinary image URL
export const getCloudinaryUrl = (publicId, options = {}) => {
  if (!publicId) return null
  
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  if (!cloudName) return null
  
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options

  let url = `https://res.cloudinary.com/${cloudName}/image/upload`
  
  if (width || height || crop) {
    const transformations = []
    if (width) transformations.push(`w_${width}`)
    if (height) transformations.push(`h_${height}`)
    if (crop) transformations.push(`c_${crop}`)
    if (quality) transformations.push(`q_${quality}`)
    if (format) transformations.push(`f_${format}`)
    url += `/${transformations.join(',')}`
  }
  
  url += `/${publicId}`
  return url
}

// Upload file to Cloudinary using unsigned upload
export const uploadToCloudinary = async (file, folder = 'health-records', userId = null) => {
  try {
    const { cloudName, uploadPreset } = getCloudinaryConfig()
    
    // Validate file
    if (!file || !file.name) {
      throw new Error('Invalid file provided')
    }

    // Determine resource type based on file extension and MIME type
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    const isImage = file.type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileExtension || '')
    const isVideo = file.type.startsWith('video/') || ['mp4', 'webm', 'mov'].includes(fileExtension || '')
    const resourceType = isImage ? 'image' : isVideo ? 'video' : 'raw'
    
    // Create user-specific folder if userId is provided
    const uploadFolder = userId ? `${folder}/${userId}` : folder
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    
    // Only add folder if it's not empty
    if (uploadFolder) {
      formData.append('folder', uploadFolder)
    }
    
    // Add tags for better organization
    if (userId) {
      formData.append('tags', `user-${userId},medical-record`)
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
    
    console.log('Uploading to Cloudinary:', {
      cloudName,
      uploadPreset,
      resourceType,
      folder: uploadFolder,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    })

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })

    // Get response text first to see what error we're getting
    const responseText = await response.text()
    
    if (!response.ok) {
      let errorMessage = `Upload failed: ${response.status} ${response.statusText}`
      try {
        const errorData = JSON.parse(responseText)
        errorMessage = errorData.error?.message || errorMessage
        
        // Provide specific help for common errors
        if (errorMessage.includes('preset') || errorMessage.includes('Upload preset')) {
          errorMessage = `Upload preset "${uploadPreset}" not found. Please check:
1. The preset name in your .env file matches exactly (case-sensitive)
2. The preset exists in your Cloudinary dashboard
3. Go to Settings → Upload → Upload presets to verify the name`
        }
        
        console.error('Cloudinary error response:', errorData)
        console.error('Using upload preset:', uploadPreset)
        console.error('Using cloud name:', cloudName)
      } catch {
        console.error('Cloudinary error response (text):', responseText)
        errorMessage = responseText || errorMessage
      }
      throw new Error(errorMessage)
    }

    const data = JSON.parse(responseText)
    
    if (!data.public_id) {
      throw new Error('Upload succeeded but no public_id returned')
    }

    console.log('Upload successful:', data.public_id)

    return {
      publicId: data.public_id,
      secureUrl: data.secure_url,
      url: data.url,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height,
      createdAt: data.created_at,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    
    // Provide more helpful error messages
    if (error.message.includes('Missing VITE_CLOUDINARY')) {
      throw new Error('Cloudinary not configured. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file')
    }
    
    if (error.message.includes('Invalid upload preset')) {
      throw new Error('Invalid upload preset. Please check your VITE_CLOUDINARY_UPLOAD_PRESET in .env file')
    }
    
    throw error
  }
}

