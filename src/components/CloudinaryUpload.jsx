import { useState, useRef } from 'react'
import { Upload, X, Check, Loader2 } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { uploadToCloudinary } from '../utils/cloudinary'
import Button from './Button'

function CloudinaryUpload({ onUploadSuccess, onUploadError, maxFiles = 5, acceptedTypes = '*', folder = 'health-records' }) {
  const { user } = useUser()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (files) => {
    const fileArray = Array.from(files).slice(0, maxFiles)
    
    if (fileArray.length === 0) return

    // Validate files before uploading
    for (const file of fileArray) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        const errorMsg = `${file.name} is too large. Maximum size is 10MB.`
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: { status: 'error', progress: 0, error: errorMsg },
        }))
        if (onUploadError) {
          onUploadError({ file, error: errorMsg })
        }
        continue
      }
    }

    setUploading(true)

    for (const file of fileArray) {
      // Skip if already errored
      if (file.size > 10 * 1024 * 1024) continue

      try {
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: { status: 'uploading', progress: 0 },
        }))

        console.log('Starting upload for:', file.name, 'Size:', file.size, 'Type:', file.type)

        const result = await uploadToCloudinary(file, folder, user?.id)
        
        console.log('Upload successful for:', file.name, result)
        
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: { status: 'success', progress: 100, result },
        }))

        if (onUploadSuccess) {
          onUploadSuccess({
            file,
            ...result,
          })
        }
      } catch (error) {
        console.error('Upload error for', file.name, ':', error)
        
        const errorMessage = error.message || 'Failed to upload file. Please check your Cloudinary configuration.'
        
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: { status: 'error', progress: 0, error: errorMessage },
        }))

        if (onUploadError) {
          onUploadError({ file, error: errorMessage })
        }
      }
    }

    setUploading(false)
    
    // Clear progress after 3 seconds (longer for errors)
    setTimeout(() => {
      setUploadProgress({})
    }, 3000)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files)
    }
  }

  return (
    <div className="space-y-4">
      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed transition-all duration-300 ${
          dragActive
            ? 'border-brand-primary bg-brand-light/50'
            : 'border-brand-primary/20 bg-brand-light/30'
        } ${uploading ? 'pointer-events-none opacity-70' : 'cursor-pointer'} p-10 text-center`}
      >
        <Upload
          className={`transition-colors ${dragActive ? 'text-brand-primary' : 'text-brand-primary/70'}`}
          size={32}
        />
        <div>
          <p className="text-lg font-semibold text-slate-800">
            {uploading ? 'Uploading...' : 'Drop or select files'}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Upload medical records, prescriptions, lab reports, and scans
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Max {maxFiles} files • PDF, Images, Documents
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          className="hidden"
          onChange={handleInputChange}
          disabled={uploading}
        />
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          variant={uploading ? 'secondary' : 'primary'}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={16} />
              Uploading...
            </>
          ) : (
            'Choose files'
          )}
        </Button>
      </label>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3">
                {progress.status === 'uploading' && (
                  <Loader2 className="animate-spin text-brand-primary" size={16} />
                )}
                {progress.status === 'success' && (
                  <Check className="text-green-500" size={16} />
                )}
                {progress.status === 'error' && (
                  <X className="text-red-500" size={16} />
                )}
                <span className="flex-1 truncate text-sm font-medium text-slate-700">
                  {fileName}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                {progress.status === 'success' && 'Uploaded'}
                {progress.status === 'error' && `Error: ${progress.error}`}
                {progress.status === 'uploading' && 'Uploading...'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CloudinaryUpload

