'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, Loader2, X, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ProfilePictureUploadProps {
    userId: string
    currentAvatarUrl: string | null
    username: string
}

export default function ProfilePictureUpload({ userId, currentAvatarUrl, username }: ProfilePictureUploadProps) {
    const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl)
    const [uploading, setUploading] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const file = event.target.files?.[0]

        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            return
        }

        // Validate file size (500KB = 512000 bytes)
        if (file.size > 512000) {
            setError('Image must be less than 500KB')
            return
        }

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewImage(reader.result as string)
            setSelectedFile(file)
        }
        reader.readAsDataURL(file)
    }

    const cancelUpload = () => {
        setPreviewImage(null)
        setSelectedFile(null)
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const uploadAvatar = async () => {
        if (!selectedFile) return

        try {
            setUploading(true)
            setError(null)

            const fileExt = selectedFile.name.split('.').pop()
            const fileName = `${userId}-${Date.now()}.${fileExt}`

            // Upload image to Supabase Storage (DP bucket)
            const { error: uploadError } = await supabase.storage
                .from('DP')
                .upload(fileName, selectedFile, {
                    cacheControl: '3600',
                    upsert: true
                })

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('DP')
                .getPublicUrl(fileName)

            // Update user profile
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', userId)

            if (updateError) throw updateError

            // Update local state
            setAvatarUrl(publicUrl)
            setPreviewImage(null)
            setSelectedFile(null)

            // Reload page to show new avatar
            window.location.reload()
        } catch (error: any) {
            console.error('Error uploading avatar:', error)
            setError(error.message || 'Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="relative">
            {/* Preview Modal */}
            {previewImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="glass rounded-2xl p-6 max-w-md w-full border border-[#ffd700]/20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Preview Profile Picture</h3>
                            <button
                                onClick={cancelUpload}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                disabled={uploading}
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Preview Image */}
                        <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#ffd700]">
                            <Image
                                src={previewImage}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="text-center text-sm text-gray-400 mb-4">
                            <p>File size: {selectedFile ? (selectedFile.size / 1024).toFixed(1) : 0}KB / 500KB</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={cancelUpload}
                                className="flex-1 px-4 py-3 rounded-lg glass border border-white/10 hover:bg-white/10 transition-colors text-white font-medium"
                                disabled={uploading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={uploadAvatar}
                                disabled={uploading}
                                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold hover:shadow-glow-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Upload
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Avatar Display */}
            <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#ff9500] to-[#ffd700] p-1">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={username}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-4xl font-bold text-gray-500">
                                {username[0]?.toUpperCase() || 'U'}
                            </div>
                        )}

                        {/* Upload Overlay */}
                        <label
                            htmlFor="avatar-upload"
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer"
                        >
                            <Upload className="w-8 h-8 text-white mb-2" />
                            <span className="text-white text-sm font-medium">Change Photo</span>
                            <span className="text-gray-400 text-xs mt-1">Max 500KB</span>
                        </label>
                        <input
                            ref={fileInputRef}
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
