'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  Upload,
  X,
  Share2,
  Trash2,
  Grid,
  List,
  Image as ImageIcon,
  Copy,
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string;
  category: 'full_body' | 'close_up' | 'action' | 'competition' | 'other';
  isPublic?: boolean;
  shareToken?: string;
  createdAt?: string;
}

interface GalleryProps {
  photos: GalleryPhoto[];
  horseId: string;
  onUpload?: (file: File, category: string, caption: string) => Promise<void>;
  onDelete?: (photoId: string) => Promise<void>;
  onShare?: (photoId: string) => Promise<string>;
  onCaptionUpdate?: (photoId: string, caption: string) => Promise<void>;
  readOnly?: boolean;
  maxPhotos?: number;
}

const categoryLabels: Record<string, string> = {
  full_body: '全身照',
  close_up: '特写',
  action: '训练照',
  competition: '比赛照',
  other: '其他',
};

const categoryColors: Record<string, string> = {
  full_body: 'bg-blue-500/20 text-blue-400',
  close_up: 'bg-purple-500/20 text-purple-400',
  action: 'bg-green-500/20 text-green-400',
  competition: 'bg-amber-500/20 text-amber-400',
  other: 'bg-gray-500/20 text-gray-400',
};

export default function Gallery({
  photos: initialPhotos,
  horseId,
  onUpload,
  onDelete,
  onShare,
  onCaptionUpdate,
  readOnly = false,
  maxPhotos = 50,
}: GalleryProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionText, setCaptionText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPhotos = filterCategory === 'all'
    ? photos
    : photos.filter(p => p.category === filterCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onUpload) {
      for (const file of files) {
        await handleUpload(file);
      }
    }
  };

  const handleUpload = async (file: File) => {
    if (!onUpload || uploading) return;
    setUploading(true);
    try {
      await onUpload(file, 'other', '');
      setPhotos(prev => [...prev, {
        id: Date.now().toString(),
        url: URL.createObjectURL(file),
        category: 'other',
      }]);
    } finally {
      setUploading(false);
      setUploadModalOpen(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0 && onUpload) {
      for (const file of files) {
        await handleUpload(file);
      }
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!onDelete) return;
    await onDelete(photoId);
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const handleShare = async (photoId: string) => {
    if (!onShare) return;
    const shareUrl = await onShare(photoId);
    await navigator.clipboard.writeText(shareUrl);
    setCopiedId(photoId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCaptionSave = async (photoId: string) => {
    if (!onCaptionUpdate) return;
    await onCaptionUpdate(photoId, captionText);
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, caption: captionText } : p));
    setEditingCaption(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const categories = ['all', 'full_body', 'close_up', 'action', 'competition', 'other'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Filter by category */}
          <div className="flex gap-1 bg-background-elevated rounded-lg p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-md transition-colors',
                  filterCategory === cat
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {cat === 'all' ? '全部' : categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex bg-background-elevated rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-accent text-white' : 'text-text-secondary'
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-accent text-white' : 'text-text-secondary'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Upload button */}
          {!readOnly && (
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setUploadModalOpen(true)}
              disabled={photos.length >= maxPhotos}
            >
              <Upload className="w-4 h-4 mr-1" />
              上传照片
            </Button>
          )}
        </div>
      </div>

      {/* Photo count */}
      <p className="text-sm text-text-secondary">
        {filteredPhotos.length} 张照片
        {photos.length !== filteredPhotos.length && ` (共 ${photos.length} 张)`}
      </p>

      {/* Photo grid */}
      {filteredPhotos.length === 0 ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-2xl p-12 text-center',
            !readOnly && 'cursor-pointer hover:border-accent hover:bg-accent/5'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !readOnly && setUploadModalOpen(true)}
        >
          <ImageIcon className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-primary font-medium mb-1">暂无照片</p>
          <p className="text-sm text-text-secondary">拖拽图片到此处或点击上传</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border-2 border-transparent rounded-2xl p-2 transition-colors',
            dragging && 'border-accent bg-accent/5'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group aspect-square rounded-xl overflow-hidden bg-background-elevated"
            >
              <img
                src={photo.url}
                alt={photo.caption || 'Horse photo'}
                className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
                onClick={() => openLightbox(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className={cn('text-xs px-2 py-0.5 rounded-full', categoryColors[photo.category])}>
                    {categoryLabels[photo.category]}
                  </span>
                  {photo.caption && (
                    <p className="text-white text-sm mt-1 truncate">{photo.caption}</p>
                  )}
                </div>
                {!readOnly && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleShare(photo.id); }}
                      className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="分享"
                    >
                      {copiedId === photo.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Share2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(photo.id); }}
                      className="p-1.5 bg-white/20 rounded-full hover:bg-error/80 transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex items-center gap-4 p-3 bg-background-elevated rounded-xl"
            >
              <img
                src={photo.url}
                alt={photo.caption || 'Horse photo'}
                className="w-16 h-16 rounded-lg object-cover cursor-pointer"
                onClick={() => openLightbox(filteredPhotos.indexOf(photo))}
              />
              <div className="flex-1 min-w-0">
                {editingCaption === photo.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={captionText}
                      onChange={(e) => setCaptionText(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-background rounded-lg text-text-primary text-sm"
                      placeholder="添加描述..."
                      autoFocus
                    />
                    <Button size="sm" onClick={() => handleCaptionSave(photo.id)}>
                      保存
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingCaption(null)}>
                      取消
                    </Button>
                  </div>
                ) : (
                  <p
                    className="text-text-primary truncate cursor-pointer hover:text-accent"
                    onClick={() => { setEditingCaption(photo.id); setCaptionText(photo.caption || ''); }}
                  >
                    {photo.caption || '点击添加描述...'}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn('text-xs px-2 py-0.5 rounded-full', categoryColors[photo.category])}>
                    {categoryLabels[photo.category]}
                  </span>
                  {photo.isPublic && (
                    <span className="text-xs text-green-400">已分享</span>
                  )}
                </div>
              </div>
              {!readOnly && (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleShare(photo.id)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                    title="分享"
                  >
                    {copiedId === photo.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Share2 className="w-4 h-4 text-text-secondary" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && filteredPhotos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {filteredPhotos.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          <img
            src={filteredPhotos[currentIndex].url}
            alt={filteredPhotos[currentIndex].caption || 'Horse photo'}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 rounded-full px-4 py-2">
            <span className={cn('text-xs px-2 py-0.5 rounded-full', categoryColors[filteredPhotos[currentIndex].category])}>
              {categoryLabels[filteredPhotos[currentIndex].category]}
            </span>
            {filteredPhotos[currentIndex].caption && (
              <p className="text-white text-sm">{filteredPhotos[currentIndex].caption}</p>
            )}
            <span className="text-white/60 text-sm">
              {currentIndex + 1} / {filteredPhotos.length}
            </span>
            {!readOnly && filteredPhotos[currentIndex].isPublic && (
              <a
                href={`/shared/photo/${filteredPhotos[currentIndex].shareToken}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="上传照片"
      >
        <UploadForm
          onUpload={async (file, category, caption) => {
            if (onUpload) {
              await onUpload(file, category, caption);
              setPhotos(prev => [...prev, {
                id: Date.now().toString(),
                url: URL.createObjectURL(file),
                category: category as GalleryPhoto['category'],
                caption,
              }]);
            }
          }}
          onClose={() => setUploadModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

interface UploadFormProps {
  onUpload: (file: File, category: string, caption: string) => Promise<void>;
  onClose: () => void;
}

function UploadForm({ onUpload, onClose }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('other');
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file, category, caption);
      onClose();
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
          'hover:border-accent hover:bg-accent/5'
        )}
        style={{ borderColor: 'var(--color-border)' }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload-input"
        />
        <label htmlFor="upload-input" className="cursor-pointer">
          {preview ? (
            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
          ) : (
            <>
              <Upload className="w-10 h-10 text-text-muted mx-auto mb-3" />
              <p className="text-text-primary font-medium mb-1">选择图片文件</p>
              <p className="text-sm text-text-secondary">支持 JPG, PNG, GIF 格式</p>
            </>
          )}
        </label>
      </div>

      <div>
        <label className="label">分类</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input w-full"
        >
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">描述 (可选)</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="input w-full"
          placeholder="添加照片描述..."
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onClose}>
          取消
        </Button>
        <Button
          variant="gradient"
          onClick={handleSubmit}
          disabled={!file || uploading}
        >
          {uploading ? '上传中...' : '上传'}
        </Button>
      </div>
    </div>
  );
}
