import Navigation from '@/components/Navigation';
import Hero       from '@/components/Hero';
import About      from '@/components/About';
import Menu       from '@/components/Menu';
import Reviews    from '@/components/Reviews';
import Location   from '@/components/Location';
import Contact    from '@/components/Contact';
import Footer     from '@/components/Footer';

export default function HomePage() {
  return (
    <main style={{ background:'var(--bg)', overflowX:'hidden' }}>
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Reviews />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
}
