import React, { useState } from 'react';
import { GalleryPhoto } from '../types';
import { GALLERY_PHOTOS } from '../data/mockData';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Sparkles, Filter, Calendar } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (selectedCategory === 'todos') return true;
    return photo.category === selectedCategory;
  });

  const handleOpenLightbox = (photoId: string) => {
    const index = filteredPhotos.findIndex((p) => p.id === photoId);
    if (index !== -1) setActivePhotoIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="galeria" className="py-14 sm:py-20 bg-slate-950/75 backdrop-blur-[2px] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            Registros Históricos
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Galeria de <span className="text-emerald-400">Fotos Exclusivas</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            A essência do nosso clássico em imagens: lances emocionantes no gramado, a alegria da resenha, a fumaça da churrasqueira e a celebração da amizade.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'todos', label: 'Todas as Fotos' },
            { id: 'campo', label: '⚽ No Gramado' },
            { id: 'churrasco', label: '🥩 Churrasco & Grelha' },
            { id: 'resenha', label: '🍻 Resenha & Samba' },
            { id: 'trofeu', label: '🏆 Troféus & Festa' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(photo.id)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer shadow-xl"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Year badge */}
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-700 text-[10px] font-bold text-amber-300">
                {photo.year}
              </span>

              {/* Bottom text */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="font-display font-bold text-sm sm:text-base text-white truncate group-hover:text-emerald-300 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            onClick={() => setActivePhotoIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Foto Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Próxima Foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="max-h-[68vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="max-h-[68vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Info Bottom */}
              <div className="p-5 bg-slate-900 border-t border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    Edição {activePhoto.year}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activePhotoIndex !== null ? activePhotoIndex + 1 : 0} de {filteredPhotos.length} fotos
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">{activePhoto.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{activePhoto.description}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
