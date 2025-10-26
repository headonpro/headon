'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, Image as ImageIcon, File } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface FileUploadZoneProps {
  onFilesChange: (files: File[]) => void
}

export default function FileUploadZone({ onFilesChange }: FileUploadZoneProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, 5) // Max 5 files
      setFiles(newFiles)
      onFilesChange(newFiles)
    },
    [files, onFilesChange]
  )

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 10485760, // 10MB
    multiple: true,
  })

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
    if (file.type.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB'
    return Math.round((bytes / 1048576) * 10) / 10 + ' MB'
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 scale-105'
            : 'hover:border-primary-400 border-gray-300 hover:bg-gray-50'
        } `}
      >
        <input {...getInputProps()} />

        <motion.div
          animate={{
            y: isDragActive ? -5 : 0,
            scale: isDragActive ? 1.1 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Upload
            className={`mx-auto mb-2 h-8 w-8 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`}
          />
        </motion.div>

        <p className="mb-1 text-sm text-gray-600">
          {isDragActive
            ? 'Lassen Sie die Dateien hier fallen...'
            : 'Briefing, Wireframes oder Inspiration hochladen (optional)'}
        </p>
        <p className="text-xs text-gray-500">Max 10MB - PDF, DOC, PNG, JPG</p>
        <p className="mt-2 text-xs text-gray-400">Klicken oder Drag & Drop</p>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-gray-700">
              Hochgeladene Dateien ({files.length}/5):
            </p>
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  {getFileIcon(file)}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {files.length >= 5 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-amber-600"
        >
          Maximale Anzahl an Dateien erreicht (5 Dateien)
        </motion.p>
      )}
    </div>
  )
}
