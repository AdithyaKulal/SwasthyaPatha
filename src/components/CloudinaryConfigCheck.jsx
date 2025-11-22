import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'

function CloudinaryConfigCheck() {
  const [configStatus, setConfigStatus] = useState({ isValid: true, message: '' })

  useEffect(() => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      setConfigStatus({
        isValid: false,
        message: `Cloudinary not configured. Please add to .env file:
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name

Then restart your dev server.`,
      })
    } else {
      setConfigStatus({
        isValid: true,
        message: `Cloudinary configured: ${cloudName} | Preset: ${uploadPreset}`,
      })
    }
  }, [])

  if (configStatus.isValid) return null

  return (
    <div className="mb-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 text-yellow-600" size={20} />
        <div className="flex-1">
          <p className="font-semibold text-yellow-800">Configuration Required</p>
          <p className="mt-1 whitespace-pre-line text-sm text-yellow-700">{configStatus.message}</p>
          <p className="mt-2 text-xs text-yellow-600">
            See CLOUDINARY_SETUP.md for detailed instructions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CloudinaryConfigCheck

