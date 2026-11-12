import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryPillsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center py-3 bg-[#0b0c10]/95 backdrop-blur-sm sticky top-16 z-30 px-4 md:px-6">
      {/* Left Scroll Arrow */}
      <button
        onClick={() => scroll('left')}
        aria-label="Gulir ke kiri"
        className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-[#181a26]/90 text-gray-300 hover:bg-white/10 hover:text-white transition-colors mr-2 shrink-0 border border-gray-800"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Pills Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400'
                  : 'bg-[#181b29] text-gray-300 hover:bg-[#252a40] hover:text-white border border-gray-800/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Right Scroll Arrow */}
      <button
        onClick={() => scroll('right')}
        aria-label="Gulir ke kanan"
        className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-[#181a26]/90 text-gray-300 hover:bg-white/10 hover:text-white transition-colors ml-2 shrink-0 border border-gray-800"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
