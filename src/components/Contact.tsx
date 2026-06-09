'use client';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ff, PHONE, IG, WA, ADDR } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

const PhoneIcon = () => <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"><path d="M16 13.5l-2.2-2.2a1.2 1.2 0 00-1.75 0l-.9.9a10 10 0 01-3.35-3.35l.9-.9a1.2 1.2 0 000-1.75L6.5 4a1.2 1.2 0 00-1.75 0L3.2 5.55A2.2 2.2 0 003 7.65C4.3 11.55 8.45 15.7 12.35 17a2.2 2.2 0 002.1-.2l1.55-1.55a1.2 1.2 0 00-.0-1.75z"/></svg>;
const IgIcon   = () => <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="15" height="15" rx="4.5"/><circle cx="10" cy="10" r="4"/><circle cx="14.5" cy="5.5" r=".7" fill="currentColor"/></svg>;
const WaIcon   = () => <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"><path d="M10 2a8 8 0 00-6.93 11.96L2 18l4.15-1.05A8 8 0 1010 2z"/><path d="M7.5 8.5s.5-1.2 1.7 0l.5.5c.6.6 1.7 2.2 2.8 2.2l.5-.5c1.1-1.1 0-1.7 0-1.7"/></svg>;

export default function Contact() {
  const t        = useTranslations('contact');
  const locale   = useLocale();
  const isRTL    = locale === 'fa';
  const isMobile = useIsMobile();
  const ref      = useRef<HTMLDivElement>(null);
  const vis      = useInView(ref, { once:true, margin:'-60px' });

  const cards = [
    { label:t('phone'),     val:PHONE,    href:`tel:${PHONE.replace(/\s/g,'')}`, Icon:PhoneIcon },
    { label:t('instagram'), val:`@${IG}`, href:`https://instagram.com/${IG}`,    Icon:IgIcon   },
    { label:t('whatsapp'),  val:PHONE,    href:WA,                               Icon:WaIcon   },
  ];

  return (
    <section id="contact" ref={ref} className="section-pad"
      style={{ background:'var(--bg)', borderTop:'1px solid var(--border)', overflow:'hidden' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding: isMobile?'0 20px':'0 48px' }}>

        <motion.div initial={{ opacity:0,y:20 }} animate={vis?{ opacity:1,y:0 }:{}} transition={{ duration:.65 }}
          style={{ marginBottom:48, textAlign: isRTL?'right':'left' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16,
            flexDirection: isRTL?'row-reverse':'row', justifyContent: isRTL?'flex-end':'flex-start' }}>
            <span className="ey-line" />
            <span style={{ fontSize:10, letterSpacing:'.24em', textTransform:'uppercase',
              color:'var(--red)', fontFamily:ff(isRTL), fontWeight:600 }}>{t('eyebrow')}</span>
          </div>
          <h2 style={{ margin:0, color:'var(--text)', fontFamily:ff(isRTL), fontWeight:700,
            fontSize: isMobile?'28px':'36px', letterSpacing: isRTL?0:'-.02em' }}>{t('title')}</h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(3,1fr)', gap:14 }}>
          {cards.map((card,i) => (
            <motion.a key={card.label} href={card.href}
              target={card.href.startsWith('http')?'_blank':undefined}
              rel={card.href.startsWith('http')?'noopener noreferrer':undefined}
              initial={{ opacity:0,y:20 }} animate={vis?{ opacity:1,y:0 }:{}}
              transition={{ duration:.55,delay:.1+i*.1 }}
              className="card-h"
              style={{ textDecoration:'none', display:'flex', flexDirection:'column',
                gap:20, padding: isMobile?22:28, background:'var(--surface)',
                border:'1px solid var(--border)', cursor:'pointer',
                boxShadow:'0 1px 6px rgba(0,0,0,.04)',
                textAlign: isRTL?'right':'left', alignItems: isRTL?'flex-end':'flex-start' }}>
              <div style={{ width:42, height:42, border:'1px solid var(--border)', color:'var(--red)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <card.Icon />
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                <p style={{ margin:0, fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
                  color:'var(--muted)', fontFamily:ff(isRTL) }}>{card.label}</p>
                <p style={{ margin:0, fontSize:14, color:'var(--text)',
                  fontFamily:"'Inter',sans-serif", fontWeight:600 }}>{card.val}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p initial={{ opacity:0 }} animate={vis?{ opacity:1 }:{}} transition={{ delay:.45 }}
          style={{ margin:'32px 0 0', fontSize:12, color:'var(--muted)',
            fontFamily:"'Inter',sans-serif", letterSpacing:'.06em',
            textAlign: isRTL?'right':'left', borderTop:'1px solid var(--border)', paddingTop:28 }}>
          {ADDR}, Nordrhein-Westfalen, Deutschland
        </motion.p>
      </div>
    </section>
  );
}
