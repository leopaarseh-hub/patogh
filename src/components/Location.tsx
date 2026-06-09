'use client';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ff, PHONE, ADDR } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

const MAPS_LINK = `https://maps.google.com/?q=${encodeURIComponent(ADDR + ', Germany')}`;

export default function Location() {
  const t        = useTranslations('location');
  const locale   = useLocale();
  const isRTL    = locale === 'fa';
  const isMobile = useIsMobile();
  const ref      = useRef<HTMLDivElement>(null);
  const vis      = useInView(ref, { once:true, margin:'-60px' });

  // Google Maps embed — no API key needed with this URL format
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(ADDR + ', Germany')}&output=embed&z=16&hl=${locale === 'fa' ? 'fa' : 'de'}`;

  return (
    <section id="location" ref={ref} className="section-pad"
      style={{ background:'var(--s2)', borderTop:'1px solid var(--border)', overflow:'hidden' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding: isMobile?'0 20px':'0 48px' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0,y:20 }} animate={vis?{ opacity:1,y:0 }:{}} transition={{ duration:.65 }}
          style={{ marginBottom:40, textAlign: isRTL?'right':'left' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16,
            flexDirection: isRTL?'row-reverse':'row', justifyContent: isRTL?'flex-end':'flex-start' }}>
            <span className="ey-line" />
            <span style={{ fontSize:10, letterSpacing:'.24em', textTransform:'uppercase',
              color:'var(--red)', fontFamily:ff(isRTL), fontWeight:600 }}>{t('eyebrow')}</span>
          </div>
          <h2 style={{ margin:0, color:'var(--text)', fontFamily:ff(isRTL), fontWeight:700,
            fontSize: isMobile?'28px':'36px', letterSpacing: isRTL?0:'-.02em' }}>{t('title')}</h2>
        </motion.div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'1fr 340px',
          gap: isMobile?20:24, alignItems:'stretch' }}>

          {/* Live Google Maps iframe */}
          <motion.div initial={{ opacity:0,scale:.99 }} animate={vis?{ opacity:1,scale:1 }:{}}
            transition={{ duration:.7,delay:.1 }}
            style={{ border:'1px solid var(--border)', overflow:'hidden',
              minHeight: isMobile?260:440, position:'relative', background:'var(--surface)' }}>
            <iframe
              src={mapSrc}
              width="100%" height="100%"
              style={{ border:0, display:'block', minHeight: isMobile?260:440 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PATOGH – Reisholzer Str. 25, Düsseldorf"
            />
          </motion.div>

          {/* Info card */}
          <motion.div initial={{ opacity:0, x: isRTL?-20:20 }} animate={vis?{ opacity:1,x:0 }:{}}
            transition={{ duration:.7,delay:.18 }}
            style={{ background:'var(--surface)', border:'1px solid var(--border)',
              padding: isMobile?24:32, display:'flex', flexDirection:'column', gap:22,
              textAlign: isRTL?'right':'left', boxSizing:'border-box' }}>

            {([
              [t('address'), ADDR],
              [t('phone'),   PHONE],
            ] as [string,string][]).map(([label,val]) => (
              <div key={label} style={{ display:'flex', flexDirection:'column', gap:6,
                alignItems: isRTL?'flex-end':'flex-start' }}>
                <p style={{ margin:0, fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
                  color:'var(--muted)', fontFamily:ff(isRTL) }}>{label}</p>
                <p style={{ margin:0, fontSize:13, color:'var(--sec)',
                  fontFamily:"'Inter',sans-serif" }}>{val}</p>
              </div>
            ))}

            <div style={{ height:1, background:'var(--border)' }} />

            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
              style={{ display:'flex', alignItems:'center', gap:8, color:'var(--red)',
                textDecoration:'none', fontSize:13, fontFamily:ff(isRTL), fontWeight:600,
                flexDirection: isRTL?'row-reverse':'row', transition:'opacity .2s' }}
              onMouseEnter={e=>(e.currentTarget.style.opacity='.7')}
              onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
              {t('openMaps')}
              <svg width={12} height={12} viewBox="0 0 12 12" fill="none"
                stroke="currentColor" strokeWidth={1.4} strokeLinecap="round"
                style={{ transform: isRTL?'rotate(180deg)':'none' }}>
                <path d="M1 6h10M7 2l4 4-4 4"/>
              </svg>
            </a>

            <div style={{ height:1, background:'var(--border)' }} />

            <div style={{ display:'flex', flexDirection:'column', gap:4,
              alignItems: isRTL?'flex-end':'flex-start' }}>
              {['Reisholzer Str. 25','40231 Düsseldorf','Nordrhein-Westfalen, DE'].map(l => (
                <p key={l} style={{ margin:0, fontSize:12, color:'var(--muted)',
                  fontFamily:"'Inter',sans-serif", letterSpacing:'.04em' }}>{l}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
