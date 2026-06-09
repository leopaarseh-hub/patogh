'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import { ff, PHONE, IG } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Footer() {
  const t        = useTranslations('footer');
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const isRTL    = locale === 'fa';
  const isMobile = useIsMobile();

  const switchLocale = () => router.replace(pathname, { locale: locale === 'de' ? 'fa' : 'de' });
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  const navLinks = [
    { id:'menu',     de:'Menü',      fa:'منو'       },
    { id:'about',    de:'Über uns',  fa:'درباره ما'  },
    { id:'location', de:'Standort',  fa:'موقعیت'    },
    { id:'contact',  de:'Kontakt',   fa:'تماس'      },
  ];

  const contactLinks = [
    { label: PHONE,   href: `tel:${PHONE.replace(/\s/g,'')}` },
    { label:`@${IG}`, href: `https://instagram.com/${IG}`    },
  ];

  return (
    <footer style={{ background:'var(--dark)' }}>
      {/* Top */}
      <div style={{ maxWidth:1280, margin:'0 auto',
        padding: isMobile?'48px 20px 0':'60px 48px 0', boxSizing:'border-box',
        display:'grid', gridTemplateColumns: isMobile?'1fr 1fr':'repeat(4,1fr)',
        gap: isMobile?32:48, direction: isRTL?'rtl':'ltr' }}>

        {/* Brand */}
        <div style={{ gridColumn: isMobile?'1/-1':'auto', display:'flex', flexDirection:'column',
          gap:14, alignItems: isRTL?'flex-end':'flex-start' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Image src="/images/logo.png" alt="PATOGH" width={44} height={44}
              style={{ borderRadius:'50%', objectFit:'cover', border:'1px solid rgba(255,255,255,.1)', flexShrink:0 }} />
            <span style={{ fontSize:18, fontWeight:900, letterSpacing:'.14em',
              color:'#fff', fontFamily:"'Inter',sans-serif" }}>PATOGH</span>
          </div>
          <p style={{ margin:0, fontSize:12, color:'rgba(255,255,255,.4)', fontFamily:ff(isRTL),
            lineHeight:1.7, textAlign: isRTL?'right':'left', maxWidth:200 }}>{t('tagline')}</p>
          <div style={{ width:24, height:2, background:'var(--red)', marginTop:4 }} />
        </div>

        {/* Nav */}
        <div style={{ display:'flex', flexDirection:'column', gap:14, alignItems: isRTL?'flex-end':'flex-start' }}>
          <p style={{ margin:0, fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
            color:'rgba(255,255,255,.3)', fontFamily:ff(isRTL) }}>{t('nav')}</p>
          {navLinks.map(lk => (
            <button key={lk.id} onClick={() => go(lk.id)}
              style={{ background:'none', border:'none', cursor:'pointer',
                color:'rgba(255,255,255,.5)', fontFamily:"'Inter',sans-serif",
                fontSize:13, transition:'color .2s', textAlign: isRTL?'right':'left' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.5)')}>
              {isRTL ? lk.fa : lk.de}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div style={{ display:'flex', flexDirection:'column', gap:14, alignItems: isRTL?'flex-end':'flex-start' }}>
          <p style={{ margin:0, fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
            color:'rgba(255,255,255,.3)', fontFamily:ff(isRTL) }}>{t('contact')}</p>
          {contactLinks.map(l => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith('http')?'_blank':undefined}
              rel={l.href.startsWith('http')?'noopener noreferrer':undefined}
              style={{ color:'rgba(255,255,255,.5)', textDecoration:'none',
                fontFamily:"'Inter',sans-serif", fontSize:13, transition:'color .2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
              onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.5)')}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Address */}
        <div style={{ display:'flex', flexDirection:'column', gap:14, alignItems: isRTL?'flex-end':'flex-start' }}>
          <p style={{ margin:0, fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
            color:'rgba(255,255,255,.3)', fontFamily:"'Inter',sans-serif" }}>{t('address')}</p>
          {['Reisholzer Str. 25','40231 Düsseldorf','Nordrhein-Westfalen'].map(l => (
            <p key={l} style={{ margin:0, fontSize:12, color:'rgba(255,255,255,.4)',
              fontFamily:"'Inter',sans-serif" }}>{l}</p>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', marginTop:48 }}>
        <div style={{ maxWidth:1280, margin:'0 auto',
          padding: isMobile?'18px 20px':'18px 48px', boxSizing:'border-box',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          flexDirection: isRTL?'row-reverse':'row', gap:12, flexWrap:'wrap' }}>
          <p style={{ margin:0, fontSize:11, color:'rgba(255,255,255,.25)', fontFamily:ff(isRTL) }}>
            © {new Date().getFullYear()} PATOGH. {t('rights')}.
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <span style={{ fontSize:11, color:'rgba(255,255,255,.25)', fontFamily:"'Inter',sans-serif" }}>
              {t('madeBy')}{' '}
              <a href="https://parnil.co" target="_blank" rel="noopener noreferrer"
                style={{ color:'var(--red)', textDecoration:'none' }}>Parnil.co</a>
            </span>
            <button onClick={switchLocale}
              style={{ background:'none', border:'1px solid rgba(255,255,255,.15)',
                cursor:'pointer', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase',
                color:'rgba(255,255,255,.35)', padding:'5px 10px',
                fontFamily:"'Inter',sans-serif", transition:'all .2s' }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor='var(--red-border)'; (e.currentTarget as HTMLElement).style.color='var(--red)'; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.15)'; (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,.35)'; }}>
              {locale === 'de' ? 'فارسی' : 'Deutsch'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
