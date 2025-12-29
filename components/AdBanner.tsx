
import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: 'true' | 'false';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ slot, format = 'auto', responsive = 'true', className = '' }) => {
  useEffect(() => {
    try {
      // Memicu pemuatan iklan oleh adsbygoogle.js
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`my-8 text-center space-y-2 ${className}`}>
      {/* Label transparan sesuai kebijakan AdSense untuk membedakan konten dan iklan */}
      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block">ADVERTISEMENT</span>
      <div className="ad-container bg-slate-100/50 rounded-xl border border-dashed border-slate-200 p-2 overflow-hidden">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-2683459350838265"
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive={responsive}></ins>
      </div>
    </div>
  );
};

export default AdBanner;
