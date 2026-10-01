"use client"

import { useCallback, useEffect, useState } from "react"

import {
  DropzoneUploadFileList,
  fileKey,
  HaloDropzone,
  type QueuedFile,
} from "@/registry/default/ui/halo-dropzone"

export default function HaloDropzoneDemo() {
  const [queue, setQueue] = useState<QueuedFile[]>([])

  const handleFiles = useCallback((files: File[]) => {
    const stamp = Date.now()
    setQueue((prev) => [
      ...prev,
      ...files.map((file, i) => ({
        id: `${fileKey(file)}-${stamp}-${i}`,
        file,
        progress: 0,
        done: false,
      })),
    ])
  }, [])

  const remove = useCallback((id: string) => {
    setQueue((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const hasActiveUploads = queue.some((r) => !r.done)

  useEffect(() => {
    if (!hasActiveUploads) {
      return
    }
    const id = window.setInterval(() => {
      setQueue((prev) =>
        prev.map((row) => {
          if (row.done) {
            return row
          }
          const step = 4 + Math.random() * 9
          const next = Math.min(100, row.progress + step)
          if (next >= 100) {
            return { ...row, progress: 100, done: true }
          }
          return { ...row, progress: next }
        })
      )
    }, 95)
    return () => window.clearInterval(id)
  }, [hasActiveUploads])

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-balance font-semibold text-2xl text-foreground">
            Animated dropzone
          </h2>
          <p className="mt-2 text-pretty text-muted-foreground text-sm">
            Drag in files or use the file picker: images can preview inside the
            zone, and queued files show as rows with progress below.
          </p>
        </div>
        <HaloDropzone
          accept="image/*,application/pdf,text/plain,application/json,text/markdown,.doc,.docx,.xlsx,.ppt,.pptx,.csv"
          formatHint="Try images plus PDF, Office, JSON, MD…"
          multiple
          onFiles={handleFiles}
          showSuccessThumbnails={false}
          successResetMs={4000}
          translucent
        />
        <DropzoneUploadFileList
          className="w-full"
          items={queue}
          onRemove={remove}
        />
      </div>
    </main>
  )
}
