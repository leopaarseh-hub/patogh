'use client';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ff } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

const stagger = { hidden:{}, show:{ transition:{ staggerChildren:.11, delayChildren:.15 } } };
const up  = { hidden:{ opacity:0, y:22 }, show:{ opacity:1, y:0, transition:{ duration:.8, ease:[.4,0,.2,1] } } };
const fi  = { hidden:{ opacity:0 },       show:{ opacity:1,     transition:{ duration:.65 } } };

export default function Hero() {
  const t        = useTranslations('hero');
  const locale   = useLocale();
  const isRTL    = locale === 'fa';
  const isMobile = useIsMobile();

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'var(--bg)', position:'relative', overflow:'hidden' }}>

      {/* Decorative rings */}
      {[680,460].map((s,i) => (
        <div key={i} style={{ position:'absolute', width: isMobile ? s*.65 : s, height: isMobile ? s*.65 : s,
          borderRadius:'50%', border:`${i===0?1:.5}px solid rgba(184,44,44,${i===0?.22:.1})`,
          top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />
      ))}

      {/* Logo watermark */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width: isMobile ? '72%' : '46%', maxWidth:520, opacity:.07, pointerEvents:'none', userSelect:'none' }}>
        <Image src="/images/logo.png" alt="" aria-hidden width={520} height={520}
          style={{ width:'100%', height:'auto', objectFit:'contain' }} />
      </div>

      {/* Bottom fade */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:130,
        background:'linear-gradient(to top, var(--bg), transparent)', pointerEvents:'none' }} />

      {/* Content */}
      <motion.div variants={stagger} initial="hidden" animate="show"
        style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:860,
          padding: isMobile ? '0 24px' : '0 48px',
          display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>

        <motion.div variants={fi} style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span className="ey-line" />
          <span style={{ fontSize:10, letterSpacing:'.26em', textTransform:'uppercase',
            color:'var(--red)', fontFamily:ff(isRTL), fontWeight:600 }}>{t('eyebrow')}</span>
          <span className="ey-line" />
        </motion.div>

        <motion.h1 variants={up}
          style={{ margin:0, color:'var(--text)', fontFamily:ff(isRTL), fontWeight:800,
            fontSize: isMobile ? (isRTL?'28px':'26px') : (isRTL?'52px':'50px'),
            lineHeight: isRTL?1.35:1.15, letterSpacing: isRTL?0:'-.025em', textWrap:'balance' }}>
          {t('headline')}
        </motion.h1>

        <motion.div variants={fi} style={{ width:36, height:2, background:'var(--red)' }} />

        <motion.p variants={up}
          style={{ margin:0, color:'var(--sec)', fontFamily:ff(isRTL), maxWidth:500,
            fontSize: isMobile?(isRTL?15:14):(isRTL?17:16),
            lineHeight: isRTL?2.1:1.8, fontWeight:300 }}>
          {t('sub')}
        </motion.p>

        <motion.div variants={up} style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', marginTop:6 }}>
          <button onClick={() => go('menu')}
            style={{ padding: isMobile?'12px 24px':'13px 32px', background:'var(--red)',
              color:'#fff', border:'none', cursor:'pointer', fontFamily:ff(isRTL),
              fontSize:12, letterSpacing:'.1em', textTransform:'uppercase', fontWeight:600, transition:'opacity .2s' }}
            onMouseEnter={e=>(e.currentTarget.style.opacity='.85')}
            onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
            {t('ctaMenu')}
          </button>
          <button onClick={() => go('contact')}
            style={{ padding: isMobile?'12px 24px':'13px 32px', background:'none',
              border:'1.5px solid var(--border-h)', color:'var(--sec)', cursor:'pointer',
              fontFamily:ff(isRTL), fontSize:12, letterSpacing:'.1em', textTransform:'uppercase', fontWeight:500, transition:'all .2s' }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor='var(--red)'; (e.currentTarget as HTMLElement).style.color='var(--red)'; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='var(--border-h)'; (e.currentTarget as HTMLElement).style.color='var(--sec)'; }}>
            {t('ctaContact')}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
        <span style={{ fontSize:9, letterSpacing:'.2em', textTransform:'uppercase',
          color:'var(--muted)', fontFamily:"'Inter',sans-serif" }}>Scroll</span>
        <div className="scroll-line" style={{ width:1, height:32,
          background:'linear-gradient(to bottom, rgba(184,44,44,.5), transparent)' }} />
      </motion.div>
    </section>
  );
}
