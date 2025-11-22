import { useState, useEffect } from 'react'
import { FileText, Image as ImageIcon, File, ExternalLink, Trash2, Download, Search, Filter } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import DashboardLayout from '../components/DashboardLayout'
import Button from '../components/Button'
import CloudinaryUpload from '../components/CloudinaryUpload'
import CloudinaryConfigCheck from '../components/CloudinaryConfigCheck'
import { getCloudinaryUrl } from '../utils/cloudinary'

// Load files from localStorage (temporary until backend is ready)
const loadFilesFromStorage = (userId) => {
  if (!userId) return []
  try {
    const stored = localStorage.getItem(`health-records-${userId}`)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Save files to localStorage (temporary until backend is ready)
const saveFilesToStorage = (userId, files) => {
  if (!userId) return
  try {
    localStorage.setItem(`health-records-${userId}`, JSON.stringify(files))
  } catch (error) {
    console.error('Failed to save files to storage:', error)
  }
}

function Records() {
  const { user, isLoaded } = useUser()
  const [files, setFiles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(null)

  // Load files on mount
  useEffect(() => {
    if (isLoaded && user?.id) {
      const storedFiles = loadFilesFromStorage(user.id)
      if (storedFiles.length > 0) {
        setFiles(storedFiles)
      } else {
        // Sample files for demo
        setFiles([
          {
            id: '1',
            name: 'Lab Report - Feb.pdf',
            type: 'Lab',
            added: '2 days ago',
            secureUrl: null,
            publicId: null,
            format: 'pdf',
          },
          {
            id: '2',
            name: 'Prescription - Dr. Rao.png',
            type: 'Rx',
            added: '1 week ago',
            secureUrl: null,
            publicId: null,
            format: 'png',
          },
        ])
      }
    }
  }, [isLoaded, user?.id])

  // Save files to localStorage whenever files change
  useEffect(() => {
    if (user?.id && files.length > 0) {
      saveFilesToStorage(user.id, files)
    }
  }, [files, user?.id])

  const handleUploadSuccess = (uploadResult) => {
    const newFile = {
      id: Date.now().toString(),
      name: uploadResult.file.name,
      type: getFileType(uploadResult.file.name),
      added: 'Just now',
      secureUrl: uploadResult.secureUrl,
      publicId: uploadResult.publicId,
      format: uploadResult.format || uploadResult.file.type.split('/')[1],
      bytes: uploadResult.bytes,
      createdAt: uploadResult.createdAt || new Date().toISOString(),
    }
    setFiles((prev) => [newFile, ...prev])
    setUploadSuccess(`Successfully uploaded ${uploadResult.file.name}`)
    setUploadError(null)
    // Clear success message after 3 seconds
    setTimeout(() => setUploadSuccess(null), 3000)
  }

  const handleUploadError = (error) => {
    console.error('Upload error:', error)
    setUploadError(error.error || 'Failed to upload file. Please try again.')
    setUploadSuccess(null)
    // Clear error message after 5 seconds
    setTimeout(() => setUploadError(null), 5000)
  }

  const getFileType = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['pdf', 'doc', 'docx'].includes(ext)) return 'Document'
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'Image'
    if (['xls', 'xlsx'].includes(ext)) return 'Lab'
    return 'Record'
  }

  const getFileIcon = (file) => {
    if (file.format && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(file.format.toLowerCase())) {
      return ImageIcon
    }
    return FileText
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const handleDelete = (fileId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setFiles((prev) => prev.filter((file) => file.id !== fileId))
    }
  }

  const handleView = (file) => {
    if (file.secureUrl) {
      window.open(file.secureUrl, '_blank')
    } else if (file.publicId) {
      const url = getCloudinaryUrl(file.publicId)
      if (url) window.open(url, '_blank')
    }
  }

  const handleDownload = (file) => {
    if (file.secureUrl) {
      const link = document.createElement('a')
      link.href = file.secureUrl
      link.download = file.name
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Filter files based on search and type
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || file.type.toLowerCase() === filterType.toLowerCase()
    return matchesSearch && matchesType
  })

  const fileTypes = ['all', ...new Set(files.map((f) => f.type))]

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <DashboardLayout
        title="Medical Records"
        subtitle="Upload, view, and organize prescriptions, scans, and files securely with Cloudinary."
      >
        {/* Configuration Check */}
        <CloudinaryConfigCheck />

        {/* Upload Messages */}
        {uploadError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="font-semibold">Upload Failed</p>
            <p className="text-sm">{uploadError}</p>
          </div>
        )}
        {uploadSuccess && (
          <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
            <p className="font-semibold">Success!</p>
            <p className="text-sm">{uploadSuccess}</p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <CloudinaryUpload
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            maxFiles={5}
            acceptedTypes="image/*,application/pdf,.doc,.docx"
            folder="health-records"
          />

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Your Records</h3>
              <span className="text-sm text-slate-500">
                {filteredFiles.length} of {files.length} documents
              </span>
            </div>

            {/* Search and Filter */}
            {files.length > 0 && (
              <div className="mb-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Filter className="text-slate-400" size={16} />
                  {fileTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        filterType === type
                          ? 'bg-brand-primary text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {files.length === 0 ? (
              <div className="py-12 text-center">
                <FileText className="mx-auto text-slate-300" size={48} />
                <p className="mt-4 text-slate-500">No records uploaded yet</p>
                <p className="mt-1 text-sm text-slate-400">Upload your first medical record to get started</p>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="py-12 text-center">
                <Search className="mx-auto text-slate-300" size={48} />
                <p className="mt-4 text-slate-500">No records match your search</p>
                <p className="mt-1 text-sm text-slate-400">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFiles.map((file) => {
                  const FileIcon = getFileIcon(file)
                  const isImage = file.format && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(file.format.toLowerCase())
                  
                  return (
                    <div
                      key={file.id}
                      className="group rounded-2xl border border-slate-100 p-4 transition-all hover:border-brand-primary/30 hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        {/* Thumbnail or Icon */}
                        {isImage && (file.secureUrl || file.publicId) ? (
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                            <img
                              src={
                                file.publicId
                                  ? getCloudinaryUrl(file.publicId, { width: 64, height: 64, crop: 'fill' })
                                  : file.secureUrl
                              }
                              alt={file.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                if (e.target.nextSibling) {
                                  e.target.nextSibling.style.display = 'flex'
                                }
                              }}
                            />
                            <div className="hidden h-full w-full items-center justify-center bg-slate-100">
                              <ImageIcon className="text-slate-400" size={24} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100">
                            <FileIcon className="text-brand-primary" size={24} />
                          </div>
                        )}

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-semibold text-slate-800">{file.name}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-1">{file.type}</span>
                            {file.bytes && <span>{formatFileSize(file.bytes)}</span>}
                            <span>•</span>
                            <span>{formatDate(file.createdAt || file.added)}</span>
                            {file.secureUrl && (
                              <>
                                <span>•</span>
                                <span className="text-green-600">✓ Uploaded</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {(file.secureUrl || file.publicId) && (
                            <>
                              <Button
                                variant="secondary"
                                onClick={() => handleView(file)}
                                className="flex items-center gap-1"
                              >
                                <ExternalLink size={16} />
                                View
                              </Button>
                              <button
                                onClick={() => handleDownload(file)}
                                className="rounded-2xl p-2 text-slate-400 transition-colors hover:bg-brand-light hover:text-brand-primary"
                                aria-label="Download file"
                                title="Download"
                              >
                                <Download size={16} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="rounded-2xl p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                            aria-label="Delete file"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Records

