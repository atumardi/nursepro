
import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: 'true' | 'false';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ slot, format = 'auto', responsive = 'true', className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: number;
    
    const initializeAd = () => {
      try {
        // Ensure the script is available and the container has a width
        if (typeof window !== 'undefined' && (window as any).adsbygoogle && adRef.current && adRef.current.offsetWidth > 0) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } else if (adRef.current && adRef.current.offsetWidth === 0) {
          // If width is still 0 (e.g., inside an animating or hidden parent), try again shortly
          timer = window.setTimeout(initializeAd, 500);
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    };

    // Delay initial call slightly to allow React and browser layout to settle
    timer = window.setTimeout(initializeAd, 300);

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [slot]); // Re-run if slot changes

  return (
    <div className={`w-full my-8 text-center space-y-2 ${className}`}>
      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block">ADVERTISEMENT</span>
      <div 
        ref={adRef} 
        className="ad-container bg-slate-100/50 rounded-xl border border-dashed border-slate-200 p-2 w-full"
      >
        <ins className="adsbygoogle"
             style={{ display: 'block', minWidth: '250px', minHeight: '100px' }}
             data-ad-client="ca-pub-2683459350838265"
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive={responsive}></ins>
      </div>
    </div>
  );
};

export default AdBanner;
