'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ff } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

const REVIEWS = [
  { name:'Thomas K.',  rating:5, text:'Bestes persisches Fast Food in Düsseldorf! Die Sandwiches sind authentisch und die Zutaten immer frisch. Absolut empfehlenswert.', time:'vor 2 Wochen' },
  { name:'Sina M.',    rating:5, text:'Erinnerung an die Heimat – genau so schmeckt es in Iran. Der Bandari Sandwich ist Pflicht!', time:'vor 1 Monat' },
  { name:'Leila R.',   rating:4, text:'Super leckeres Essen, freundlicher Service und großzügige Portionen. Sehr fair im Preis.', time:'vor 3 Wochen' },
  { name:'Ahmad Z.',   rating:5, text:'پاتوق بهترین رستوران ایرانی دوسلدورفه. ساندویچ‌ها واقعاً اصیل و خوشمزه‌ست.', time:'vor 1 Woche' },
  { name:'Maria S.',   rating:5, text:'Zufällig reingegangen und sofort verliebt. Authentisch, schnell und wunderbar lecker!', time:'vor 2 Monaten' },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display:'flex', gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={12} height={12} viewBox="0 0 12 12">
          <path d="M6 1l1.236 3.8H11L7.882 6.9 9.118 10.7 6 8.6l-3.118 2.1L4.118 6.9 1 4.8h3.764z"
            fill={i<=n?'var(--red)':'none'} stroke={i<=n?'var(--red)':'var(--muted)'} strokeWidth={.8}/>
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const t        = useTranslations('reviews');
  const locale   = useLocale();
  const isRTL    = locale === 'fa';
  const isMobile = useIsMobile();
  const ref      = useRef<HTMLDivElement>(null);
  const vis      = useInView(ref, { once:true, margin:'-60px' });

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const count = isMobile ? 1 : 3;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const advance = useCallback(() => {
    setDir(1); setIdx(i => (i+1) % REVIEWS.length);
  }, []); // REVIEWS is a module-level constant — safe to omit

  useEffect(() => {
    const iv = setInterval(advance, 4500);
    return () => clearInterval(iv);
  }, [advance]);

  const goTo = (i: number) => { setDir(i>idx?1:-1); setIdx(i); };
  const visible = Array.from({ length: Math.min(count, REVIEWS.length) },
    (_,o) => REVIEWS[(idx+o) % REVIEWS.length]);

  return (
    <section id="reviews" ref={ref} className="section-pad"
      style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', overflow:'hidden' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding: isMobile?'0 20px':'0 48px' }}>

        <motion.div initial={{ opacity:0,y:20 }} animate={vis?{ opacity:1,y:0 }:{}} transition={{ duration:.65 }}
          style={{ marginBottom:48 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16,
            flexDirection: isRTL?'row-reverse':'row', justifyContent: isRTL?'flex-end':'flex-start' }}>
            <span className="ey-line" />
            <span style={{ fontSize:10, letterSpacing:'.24em', textTransform:'uppercase',
              color:'var(--red)', fontFamily:ff(isRTL), fontWeight:600 }}>{t('eyebrow')}</span>
          </div>
          <h2 style={{ margin:'0 0 16px', color:'var(--text)', fontFamily:ff(isRTL), fontWeight:700,
            fontSize: isMobile?'28px':'36px', letterSpacing: isRTL?0:'-.02em',
            textAlign: isRTL?'right':'left' }}>{t('title')}</h2>
          <div style={{ display:'flex', alignItems:'center', gap:10, justifyContent: isRTL?'flex-end':'flex-start' }}>
            <Stars n={5} />
            <span style={{ color:'var(--red)', fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:14 }}>{t('rating')}</span>
            <span style={{ color:'var(--muted)', fontSize:11, fontFamily:"'Inter',sans-serif" }}>· {t('source')}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={vis?{ opacity:1 }:{}} transition={{ delay:.2 }}>
          <div style={{ overflow:'hidden' }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(3,1fr)', gap:16 }}>
                {visible.map((rv,i) => (
                  <motion.div key={`${rv.name}-${idx}-${i}`}
                    initial={{ opacity:0, x:dir*30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:dir*-30 }}
                    transition={{ duration:.38, ease:[.4,0,.2,1] }}
                    style={{ background:'var(--bg)', border:'1px solid var(--border)',
                      padding: isMobile?24:28, display:'flex', flexDirection:'column', gap:16 }}>
                    <Stars n={rv.rating} />
                    <p style={{ margin:0, color:'var(--sec)', fontFamily:ff(isRTL), fontSize:13,
                      lineHeight:1.85, flex:1, display:'-webkit-box',
                      WebkitLineClamp:5, WebkitBoxOrient:'vertical', overflow:'hidden' } as React.CSSProperties}>
                      {rv.text}
                    </p>
                    <div style={{ borderTop:'1px solid var(--border)', paddingTop:16,
                      display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--red-dim)',
                        border:'1px solid var(--red-border)', display:'flex', alignItems:'center',
                        justifyContent:'center', flexShrink:0, color:'var(--red)',
                        fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:12 }}>
                        {rv.name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ margin:0, color:'var(--text)', fontSize:12, fontFamily:"'Inter',sans-serif", fontWeight:600 }}>{rv.name}</p>
                        <p style={{ margin:0, color:'var(--muted)', fontSize:10, fontFamily:"'Inter',sans-serif" }}>{rv.time}</p>
                      </div>
                      <span style={{ marginLeft:'auto', fontSize:9, color:'var(--muted)',
                        fontFamily:"'Inter',sans-serif", letterSpacing:'.1em', textTransform:'uppercase' }}>
                        Google
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          <div style={{ display:'flex', gap:6, justifyContent:'center', marginTop:28 }}>
            {REVIEWS.map((_,i) => (
              <button key={i} onClick={() => goTo(i)}
                style={{ background: i===idx?'var(--red)':'rgba(0,0,0,.15)',
                  width: i===idx?18:6, height:6, border:'none', cursor:'pointer',
                  borderRadius:3, transition:'all .3s', padding:0 }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
