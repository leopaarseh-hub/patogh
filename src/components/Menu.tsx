'use client';
import { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MENU_CATS, type MenuCat } from '@/lib/menu-data';
import { fmt, ff } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

function MenuCard({ item, isRTL }: { item: MenuCat['items'][number]; isRTL: boolean }) {
  return (
    <div className="menu-card card-h" style={{ background:'var(--surface)',
      border:'1px solid var(--border)', overflow:'hidden', cursor:'default' }}>
      <div style={{ aspectRatio:'16/9', overflow:'hidden', position:'relative' }}>
        <Image src="/images/food.webp" alt={isRTL ? item.fa : item.de} fill
          className="menu-img" style={{ objectFit:'cover' }} />
      </div>
      <div style={{ padding:'16px 18px', textAlign: isRTL?'right':'left' }}>
        <p style={{ margin:'0 0 3px', color:'var(--text)', fontFamily:ff(isRTL),
          fontSize:13, fontWeight:600, wordBreak:'normal', hyphens:'none' }}>
          {isRTL ? item.fa : item.de}</p>
        <p style={{ margin:'0 0 12px', color:'var(--muted)', fontFamily:ff(!isRTL), fontSize:11 }}>
          {isRTL ? item.de : item.fa}</p>
        <p style={{ margin:0, color:'var(--red)', fontFamily:"'Inter',sans-serif",
          fontSize:13, fontWeight:700, textAlign: isRTL?'left':'right' }}>{fmt(item.price)}</p>
      </div>
    </div>
  );
}

function MenuRow({ item, isRTL }: { item: MenuCat['items'][number]; isRTL: boolean }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', padding:'15px 0',
      borderBottom:'1px solid var(--border)', flexDirection:'row', gap:16 }}>
      <div style={{ flex:1, minWidth:0, textAlign: isRTL?'right':'left' }}>
        <span style={{ display:'block', color:'var(--text)', fontFamily:ff(isRTL),
          fontSize:13, fontWeight:500, wordBreak:'normal', overflowWrap:'break-word', hyphens:'none' }}>
          {isRTL ? item.fa : item.de}</span>
        <span style={{ display:'block', color:'var(--muted)', fontFamily:"'Inter',sans-serif",
          fontSize:11, marginTop:3, textAlign: isRTL?'right':'left',
          direction:'ltr', unicodeBidi:'embed' } as React.CSSProperties}>
          {isRTL ? item.de : item.fa}</span>
      </div>
      <span style={{ color:'var(--red)', fontFamily:"'Inter',sans-serif",
        fontSize:13, fontWeight:700, flexShrink:0, paddingTop:2, alignSelf:'center' }}>
        {fmt(item.price)}
      </span>
    </div>
  );
}

export default function Menu() {
  const t        = useTranslations('menu');
  const locale   = useLocale();
  const isRTL    = locale === 'fa';
  const isMobile = useIsMobile();
  const ref      = useRef<HTMLDivElement>(null);
  const vis      = useInView(ref, { once:true, margin:'-60px' });
  const [cat, setCat] = useState('sandwiches');
  const active   = MENU_CATS.find(c => c.id === cat) ?? MENU_CATS[0];

  const catName = (c: MenuCat) => isRTL ? c.fa : c.de;

  return (
    <section id="menu" ref={ref} className="section-pad"
      style={{ background:'var(--bg)', borderTop:'1px solid var(--border)', overflow:'hidden' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding: isMobile?'0 20px':'0 48px' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0,y:20 }} animate={vis?{ opacity:1,y:0 }:{}} transition={{ duration:.65 }}
          style={{ marginBottom:48, textAlign: isRTL?'right':'left' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16,
            flexDirection: isRTL?'row-reverse':'row', justifyContent: isRTL?'flex-end':'flex-start' }}>
            <span className="ey-line" />
            <span style={{ fontSize:10, letterSpacing:'.24em', textTransform:'uppercase',
              color:'var(--red)', fontFamily:ff(isRTL), fontWeight:600 }}>{t('eyebrow')}</span>
          </div>
          <h2 style={{ margin:'0 0 6px', color:'var(--text)', fontFamily:ff(isRTL), fontWeight:800,
            fontSize: isMobile?'28px':'38px', letterSpacing: isRTL?0:'-.025em' }}>{t('title')}</h2>
          <p style={{ margin:0, color:'var(--muted)', fontFamily:ff(isRTL), fontSize:13 }}>{t('sub')}</p>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={vis?{ opacity:1 }:{}} transition={{ delay:.2 }}>
          {/* ── MOBILE: scrollable tabs ── */}
          <div className="lg:hidden" style={{ overflowX:'auto', display:'flex', gap:0,
            borderBottom:'1px solid var(--border)', marginBottom:28,
            flexDirection: isRTL?'row-reverse':'row',
            scrollbarWidth:'none' as 'none',
            WebkitOverflowScrolling:'touch' } as React.CSSProperties}>
            {MENU_CATS.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)}
                style={{ background:'none', border:'none', cursor:'pointer', whiteSpace:'nowrap',
                  wordBreak:'keep-all', padding:'10px 14px', fontSize:11, letterSpacing:'.1em',
                  textTransform:'uppercase', fontFamily:ff(isRTL),
                  color: cat===c.id ? 'var(--red)' : 'var(--muted)',
                  borderBottom: cat===c.id ? '2px solid var(--red)' : '2px solid transparent',
                  marginBottom:-1, transition:'all .2s', fontWeight: cat===c.id?600:400 }}>
                {catName(c)}
              </button>
            ))}
          </div>

          {/* ── DESKTOP: sidebar + content ── */}
          <div className="hidden lg:grid" style={{ gridTemplateColumns: isRTL?'1fr 220px':'220px 1fr',
            border:'1px solid var(--border)', background:'var(--surface)',
            boxShadow:'0 2px 20px rgba(0,0,0,.05)' }}>
            {/* Sidebar */}
            <div style={{ borderRight: isRTL?'none':'1px solid var(--border)',
              borderLeft: isRTL?'1px solid var(--border)':'none',
              padding:'8px 0', order: isRTL?1:0 }}>
              {MENU_CATS.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)}
                  style={{ display:'block', width:'100%', background: cat===c.id?'var(--red-dim)':'none',
                    border:'none', cursor:'pointer', wordBreak:'keep-all',
                    borderLeft:  !isRTL && cat===c.id ? '2.5px solid var(--red)' : '2.5px solid transparent',
                    borderRight:  isRTL && cat===c.id ? '2.5px solid var(--red)' : '2.5px solid transparent',
                    textAlign: isRTL?'right':'left', fontFamily:ff(isRTL),
                    padding:'13px 24px', fontSize:12, letterSpacing:'.08em',
                    textTransform:'uppercase', color: cat===c.id?'var(--red)':'var(--sec)',
                    fontWeight: cat===c.id?600:400, transition:'all .15s' }}>
                  {catName(c)}
                </button>
              ))}
            </div>
            {/* Content */}
            <div style={{ padding:'36px 40px', minHeight:480, order: isRTL?0:1 }}>
              <AnimatePresence mode="wait">
                <motion.div key={cat} initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  exit={{ opacity:0 }} transition={{ duration:.25 }}>
                  <h3 style={{ margin:'0 0 28px', color:'var(--text)', fontFamily:ff(isRTL),
                    fontWeight:700, fontSize:22, letterSpacing: isRTL?0:'-.01em',
                    textAlign: isRTL?'right':'left', wordBreak:'normal', hyphens:'none' }}>
                    {isRTL ? active.fa : active.de}
                  </h3>
                  {active.type==='card' && (
                    <div style={{ display:'grid', gap:14,
                      gridTemplateColumns: active.items.length<=3 ? `repeat(${Math.min(active.items.length,3)},1fr)` : 'repeat(3,1fr)' }}>
                      {active.items.map(it => <MenuCard key={it.id} item={it} isRTL={isRTL} />)}
                    </div>
                  )}
                  {active.type==='list' && (
                    <div style={{ maxWidth:540 }}>
                      {active.items.map(it => <MenuRow key={it.id} item={it} isRTL={isRTL} />)}
                    </div>
                  )}
                  {active.type==='sauces' && (
                    <div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
                        {active.items.map(it => (
                          <span key={it.id} style={{ padding:'8px 20px', border:'1px solid var(--border)',
                            color:'var(--sec)', fontFamily:"'Inter',sans-serif", fontSize:13, cursor:'default',
                            transition:'all .2s' }}
                            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor='var(--red-border)'; (e.currentTarget as HTMLElement).style.color='var(--red)'; }}
                            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.color='var(--sec)'; }}>
                            {it.de}
                          </span>
                        ))}
                      </div>
                      <p style={{ color:'var(--muted)', fontFamily:ff(isRTL), fontSize:12,
                        letterSpacing:'.06em', margin:0, textAlign: isRTL?'right':'left' }}>{t('saucePrice')}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile content */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div key={cat} initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                exit={{ opacity:0 }} transition={{ duration:.25 }}>
                {active.type==='card' && (
                  <div style={{ display:'grid', gap:12, gridTemplateColumns:'1fr 1fr' }}>
                    {active.items.map(it => <MenuCard key={it.id} item={it} isRTL={isRTL} />)}
                  </div>
                )}
                {active.type==='list' && active.items.map(it => <MenuRow key={it.id} item={it} isRTL={isRTL} />)}
                {active.type==='sauces' && (
                  <div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
                      {active.items.map(it => (
                        <span key={it.id} style={{ padding:'7px 14px', border:'1px solid var(--border)',
                          color:'var(--sec)', fontFamily:"'Inter',sans-serif", fontSize:12 }}>{it.de}</span>
                      ))}
                    </div>
                    <p style={{ color:'var(--muted)', fontFamily:ff(isRTL), fontSize:12, margin:0 }}>{t('saucePrice')}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
