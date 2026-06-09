'use client';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ff } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

const up  = (d=0) => ({ hidden:{opacity:0,y:22}, show:{opacity:1,y:0,transition:{duration:.75,delay:d,ease:[.4,0,.2,1]}} });
const sl  = (d=0,x=1) => ({ hidden:{opacity:0,x:x*24}, show:{opacity:1,x:0,transition:{duration:.75,delay:d,ease:[.4,0,.2,1]}} });

export default function About() {
  const t        = useTranslations('about');
  const locale   = useLocale();
  const isRTL    = locale === 'fa';
  const isMobile = useIsMobile();
  const ref      = useRef<HTMLDivElement>(null);
  const vis      = useInView(ref, { once:true, margin:'-60px' });

  return (
    <section id="about" ref={ref} className="section-pad"
      style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', overflow:'hidden' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding: isMobile?'0 20px':'0 48px',
        display:'grid', gridTemplateColumns: isMobile?'1fr':'1fr 1fr', gap: isMobile?40:80,
        alignItems:'center' }}>

        {/* Image — flipped in RTL */}
        <motion.div variants={sl(0, isRTL?1:-1)} initial="hidden" animate={vis?'show':'hidden'}
          style={{ position:'relative', order: isMobile?1:(isRTL?1:0) }}>
          <div style={{ aspectRatio:'4/5', overflow:'hidden', position:'relative' }}>
            <Image src="/images/logo.png" alt="PATOGH logo" fill
              style={{ objectFit:'contain', padding:'10%', background:'var(--s2)' }} />
          </div>
          <div style={{ position:'absolute', bottom:-14, [isRTL?'left':'right']:-14,
            width:'70%', height:'70%', border:'1.5px solid var(--red-border)', zIndex:-1 }} />
        </motion.div>

        {/* Text */}
        <div style={{ display:'flex', flexDirection:'column',
          alignItems: isRTL?'flex-end':'flex-start', order: isMobile?0:1 }}>
          <motion.div variants={sl(.1, isRTL?-1:1)} initial="hidden" animate={vis?'show':'hidden'}
            style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20,
              flexDirection: isRTL?'row-reverse':'row' }}>
            <span className="ey-line" />
            <span style={{ fontSize:10, letterSpacing:'.24em', textTransform:'uppercase',
              color:'var(--red)', fontFamily:ff(isRTL), fontWeight:600 }}>{t('eyebrow')}</span>
          </motion.div>

          <motion.h2 variants={up(.18)} initial="hidden" animate={vis?'show':'hidden'}
            style={{ margin:'0 0 24px', color:'var(--text)', fontFamily:ff(isRTL), fontWeight:700,
              fontSize: isMobile?(isRTL?'26px':'24px'):(isRTL?'34px':'32px'),
              letterSpacing: isRTL?0:'-.02em', textAlign: isRTL?'right':'left' }}>
            {t('title')}
          </motion.h2>

          <motion.p variants={up(.26)} initial="hidden" animate={vis?'show':'hidden'}
            style={{ margin:'0 0 32px', color:'var(--sec)', fontFamily:ff(isRTL),
              fontSize: isRTL?16:15, lineHeight: isRTL?2.1:1.9, fontWeight:300,
              textAlign: isRTL?'right':'left',
              wordBreak:'normal', overflowWrap:'break-word', hyphens:'none' }}>
            {t('text')}
          </motion.p>

          <motion.div variants={up(.34)} initial="hidden" animate={vis?'show':'hidden'}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, width:'100%' }}>
            {([['tag1Label','tag1Value'],['tag2Label','tag2Value']] as const).map(([lk,vk]) => (
              <div key={lk} style={{ borderTop:'1.5px solid var(--border)', paddingTop:14 }}>
                <p style={{ margin:'0 0 4px', fontSize:9, letterSpacing:'.2em', textTransform:'uppercase',
                  color:'var(--muted)', fontFamily:ff(isRTL) }}>{t(lk)}</p>
                <p style={{ margin:0, fontSize:13, color:'var(--sec)', fontFamily:ff(isRTL), fontWeight:500 }}>{t(vk)}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
