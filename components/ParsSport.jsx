"use client"

import { useState } from "react"

const LOGO_SRC = "/logo.png"
const REY_SRC  = "/reyhaneh.jpg"
const PEY_SRC  = "/peymaneh.jpg"
const IG_LINK  = "https://instagram.com/pars_sport_dusseldorf"
const TG_LINK  = "https://t.me/+3UyGL88W4xkM2My"

/* ─── ICON SYSTEM ─────────────────────────────────────────── */
const Ic = {
  Sport: ({s=24,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.2"/>
      <path d="M12 7.5v5.5"/>
      <path d="M12 9.5L7.5 8M12 9.5L16.5 8"/>
      <path d="M12 13L8.5 19.5M12 13L15.5 19.5"/>
    </svg>
  ),
  Volleyball: ({s=24,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9.5"/>
      <path d="M12 2.5C14.5 5.5 15 9 13.5 12.5C12 16 12 19.5 12 21.5"/>
      <path d="M12 2.5C9.5 5.5 9 9 10.5 12.5C12 16 12 19.5 12 21.5"/>
      <path d="M2.8 9.5C5.8 8 9 9 11.5 11C14 13 15.5 16 14 19"/>
      <path d="M21.2 9.5C18.2 8 15 9 12.5 11C10 13 8.5 16 10 19"/>
    </svg>
  ),
  Padel: ({s=24,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10C6 6.7 8.7 4 12 4C15.3 4 18 6.7 18 10C18 13.3 15.3 16 12 16C8.7 16 6 13.3 6 10Z"/>
      <line x1="12" y1="16" x2="12" y2="21"/>
      <line x1="9" y1="21" x2="15" y2="21"/>
      <circle cx="10" cy="8" r="0.8" fill={c} stroke="none"/>
      <circle cx="14" cy="8" r="0.8" fill={c} stroke="none"/>
      <circle cx="10" cy="12" r="0.8" fill={c} stroke="none"/>
      <circle cx="14" cy="12" r="0.8" fill={c} stroke="none"/>
      <circle cx="12" cy="10" r="0.8" fill={c} stroke="none"/>
    </svg>
  ),
  Football: ({s=24,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.5"/>
      <polygon points="12,8 15,10 14,14 10,14 9,10" stroke={c} strokeWidth="1.3" fill="none"/>
      <line x1="12" y1="8" x2="12" y2="2.5"/>
      <line x1="15" y1="10" x2="20.5" y2="8.5"/>
      <line x1="14" y1="14" x2="17.5" y2="19"/>
      <line x1="10" y1="14" x2="6.5" y2="19"/>
      <line x1="9" y1="10" x2="3.5" y2="8.5"/>
    </svg>
  ),
  Calendar: ({s=20,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2.5"/>
      <line x1="16" y1="2" x2="16" y2="7"/>
      <line x1="8" y1="2" x2="8" y2="7"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <circle cx="8" cy="15" r=".8" fill={c} stroke="none"/>
      <circle cx="12" cy="15" r=".8" fill={c} stroke="none"/>
      <circle cx="16" cy="15" r=".8" fill={c} stroke="none"/>
    </svg>
  ),
  Clock: ({s=20,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9.5"/>
      <polyline points="12 7 12 12 15.5 15.5"/>
    </svg>
  ),
  Pin: ({s=20,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2C8.5 2 5.5 5 5.5 9C5.5 14.2 12 22 12 22C12 22 18.5 14.2 18.5 9C18.5 5 15.5 2 12 2Z"/>
      <circle cx="12" cy="9" r="2.8"/>
    </svg>
  ),
  Users: ({s=20,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="9" cy="7" r="3"/>
      <path d="M2 21v-1.5C2 17 5 15 9 15C13 15 16 17 16 19.5V21"/>
      <path d="M15.5 3.5C17.5 4 19 5.8 19 8C19 10.2 17.5 12 15.5 12.5"/>
      <path d="M19 15H20C22 15 23 16.5 23 18V21"/>
    </svg>
  ),
  Star: ({s=20,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/>
    </svg>
  ),
  Arrow: ({s=20,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Instagram: ({s=20,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c} style={{flexShrink:0}}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Telegram: ({s=20,c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c} style={{flexShrink:0}}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  Menu: ({s=22}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
}

/* ─── CONTENT ─────────────────────────────────────────────── */
const SPORT_ICONS = { sport: Ic.Sport, volleyball: Ic.Volleyball, padel: Ic.Padel, football: Ic.Football }
const SPORT_COLORS = {
  sport:      { bg:"linear-gradient(135deg,#1A0E06 0%,#3D2810 100%)", accent:"rgba(212,170,74,.18)" },
  volleyball: { bg:"linear-gradient(135deg,#091828 0%,#0D2845 100%)", accent:"rgba(74,130,212,.16)" },
  padel:      { bg:"linear-gradient(135deg,#0C1A0C 0%,#1E3A1E 100%)", accent:"rgba(74,180,110,.14)" },
  football:   { bg:"linear-gradient(135deg,#1A0808 0%,#3D1010 100%)", accent:"rgba(212,80,74,.14)" },
}

const T = {
  de: {
    nav: { services:"Sportangebote", team:"Team", events:"Events", contact:"Kontakt", cta:"Mitmachen" },
    hero: {
      tagline:"Sport. Gemeinschaft. Gesundheit.",
      h1:"PARS", h2:"SPORT",
      sub:"Dein iranischer Sportclub in Düsseldorf – Bewegung, Begegnung und ein aktives Leben.",
      cta1:"Sportangebote", cta2:"Mitmachen"
    },
    services: {
      label:"SPORTANGEBOTE", h:"Wöchentliches Programm",
      items:[
        { key:"sport",      name:"Gemeinsamer Sport", day:"Sonntag",    time:"10:30 Uhr", desc:"Offenes Programm – Bewegung, Freude und Gemeinschaft für alle Altersgruppen." },
        { key:"volleyball", name:"Volleyball",         day:"Sonntag",    time:"Nachmittag", desc:"Teamspiel und Spaß pur – bring deine Freunde mit und spiele mit." },
        { key:"padel",      name:"Padel Tennis",       day:"Donnerstag", time:"Abend",      desc:"Trendsportart auf dem Vormarsch – für Anfänger und Fortgeschrittene." },
        { key:"football",   name:"Fußball",             day:"Freitag",    time:"Abend",      desc:"Wöchentliches Fußballspiel für alle – Spaß und Sport garantiert." },
      ]
    },
    events: {
      label:"VERANSTALTUNGEN", h:"Nächste Events",
      badge_free:"Kostenlos", badge_level:"Alle Levels", badge_reg:"Anmeldung",
      cta:"Beitreten",
      items:[
        { key:"sport",      name:"Gemeinsamer Sport",    day:"Jeden Sonntag",    time:"10:30 Uhr",  loc:"Rheinpark · Düsseldorf",        free:true,  level:"Alle Levels",           desc:"Starte deinen Sonntag aktiv. Stretching, Laufen und gemeinsame Übungen im Freien." },
        { key:"volleyball", name:"Volleyball Abend",      day:"Jeden Sonntag",    time:"Nachmittag", loc:"Sporthalle · Düsseldorf-Nord",  free:true,  level:"Alle Levels",           desc:"Doppel- und Einzelrunden, vom Anfänger bis zum Fortgeschrittenen – jeder ist willkommen." },
        { key:"padel",      name:"Padel Training",         day:"Jeden Donnerstag", time:"Abend",      loc:"Padel Club Düsseldorf",          free:false, level:"Anfänger & Fortg.",    desc:"Spieltechniken, Rallyes und Matches – das aufregendste Racket-Spiel der Saison." },
        { key:"football",   name:"Freitagsfußball",        day:"Jeden Freitag",    time:"Abend",      loc:"Indoor Sporthalle · Düsseldorf", free:true,  level:"Alle Willkommen",      desc:"Kleine Gruppen, schnelles Spiel – Hallen-Fußball mit iranischer Community." },
      ]
    },
    team: {
      label:"UNSER TEAM", h:"Die Gründerinnen",
      reyhaneh: {
        name:"Reyhaneh Amro", role:"Athletin & Lehrerin",
        sub:"41 Jahre · Isfahan",
        proud:"Aufgewachsen in einer sportlich-kulturellen Familie mit zwei Meister-Schwestern.",
        b_label:"Vor der Migration",
        b:["~15 Jahre im iranischen Nationalteam – 8 Asienmedaillen (Kajak, Wildwasser, Kanupolo)","2× Ausgezeichnete Athletin des Jahres","Nationale Titel in Kanu, Schwimmen und Volleyball","Master Sportwissenschaften · Top 10 Physik-Olympiade","Lehrerin & Mitarbeiterin des Sportministeriums","20+ Jahre Trainerin: Schwimmen · Kanu · Rettungsschwimmen"],
        a_label:"Nach der Migration",
        a:["10 Jahre Lehrerin in Deutschland (Sport, Mathematik, Kunst)","Aktive Kanupolo-Wettkämpferin in deutschen & europäischen Ligen"],
        msg:"Was mir heute am kostbarsten ist, ist die Möglichkeit, mein Wissen und meine Leidenschaft an junge Menschen weiterzugeben und meinen Landsleuten mit ganzem Herzen beizustehen."
      },
      peymaneh: {
        name:"Peymaneh Amro", role:"Mitgründerin & Trainerin",
        sub:"25+ Jahre Spitzensport",
        s_label:"Schwimmen",
        s:["Ehem. Mitglied des iranischen Nationalschwimmteams (Sepahan & Zob Ahan)","120+ Medaillen · 36 nationale Rekorde","4× Schwimmliga-Meisterin · 2× Beste Schwimmerin des Landes"],
        c_label:"Kanupolo",
        c:["Mitglied der Nationaljugend- & Seniorenmannschaft","10× Nationale Meisterin & Superliga-Siegerin","Mixed-Liga-Erfahrung in Deutschland"],
        e_label:"Qualifikationen",
        e:["Wasserball Isfahan · Sporttherapie & orthopädische Rehabilitation","Trainerin: Schwimmen · Kanupolo · Fitness · Rettungsschwimmen"],
        msg:"Gemeinsam mit meiner Schwester bringen wir als Gründerinnen von Pars Sport die iranische Community zusammen. Sport ist kein Wettkampf allein – es ist ein Weg zu stärkeren Menschen und einer gesünderen Gesellschaft."
      }
    },
    contact: {
      label:"MITMACHEN", h:"Werde Teil der Community",
      sub:"Folge uns auf Instagram und tritt unserer Telegram-Gruppe bei – keine Kosten, volle Freude.",
      ig_btn:"Instagram folgen", tg_btn:"Telegram beitreten"
    },
    footer: {
      tagline:"Sport. Gemeinschaft. Gesundheit.",
      links:[{label:"Sportangebote",href:"#services"},{label:"Events",href:"#events"},{label:"Team",href:"#team"},{label:"Kontakt",href:"#contact"}],
      copy:"© 2025 Pars Sport · Düsseldorf · Alle Rechte vorbehalten",
      ig:"@pars_sport_dusseldorf"
    }
  },
  fa: {
    nav: { services:"برنامه ورزشی", team:"تیم", events:"رویدادها", contact:"تماس", cta:"عضویت" },
    hero: {
      tagline:"ورزش. جامعه. سلامتی.",
      h1:"پارس", h2:"اسپرت",
      sub:"باشگاه ورزشی ایرانیان در دوسلدورف – فضایی برای تحرک، ارتباط و سبک زندگی فعال.",
      cta1:"برنامه ورزشی", cta2:"همراه ما شوید"
    },
    services: {
      label:"برنامه ورزشی", h:"برنامه هفتگی",
      items:[
        { key:"sport",      name:"ورزش همگانی", day:"یکشنبه‌ها",  time:"ساعت ۱۰:۳۰", desc:"برنامه باز برای همه سطوح – حرکت، شادی و همبستگی." },
        { key:"volleyball", name:"والیبال",      day:"یکشنبه‌ها",  time:"بعدازظهر",  desc:"بازی تیمی و پر از شادی – دوستانت را هم بیاور." },
        { key:"padel",      name:"پدل تنیس",    day:"پنجشنبه‌ها", time:"عصر",       desc:"ورزش پرطرفدار برای همه سطوح – مبتدی تا حرفه‌ای." },
        { key:"football",   name:"فوتبال",       day:"جمعه‌ها",    time:"عصر",       desc:"فوتبال هفتگی برای همه – سرگرمی و ورزش تضمینی." },
      ]
    },
    events: {
      label:"رویدادها", h:"رویدادهای آینده",
      badge_free:"رایگان", badge_level:"همه سطوح", badge_reg:"ثبت‌نام",
      cta:"پیوستن",
      items:[
        { key:"sport",      name:"ورزش همگانی",    day:"هر یکشنبه",   time:"ساعت ۱۰:۳۰", loc:"رین‌پارک · دوسلدورف",      free:true,  level:"همه سطوح",             desc:"یکشنبه‌ات را فعال شروع کن. کشش، دویدن و تمرین گروهی در فضای باز." },
        { key:"volleyball", name:"والیبال عصر",     day:"هر یکشنبه",   time:"بعدازظهر",   loc:"سالن ورزشی · دوسلدورف",    free:true,  level:"همه سطوح",             desc:"دابل و انفرادی، از مبتدی تا پیشرفته – همه خوش‌آمدید." },
        { key:"padel",      name:"تمرین پدل",        day:"هر پنجشنبه",  time:"عصر",        loc:"پدل کلاب دوسلدورف",         free:false, level:"مبتدی و پیشرفته",     desc:"تکنیک، رالی و بازی – هیجان‌انگیزترین ورزش راکتی فصل." },
        { key:"football",   name:"فوتبال جمعه",      day:"هر جمعه",     time:"عصر",        loc:"سالن سرپوشیده · دوسلدورف",  free:true,  level:"همه خوش‌آمدید",       desc:"گروه‌های کوچک، بازی سریع – فوتبال سالنی با جامعه ایرانی." },
      ]
    },
    team: {
      label:"تیم ما", h:"بنیان‌گذاران",
      reyhaneh: {
        name:"ریحانه عمرو", role:"ورزشکار و معلم",
        sub:"۴۱ ساله · اصفهان",
        proud:"افتخار به خانواده‌ای فرهنگی و ورزشی و داشتن دو خواهر قهرمان.",
        b_label:"قبل از مهاجرت",
        b:["حدود ۱۵ سال در تیم ملی ایران – ۸ مدال آسیایی (کایاک، آب‌های خروشان، کانوپولو)","دو دوره ورزشکار برتر زنان","مقام‌های کشوری در قایقرانی، شنا و والیبال","کارشناسی ارشد تربیت بدنی · منتخب المپیاد فیزیک","سابقه تدریس و کارمند اداره تربیت بدنی","بیش از ۲۰ سال مربیگری شنا، قایقرانی و نجات غریق"],
        a_label:"بعد از مهاجرت",
        a:["۱۰ سال تدریس در دبیرستان‌های آلمان (ورزش، ریاضی، هنر)","شرکت در مسابقات کانوپولو در لیگ‌های آلمان و اروپا"],
        msg:"آنچه برای من ارزشمندتر است، فرصتی است که امروز دارم؛ یادگیری و انتقال دانسته‌ها و انگیزه‌هایم به نسل جوان، با دل و جان."
      },
      peymaneh: {
        name:"پیمانه عمرو", role:"بنیان‌گذار مشترک و مربی",
        sub:"بیش از ۲۵ سال ورزش قهرمانی",
        s_label:"شنا",
        s:["عضو سابق تیم ملی شنای ایران، باشگاه‌های سپاهان و ذوب‌آهن","بیش از ۱۲۰ مدال · ۳۶ رکورد ملی","۴ دوره قهرمانی لیگ · ۲ دوره برترین شناگر کشور"],
        c_label:"کانوپولو",
        c:["عضو تیم ملی جوانان و اردوهای تیم ملی بزرگسالان","۱۰ دوره قهرمانی کشور و سوپرلیگ","سابقه در لیگ میکس آلمان"],
        e_label:"سایر سوابق",
        e:["واترپلو اصفهان · متخصص ورزش‌درمانی و بازتوانی ارتوپدی","مربی شنا، کانوپولو، فیتنس و نجات غریق"],
        msg:"امروز در کنار خواهرم، به عنوان بنیان‌گذار «پارس اسپرت» تلاش می‌کنیم جامعه ایرانیان آلمان را حول ورزش، سلامت و زندگی فعال گرد هم بیاوریم."
      }
    },
    contact: {
      label:"عضویت", h:"بخشی از جامعه ما باشید",
      sub:"ما را در اینستاگرام دنبال کنید و به گروه تلگرام ما بپیوندید – رایگان و با روی باز.",
      ig_btn:"اینستاگرام", tg_btn:"تلگرام"
    },
    footer: {
      tagline:"ورزش. جامعه. سلامتی.",
      links:[{label:"برنامه ورزشی",href:"#services"},{label:"رویدادها",href:"#events"},{label:"تیم",href:"#team"},{label:"تماس",href:"#contact"}],
      copy:"© ۲۰۲۵ پارس اسپرت · دوسلدورف",
      ig:"@pars_sport_dusseldorf"
    }
  }
}

/* ─── CSS ─────────────────────────────────────────────────── */
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --bg:#E0D6CA;--bg-card:#EDE7DF;--bg-hero:#120B04;
  --gold-1:#8B6914;--gold-2:#B8902A;--gold-3:#D4AA4A;--gold-4:#F0C860;
  --gold-grad:linear-gradient(135deg,#8B6914 0%,#D4AA4A 50%,#F0C860 100%);
  --text-1:#180C02;--text-2:#3D2810;--text-3:#7A6045;
  --border:rgba(184,144,42,.22);--shadow:0 16px 48px rgba(18,11,4,.14);--r:14px;
}
body{background:var(--bg);font-family:'Barlow',sans-serif;color:var(--text-1);-webkit-font-smoothing:antialiased}
[dir=rtl]{font-family:'Vazirmatn',sans-serif}
[dir=rtl] *{font-family:inherit!important;letter-spacing:normal!important}
input,select,textarea,button{font-family:inherit}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--gold-2);border-radius:2px}

/* ── NAV ───────────────────────────────────────────────── */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:11px 36px;background:rgba(224,214,202,.96);backdrop-filter:blur(18px);border-bottom:1px solid var(--border)}
.nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
.nav-logo{width:38px;height:38px;object-fit:contain}
.nav-name{font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:900;letter-spacing:2px;background:var(--gold-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;white-space:nowrap}
.nav-links{display:flex;gap:24px;align-items:center}
.nav-link{font-family:'Barlow Condensed',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-2);text-decoration:none;transition:color .2s;white-space:nowrap}
.nav-link:hover{color:var(--gold-2)}
.nav-right{display:flex;align-items:center;gap:7px}
.lang-btn{padding:5px 12px;border:1.5px solid var(--border);background:transparent;color:var(--text-3);font-family:'Barlow Condensed',sans-serif;font-size:.78rem;font-weight:700;letter-spacing:2px;cursor:pointer;border-radius:6px;transition:all .2s}
.lang-btn.active{background:var(--gold-2);border-color:var(--gold-2);color:#fff}
.nav-cta{padding:7px 16px;background:var(--gold-grad);color:#1A0E06;font-family:'Barlow Condensed',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;border-radius:7px;text-decoration:none;white-space:nowrap;transition:opacity .2s}
.nav-cta:hover{opacity:.85}
.hamburger{display:none;align-items:center;justify-content:center;padding:6px;background:none;border:none;cursor:pointer;color:var(--text-1)}

/* Mobile menu overlay */
.mob-menu{position:fixed;inset:0;z-index:200;background:rgba(224,214,202,.98);backdrop-filter:blur(24px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;opacity:0;pointer-events:none;transition:opacity .25s}
.mob-menu.open{opacity:1;pointer-events:all}
.mob-close{position:absolute;top:18px;right:22px;background:none;border:none;font-size:2rem;cursor:pointer;color:var(--text-1);line-height:1;font-weight:300}
.mob-link{font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:var(--text-1);text-decoration:none;transition:color .2s}
[dir=rtl] .mob-link{font-family:'Vazirmatn',sans-serif;letter-spacing:0}
.mob-link:hover{color:var(--gold-2)}
.mob-langs{display:flex;gap:10px}
.mob-cta{padding:13px 36px;background:var(--gold-grad);color:#1A0E06;font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;border-radius:10px;text-decoration:none;margin-top:4px}
[dir=rtl] .mob-cta{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}

/* ── HERO ──────────────────────────────────────────────── */
.hero{min-height:100vh;display:flex;align-items:center;background:var(--bg-hero);position:relative;overflow:hidden;padding:88px 36px 56px}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(184,144,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,144,42,.04) 1px,transparent 1px);background-size:40px 40px}
.hero-glow{position:absolute;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(184,144,42,.1) 0%,transparent 68%);top:50%;left:38%;transform:translate(-50%,-50%);pointer-events:none}
.hero-inner{max-width:1200px;margin:0 auto;width:100%;display:flex;align-items:center;gap:52px;position:relative;z-index:1}
.hero-text{flex:1}
.hero-label{display:inline-flex;align-items:center;gap:10px;font-family:'Barlow Condensed',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold-3);margin-bottom:22px}
.hero-label::before{content:"";display:block;width:26px;height:1.5px;background:var(--gold-2)}
[dir=rtl] .hero-label::before{display:none}
[dir=rtl] .hero-label::after{content:"";display:block;width:26px;height:1.5px;background:var(--gold-2)}
.hero-h1{font-family:'Playfair Display',serif;font-size:clamp(4rem,10vw,8.5rem);font-weight:900;line-height:.9;background:var(--gold-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block}
[dir=rtl] .hero-h1{font-family:'Vazirmatn',sans-serif;line-height:1.3;padding-bottom:0.25em;overflow:visible}
.hero-h2{font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,5.5vw,4.8rem);font-weight:900;letter-spacing:10px;color:rgba(255,255,255,.1);text-transform:uppercase;display:block;margin-top:-4px}
.hero-sub{font-size:.97rem;font-weight:300;line-height:1.75;color:rgba(255,255,255,.52);max-width:440px;margin:22px 0 34px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.btn-gold{padding:12px 26px;background:var(--gold-grad);color:#1A0E06;font-family:'Barlow Condensed',sans-serif;font-size:.92rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;border:none;border-radius:9px;cursor:pointer;text-decoration:none;display:inline-block;transition:transform .2s,opacity .2s}
.btn-gold:hover{transform:translateY(-2px);opacity:.9}
.btn-outline{padding:12px 26px;background:transparent;color:rgba(255,255,255,.65);font-family:'Barlow Condensed',sans-serif;font-size:.92rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;border:1.5px solid rgba(184,144,42,.3);border-radius:9px;cursor:pointer;text-decoration:none;display:inline-block;transition:all .2s}
.btn-outline:hover{border-color:var(--gold-3);color:var(--gold-3)}
[dir=rtl] .btn-gold,[dir=rtl] .btn-outline{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.hero-img-wrap{flex:0 0 320px;position:relative}
.hero-img-frame{background:linear-gradient(135deg,rgba(184,144,42,.18),rgba(240,200,96,.06));border:1px solid rgba(184,144,42,.28);border-radius:20px;padding:2px;overflow:hidden}
.hero-img{width:100%;display:block;border-radius:18px;object-fit:cover;max-height:520px;object-position:top center}
.hero-badge{position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);background:var(--gold-grad);color:#1A0E06;font-family:'Barlow Condensed',sans-serif;font-size:.68rem;font-weight:900;letter-spacing:2px;text-transform:uppercase;padding:7px 18px;border-radius:8px;white-space:nowrap;box-shadow:0 8px 24px rgba(184,144,42,.35)}

/* ── SECTION COMMON ─────────────────────────────────────── */
.section{padding:88px 36px}
.section-inner{max-width:1200px;margin:0 auto}
.sec-label{font-family:'Barlow Condensed',sans-serif;font-size:.7rem;font-weight:800;letter-spacing:5px;text-transform:uppercase;color:var(--gold-2);margin-bottom:10px;display:flex;align-items:center;gap:10px}
.sec-label::before{content:"";display:block;width:22px;height:1.5px;background:var(--gold-2)}
.sec-label.light{color:var(--gold-3)}
.sec-label.light::before{background:var(--gold-3)}
.sec-label.center{justify-content:center}
.sec-label.center::before{display:none}
.sec-h{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,2.9rem);font-weight:700;color:var(--text-1);margin-bottom:48px;line-height:1.15}
.sec-h.white{color:rgba(255,255,255,.92)}
.sec-h.center{text-align:center}
[dir=rtl] .sec-h{font-family:'Vazirmatn',sans-serif}

/* ── SERVICES ───────────────────────────────────────────── */
.services-wrap{background:var(--bg)}
.srv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px}
.srv-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;transition:transform .25s,box-shadow .25s}
.srv-card:hover{transform:translateY(-6px);box-shadow:var(--shadow)}
.srv-card-header{height:170px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.srv-card-icon{position:relative;z-index:2;opacity:.92}
.srv-court-lines{position:absolute;inset:0;z-index:1}
.srv-card-body{padding:22px 20px}
.srv-name{font-family:'Barlow Condensed',sans-serif;font-size:1.15rem;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--text-1);margin-bottom:5px}
[dir=rtl] .srv-name{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.srv-meta{display:flex;align-items:center;gap:6px;margin-bottom:10px}
.srv-day{font-family:'Barlow Condensed',sans-serif;font-size:.9rem;font-weight:700;color:var(--gold-2)}
.srv-dot{color:var(--border);font-size:.7rem}
.srv-time{font-size:.82rem;color:var(--text-3)}
.srv-desc{font-size:.85rem;color:var(--text-2);line-height:1.6}

/* ── EVENTS ─────────────────────────────────────────────── */
.events-wrap{background:var(--bg-hero)}
.ev-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:22px}
.ev-card{background:rgba(255,255,255,.04);border:1px solid rgba(184,144,42,.18);border-radius:var(--r);overflow:hidden;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}
.ev-card:hover{transform:translateY(-5px);box-shadow:0 20px 60px rgba(0,0,0,.3)}
.ev-card-top{display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px;border-bottom:1px solid rgba(184,144,42,.1)}
.ev-icon-wrap{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(184,144,42,.12);flex-shrink:0}
.ev-sport-badge{font-family:'Barlow Condensed',sans-serif;font-size:.65rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--gold-3);background:rgba(184,144,42,.1);padding:4px 10px;border-radius:5px;border:1px solid rgba(184,144,42,.2);white-space:nowrap}
[dir=rtl] .ev-sport-badge{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.ev-card-body{padding:18px 20px;flex:1;display:flex;flex-direction:column;gap:12px}
.ev-title{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:#fff;line-height:1.2}
[dir=rtl] .ev-title{font-family:'Vazirmatn',sans-serif}
.ev-desc{font-size:.83rem;color:rgba(255,255,255,.52);line-height:1.6;flex:1}
.ev-meta{display:flex;flex-direction:column;gap:7px}
.ev-meta-row{display:flex;align-items:center;gap:8px;font-size:.82rem;color:rgba(255,255,255,.55)}
.ev-meta-row svg{flex-shrink:0;opacity:.7}
.ev-card-foot{padding:14px 20px;border-top:1px solid rgba(184,144,42,.1);display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.ev-badge{font-family:'Barlow Condensed',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:5px}
[dir=rtl] .ev-badge{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.ev-badge.free{background:rgba(80,200,120,.12);color:#5dc886;border:1px solid rgba(80,200,120,.2)}
.ev-badge.paid{background:rgba(184,144,42,.1);color:var(--gold-3);border:1px solid rgba(184,144,42,.2)}
.ev-badge.level{background:rgba(255,255,255,.06);color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.1)}
.ev-join{display:inline-flex;align-items:center;gap:6px;font-family:'Barlow Condensed',sans-serif;font-size:.78rem;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--gold-3);text-decoration:none;transition:color .2s}
[dir=rtl] .ev-join{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.ev-join:hover{color:var(--gold-4)}

[dir=rtl] .hero-h2{font-family:'Vazirmatn',sans-serif;line-height:1.2;text-transform:none;color:rgba(255,255,255,.12)}
/* ── TEAM ───────────────────────────────────────────────── */
.team-wrap{background:#1A0D06}
.founders-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.founder-card{background:rgba(255,255,255,.04);border:1px solid rgba(184,144,42,.18);border-radius:18px;overflow:hidden}
.founder-top{position:relative;overflow:hidden}
.founder-photo{width:100%;height:340px;object-fit:cover;object-position:top center;display:block}
.founder-name-bar{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(18,8,2,.98) 0%,rgba(18,8,2,.5) 55%,transparent 100%);padding:50px 20px 18px}
.founder-name{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#fff;display:block;margin-bottom:4px;line-height:1.2}
[dir=rtl] .founder-name{font-family:'Vazirmatn',sans-serif}
.founder-role{font-family:'Barlow Condensed',sans-serif;font-size:.68rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;background:var(--gold-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
[dir=rtl] .founder-role{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.founder-body{padding:20px 18px}
.founder-sub{font-size:.8rem;color:rgba(255,255,255,.38);font-family:'Barlow Condensed',sans-serif;letter-spacing:.5px;margin-bottom:14px}
[dir=rtl] .founder-sub{font-family:'Vazirmatn',sans-serif;letter-spacing:0}
.founder-proud{font-size:.83rem;color:rgba(255,255,255,.58);line-height:1.6;border-left:2px solid var(--gold-2);padding-left:10px;margin-bottom:14px;font-style:italic}
[dir=rtl] .founder-proud{border-left:none;border-right:2px solid var(--gold-2);padding-left:0;padding-right:10px}
.f-group-label{font-family:'Barlow Condensed',sans-serif;font-size:.64rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--gold-3);margin:12px 0 6px;display:flex;align-items:center;gap:8px}
.f-group-label::after{content:"";flex:1;height:1px;background:rgba(184,144,42,.18)}
[dir=rtl] .f-group-label{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
[dir=rtl] .f-group-label::after{display:none}
[dir=rtl] .f-group-label::before{content:"";flex:1;height:1px;background:rgba(184,144,42,.18)}
.f-list{list-style:none;display:flex;flex-direction:column;gap:5px}
.f-list li{font-size:.8rem;color:rgba(255,255,255,.55);line-height:1.5;padding-left:14px;position:relative}
.f-list li::before{content:"›";position:absolute;left:0;color:var(--gold-3);font-weight:700}
[dir=rtl] .f-list li{padding-left:0;padding-right:14px}
[dir=rtl] .f-list li::before{left:auto;right:0;content:"‹"}
.founder-msg{margin-top:14px;padding:14px;background:rgba(184,144,42,.06);border-radius:9px;border:1px solid rgba(184,144,42,.13);font-size:.82rem;color:rgba(255,255,255,.62);line-height:1.7;font-style:italic}
.founder-msg::before{content:'"';color:var(--gold-3);font-size:1.2rem;font-style:normal;line-height:0;vertical-align:-4px;margin-right:2px}
.founder-msg::after{content:'"';color:var(--gold-3);font-size:1.2rem;font-style:normal;line-height:0;vertical-align:-4px;margin-left:2px}

/* ── CONTACT ────────────────────────────────────────────── */
.contact-wrap{background:#231209;text-align:center}
.contact-sub{font-size:.94rem;color:rgba(255,255,255,.48);max-width:420px;margin:0 auto 36px;line-height:1.75}
.contact-btns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:22px}
.btn-ig{display:inline-flex;align-items:center;flex-direction:row;gap:9px;padding:13px 26px;border-radius:12px;background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);color:#fff;text-decoration:none;font-family:'Barlow Condensed',sans-serif;font-size:.95rem;font-weight:800;letter-spacing:.5px;text-transform:uppercase;border:none;cursor:pointer;transition:transform .2s,opacity .2s}
.btn-tg{display:inline-flex;align-items:center;flex-direction:row;gap:9px;padding:13px 26px;border-radius:12px;background:#229ED9;color:#fff;text-decoration:none;font-family:'Barlow Condensed',sans-serif;font-size:.95rem;font-weight:800;letter-spacing:.5px;text-transform:uppercase;border:none;cursor:pointer;transition:transform .2s,opacity .2s}
.btn-ig:hover,.btn-tg:hover{transform:translateY(-2px);opacity:.9}
[dir=rtl] .btn-ig,[dir=rtl] .btn-tg{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.contact-handle{font-family:'Barlow Condensed',sans-serif;font-size:.85rem;letter-spacing:1.5px;color:rgba(255,255,255,.28)}

/* ── FOOTER ─────────────────────────────────────────────── */
.footer{background:var(--bg-hero);padding:56px 36px 0}
.footer-inner{max-width:900px;margin:0 auto;text-align:center}
.footer-logo-wrap{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:10px}
.footer-logo-img{width:60px;height:60px;object-fit:contain;filter:drop-shadow(0 4px 16px rgba(184,144,42,.3))}
.footer-wordmark{font-family:'Barlow Condensed',sans-serif;font-size:1.6rem;font-weight:900;letter-spacing:4px;background:var(--gold-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.footer-tagline{font-family:'Barlow Condensed',sans-serif;font-size:.8rem;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:36px}
[dir=rtl] .footer-tagline{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.footer-nav{display:flex;justify-content:center;gap:0;flex-wrap:wrap;margin-bottom:32px}
.footer-nav a{font-family:'Barlow Condensed',sans-serif;font-size:.78rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.38);text-decoration:none;padding:6px 16px;position:relative;transition:color .2s}
.footer-nav a::after{content:"·";position:absolute;right:0;color:rgba(184,144,42,.2);font-weight:300}
.footer-nav a:last-child::after{display:none}
.footer-nav a:hover{color:var(--gold-3)}
[dir=rtl] .footer-nav a{font-family:'Vazirmatn',sans-serif;letter-spacing:0;text-transform:none}
.footer-socials{display:flex;justify-content:center;align-items:center;gap:20px;margin-bottom:36px}
.footer-soc-link{display:flex;align-items:center;gap:8px;text-decoration:none;color:rgba(255,255,255,.4);font-family:'Barlow Condensed',sans-serif;font-size:.8rem;font-weight:600;letter-spacing:1px;transition:color .2s}
.footer-soc-link:hover{color:var(--gold-3)}
[dir=rtl] .footer-soc-link{font-family:'Vazirmatn',sans-serif;letter-spacing:0}
.footer-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(184,144,42,.2),transparent);margin:0 -36px}
.footer-bottom{padding:20px 0;text-align:center}
.footer-copy{font-family:'Barlow Condensed',sans-serif;font-size:.75rem;letter-spacing:.5px;color:rgba(255,255,255,.2)}
[dir=rtl] .footer-copy{font-family:'Vazirmatn',sans-serif;letter-spacing:0}

/* ── RESPONSIVE ─────────────────────────────────────────── */
@media(max-width:860px){
  .hamburger{display:flex!important}
  .nav-links{display:none!important}
  .nav-cta{display:none!important}
  .nav{padding:11px 18px}
}
@media(max-width:680px){
  .hero{padding:76px 18px 44px;min-height:auto}
  .hero-inner{flex-direction:column;gap:28px}
  .hero-text{width:100%}
  .hero-img-wrap{width:100%;flex:none;max-width:100%}
  .hero-img{max-height:300px;object-position:top center}
  .hero-badge{font-size:.6rem;padding:6px 14px}
  .section{padding:60px 18px}
  .srv-grid{grid-template-columns:1fr}
  .ev-grid{grid-template-columns:1fr}
  .founders-grid{grid-template-columns:1fr;gap:20px}
  .founder-photo{height:280px}
  .contact-btns{flex-direction:column;align-items:center}
  .btn-ig,.btn-tg{width:260px;justify-content:center}
  .footer{padding:44px 18px 0}
  .footer-divider{margin:0 -18px}
  .footer-nav{gap:0}
}
`

/* ─── SPORT CARD PATTERN BACKGROUNDS ──────────────────────── */
function SrvCardBg({ sportKey }) {
  const colors = {
    sport:      { bg:"#1A0E06", lines:"rgba(212,170,74,0.15)" },
    volleyball: { bg:"#091828", lines:"rgba(74,130,220,0.15)" },
    padel:      { bg:"#0C1A0C", lines:"rgba(74,190,110,0.15)" },
    football:   { bg:"#1A0808", lines:"rgba(220,80,74,0.15)"  },
  }
  const { bg, lines } = colors[sportKey] || colors.sport
  return (
    <div style={{ position:"absolute", inset:0, background:bg }}>
      {sportKey === "volleyball" && (
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.7}} viewBox="0 0 170 140" preserveAspectRatio="xMidYMid slice">
          <line x1="85" y1="0" x2="85" y2="140" stroke={lines} strokeWidth="1.5"/>
          <line x1="0" y1="70" x2="170" y2="70" stroke={lines} strokeWidth="2"/>
          <path d="M85 70 Q110 40 140 35" stroke={lines} strokeWidth="1" fill="none"/>
          <path d="M85 70 Q60 40 30 35" stroke={lines} strokeWidth="1" fill="none"/>
        </svg>
      )}
      {sportKey === "padel" && (
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.7}} viewBox="0 0 170 140" preserveAspectRatio="xMidYMid slice">
          <rect x="20" y="15" width="130" height="110" stroke={lines} strokeWidth="1.5" fill="none" rx="3"/>
          <line x1="20" y1="70" x2="150" y2="70" stroke={lines} strokeWidth="2"/>
          <line x1="85" y1="15" x2="85" y2="125" stroke={lines} strokeWidth="1" strokeDasharray="4 4"/>
        </svg>
      )}
      {sportKey === "football" && (
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.7}} viewBox="0 0 170 140" preserveAspectRatio="xMidYMid slice">
          <circle cx="85" cy="70" r="55" stroke={lines} strokeWidth="1.5" fill="none"/>
          <circle cx="85" cy="70" r="5" stroke={lines} strokeWidth="1" fill="none"/>
          <line x1="85" y1="15" x2="85" y2="125" stroke={lines} strokeWidth="1" strokeDasharray="3 5"/>
        </svg>
      )}
      {sportKey === "sport" && (
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.65}} viewBox="0 0 170 140" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="85" cy="70" rx="60" ry="55" stroke={lines} strokeWidth="1.5" fill="none"/>
          <ellipse cx="85" cy="70" rx="35" ry="32" stroke={lines} strokeWidth="1" fill="none"/>
          <line x1="25" y1="70" x2="145" y2="70" stroke={lines} strokeWidth="1.5"/>
        </svg>
      )}
    </div>
  )
}

/* ─── FOUNDER CARD ─────────────────────────────────────────── */
function FounderCard({ photo, data }) {
  return (
    <div className="founder-card">
      <div className="founder-top">
        <img src={photo} alt={data.name} className="founder-photo" />
        <div className="founder-name-bar">
          <span className="founder-name">{data.name}</span>
          <span className="founder-role">{data.role}</span>
        </div>
      </div>
      <div className="founder-body">
        <p className="founder-sub">{data.sub}</p>
        {data.proud && <p className="founder-proud">{data.proud}</p>}
        {data.b_label && <>
          <p className="f-group-label">{data.b_label}</p>
          <ul className="f-list">{data.b.map((x,i)=><li key={i}>{x}</li>)}</ul>
          <p className="f-group-label">{data.a_label}</p>
          <ul className="f-list">{data.a.map((x,i)=><li key={i}>{x}</li>)}</ul>
        </>}
        {data.s_label && <>
          <p className="f-group-label">{data.s_label}</p>
          <ul className="f-list">{data.s.map((x,i)=><li key={i}>{x}</li>)}</ul>
          <p className="f-group-label">{data.c_label}</p>
          <ul className="f-list">{data.c.map((x,i)=><li key={i}>{x}</li>)}</ul>
          <p className="f-group-label">{data.e_label}</p>
          <ul className="f-list">{data.e.map((x,i)=><li key={i}>{x}</li>)}</ul>
        </>}
        <p className="founder-msg">{data.msg}</p>
      </div>
    </div>
  )
}

/* ─── MAIN ─────────────────────────────────────────────────── */
export default function ParsSport() {
  const [lang, setLang]     = useState("de")
  const [menuOpen, setMenu] = useState(false)
  const rtl = lang === "fa"
  const t   = T[lang]
  const close = () => setMenu(false)

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <style>{CSS}</style>

      {/* MOBILE OVERLAY */}
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        <button className="mob-close" onClick={close}>×</button>
        <a href="#services" className="mob-link" onClick={close}>{t.nav.services}</a>
        <a href="#events"   className="mob-link" onClick={close}>{t.nav.events}</a>
        <a href="#team"     className="mob-link" onClick={close}>{t.nav.team}</a>
        <a href="#contact"  className="mob-link" onClick={close}>{t.nav.contact}</a>
        <div className="mob-langs">
          <button className={"lang-btn"+(lang==="de"?" active":"")} onClick={()=>{setLang("de");close()}}>DE</button>
          <button className={"lang-btn"+(lang==="fa"?" active":"")} onClick={()=>{setLang("fa");close()}}>FA</button>
        </div>
        <a href="#contact" className="mob-cta" onClick={close}>{t.nav.cta}</a>
      </div>

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-brand">
          <img src={LOGO_SRC} alt="Pars Sport" className="nav-logo" />
          <span className="nav-name">PARS SPORT</span>
        </a>
        <div className="nav-links">
          <a href="#services" className="nav-link">{t.nav.services}</a>
          <a href="#events"   className="nav-link">{t.nav.events}</a>
          <a href="#team"     className="nav-link">{t.nav.team}</a>
          <a href="#contact"  className="nav-link">{t.nav.contact}</a>
        </div>
        <div className="nav-right">
          <button className={"lang-btn"+(lang==="de"?" active":"")} onClick={()=>setLang("de")}>DE</button>
          <button className={"lang-btn"+(lang==="fa"?" active":"")} onClick={()=>setLang("fa")}>FA</button>
          <a href="#contact" className="nav-cta">{t.nav.cta}</a>
          <button className="hamburger" onClick={()=>setMenu(true)} aria-label="Menu">
            <Ic.Menu s={22}/>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-grid"/>
        <div className="hero-glow"/>
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-label">{t.hero.tagline}</div>
            <span className="hero-h1">{t.hero.h1}</span>
            <span className="hero-h2">{t.hero.h2}</span>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-btns">
              <a href="#services" className="btn-gold">{t.hero.cta1}</a>
              <a href="#contact"  className="btn-outline">{t.hero.cta2}</a>
            </div>
          </div>
          <div className="hero-img-wrap">
            <div className="hero-img-frame">
              <img src={REY_SRC} alt="Reyhaneh Amro" className="hero-img"/>
            </div>
            <div className="hero-badge">PARS SPORT · DÜSSELDORF</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-wrap" id="services">
        <div className="section-inner">
          <p className="sec-label">{t.services.label}</p>
          <h2 className="sec-h">{t.services.h}</h2>
          <div className="srv-grid">
            {t.services.items.map((s,i) => {
              const Icon = SPORT_ICONS[s.key]
              return (
                <div className="srv-card" key={i}>
                  <div className="srv-card-header">
                    <SrvCardBg sportKey={s.key}/>
                    <div className="srv-card-icon">
                      <Icon s={60} c="rgba(212,170,74,0.88)"/>
                    </div>
                  </div>
                  <div className="srv-card-body">
                    <div className="srv-name">{s.name}</div>
                    <div className="srv-meta">
                      <span className="srv-day">{s.day}</span>
                      {s.time && <><span className="srv-dot">·</span><span className="srv-time">{s.time}</span></>}
                    </div>
                    <p className="srv-desc">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="section events-wrap" id="events">
        <div className="section-inner">
          <p className="sec-label light">{t.events.label}</p>
          <h2 className="sec-h white">{t.events.h}</h2>
          <div className="ev-grid">
            {t.events.items.map((ev, i) => {
              const Icon = SPORT_ICONS[ev.key]
              return (
                <div className="ev-card" key={i}>
                  <div className="ev-card-top">
                    <div className="ev-icon-wrap"><Icon s={26} c="rgba(212,170,74,0.9)"/></div>
                    <span className="ev-sport-badge">{ev.day}</span>
                  </div>
                  <div className="ev-card-body">
                    <div className="ev-title">{ev.name}</div>
                    <p className="ev-desc">{ev.desc}</p>
                    <div className="ev-meta">
                      <div className="ev-meta-row">
                        <Ic.Clock s={15} c="rgba(212,170,74,.7)"/>
                        <span>{ev.time}</span>
                      </div>
                      <div className="ev-meta-row">
                        <Ic.Pin s={15} c="rgba(212,170,74,.7)"/>
                        <span>{ev.loc}</span>
                      </div>
                      <div className="ev-meta-row">
                        <Ic.Users s={15} c="rgba(212,170,74,.7)"/>
                        <span>{ev.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ev-card-foot">
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <span className={`ev-badge ${ev.free ? "free" : "paid"}`}>
                        {ev.free ? t.events.badge_free : t.events.badge_reg}
                      </span>
                    </div>
                    <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="ev-join">
                      {t.events.cta} <Ic.Arrow s={14} c="currentColor"/>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section team-wrap" id="team">
        <div className="section-inner">
          <p className="sec-label light">{t.team.label}</p>
          <h2 className="sec-h white">{t.team.h}</h2>
          <div className="founders-grid">
            <FounderCard photo={REY_SRC} data={t.team.reyhaneh}/>
            <FounderCard photo={PEY_SRC} data={t.team.peymaneh}/>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-wrap" id="contact">
        <div className="section-inner">
          <p className="sec-label center light">{t.contact.label}</p>
          <h2 className="sec-h white center">{t.contact.h}</h2>
          <p className="contact-sub">{t.contact.sub}</p>
          <div className="contact-btns">
            <a href={IG_LINK} target="_blank" rel="noopener noreferrer" className="btn-ig">
              <Ic.Instagram s={18} c="#fff"/><span>{t.contact.ig_btn}</span>
            </a>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn-tg">
              <Ic.Telegram s={18} c="#fff"/><span>{t.contact.tg_btn}</span>
            </a>
          </div>
          <p className="contact-handle">{t.footer.ig}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo-wrap">
            <img src={LOGO_SRC} alt="Pars Sport" className="footer-logo-img"/>
            <span className="footer-wordmark">PARS SPORT</span>
          </div>
          <p className="footer-tagline">{t.footer.tagline}</p>
          <nav className="footer-nav">
            {t.footer.links.map((l,i)=>(
              <a key={i} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <div className="footer-socials">
            <a href={IG_LINK} target="_blank" rel="noopener noreferrer" className="footer-soc-link">
              <Ic.Instagram s={18} c="currentColor"/>
              <span>{t.footer.ig}</span>
            </a>
            <div style={{width:1,height:18,background:"rgba(184,144,42,.2)"}}/>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="footer-soc-link">
              <Ic.Telegram s={18} c="currentColor"/>
              <span>Telegram</span>
            </a>
          </div>
        </div>
        <div className="footer-divider"/>
        <div className="footer-bottom">
          <p className="footer-copy">{t.footer.copy}</p>
        </div>
      </footer>
    </div>
  )
}
