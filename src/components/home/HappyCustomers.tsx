'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const leftImages = [
  { src: '/dealership/happy-1.jpg', alt: 'Happy customer with new car' },
  { src: '/dealership/happy-3.jpg', alt: 'Couple collecting their new Suzuki' },
  { src: '/dealership/happy-5.jpg', alt: 'Couple with new Isuzu work vehicle' },
  { src: '/dealership/happy-7.jpg', alt: 'BMW handover at Trade Wheels' },
];

const rightImages = [
  { src: '/dealership/happy-2.jpg', alt: 'Family collecting their new Ford' },
  { src: '/dealership/happy-4.jpg', alt: 'Father and son with new Ford Ranger' },
  { src: '/dealership/happy-6.jpg', alt: 'Family with sunflowers at delivery' },
  { src: '/dealership/happy-8.jpg', alt: 'Customer with new Mercedes C-Class' },
];

function FadingImage({ images, interval }: { images: typeof leftImages; interval: number }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const advance = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
      setFading(false);
    }, 500);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [advance, interval]);

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
      <Image
        src={images[current].src}
        alt={images[current].alt}
        fill
        className={`object-cover transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, j) => (
              <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-white/80 text-sm font-medium">Another happy customer!</span>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-5 right-5 flex gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HappyCustomers() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-1">Real People, Real Deals</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Happy Customers</h2>
        <p className="text-text-muted mt-2 max-w-md mx-auto">
          Nothing beats the feeling of driving away in your new car. Here are some of our recent handovers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FadingImage images={leftImages} interval={3500} />
        <FadingImage images={rightImages} interval={3500} />
      </div>
    </section>
  );
}
