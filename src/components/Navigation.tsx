'use client';
import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ff } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

const LINKS = ['menu','about','location','contact'] as const;

export default function Navigation() {
  const t        = useTranslations('nav');
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isRTL    = locale === 'fa';

  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); };
  const switchLocale = () => router.replace(pathname, { locale: locale === 'de' ? 'fa' : 'de' });

  const base: React.CSSProperties = {
    position:'sticky', top:0, zIndex:100, transition:'all .35s ease',
    background:  scrolled ? 'rgba(247,245,240,0.94)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
  };

  const linkStyle = (hover?: boolean): React.CSSProperties => ({
    background:'none', border:'none', cursor:'pointer',
    fontFamily: ff(isRTL), fontSize:11, letterSpacing:'.1em', textTransform:'uppercase',
    color: hover ? 'var(--red)' : 'var(--sec)', transition:'color .2s', padding:'4px 0',
  });

  return (
    <>
      <header style={base}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding: isMobile ? '0 20px' : '0 48px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          height: isMobile ? 60 : 68, boxSizing:'border-box' }}>

          {/* Logo + wordmark */}
          <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            style={{ background:'none', border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', gap:10 }}>
            <Image src="/images/logo.png" alt="PATOGH logo" width={34} height={34}
              style={{ borderRadius:'50%', objectFit:'cover' }} />
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:18, fontWeight:900,
              letterSpacing:'.16em', color:'var(--text)', transition:'color .2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='var(--red)')}
              onMouseLeave={e=>(e.currentTarget.style.color='var(--text)')}>
              PATOGH
            </span>
          </button>

          {/* Desktop nav */}
          {!isMobile && (
            <nav style={{ display:'flex', gap:36 }}>
              {LINKS.map(k => (
                <button key={k} onClick={() => go(k)} style={linkStyle()}
                  onMouseEnter={e=>(e.currentTarget.style.color='var(--red)')}
                  onMouseLeave={e=>(e.currentTarget.style.color='var(--sec)')}>
                  {t(k)}
                </button>
              ))}
            </nav>
          )}

          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {!isMobile && (
              <button onClick={switchLocale}
                style={{ ...linkStyle(), border:'1px solid var(--border)', padding:'7px 14px', borderRadius:2 }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color='var(--red)'; (e.currentTarget as HTMLElement).style.borderColor='var(--red-border)'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color='var(--sec)';  (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; }}>
                {t('lang')}
              </button>
            )}
            {isMobile && (
              <button onClick={() => setMenuOpen(v => !v)}
                style={{ background:'none', border:'none', cursor:'pointer', padding:'4px 0',
                  display:'flex', flexDirection:'column', gap:5 }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ display:'block', width:22, height:1.5, background:'var(--text)', transition:'all .3s',
                    transform: menuOpen ? (i===0?'translateY(6.5px) rotate(45deg)':i===2?'translateY(-6.5px) rotate(-45deg)':'none') : 'none',
                    opacity: menuOpen && i===1 ? 0 : 1 }} />
                ))}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ position:'fixed', inset:0, background:'rgba(26,26,26,.4)', zIndex:98 }}
              onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }} animate={{ x:0 }} exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type:'tween', duration:.3, ease:[.4,0,.2,1] }}
              style={{ position:'fixed', top:0, bottom:0, [isRTL?'left':'right']:0,
                width:'72vw', maxWidth:300, background:'var(--surface)', zIndex:99,
                display:'flex', flexDirection:'column', padding:'72px 28px 40px',
                boxSizing:'border-box', boxShadow:'-4px 0 28px rgba(0,0,0,.1)' }}>
              {LINKS.map((k,i) => (
                <motion.button key={k} onClick={() => go(k)}
                  initial={{ opacity:0, x: isRTL?-16:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*.06+.05 }}
                  style={{ background:'none', border:'none', cursor:'pointer', fontFamily:ff(isRTL),
                    fontSize:16, fontWeight:500, color:'var(--text)', padding:'16px 0',
                    borderBottom:'1px solid var(--border)', textAlign: isRTL?'right':'left' }}
                  onMouseEnter={e=>(e.currentTarget.style.color='var(--red)')}
                  onMouseLeave={e=>(e.currentTarget.style.color='var(--text)')}>
                  {t(k)}
                </motion.button>
              ))}
              <button onClick={() => { switchLocale(); setMenuOpen(false); }}
                style={{ marginTop:28, background:'var(--red-dim)', border:'1px solid var(--red-border)',
                  cursor:'pointer', fontFamily:ff(isRTL), fontSize:12, letterSpacing:'.1em',
                  textTransform:'uppercase', color:'var(--red)', padding:'10px 18px',
                  alignSelf: isRTL?'flex-end':'flex-start' }}>
                {t('lang')}
              </button>
              <p style={{ marginTop:'auto', fontSize:10, color:'var(--muted)',
                fontFamily:"'Inter',sans-serif", letterSpacing:'.12em', textTransform:'uppercase',
                textAlign: isRTL?'right':'left' }}>
                Reisholzer Str. 25 · Düsseldorf
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
