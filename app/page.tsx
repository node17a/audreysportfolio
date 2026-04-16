import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Playground from '@/components/Playground'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Works />
        <Playground />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
