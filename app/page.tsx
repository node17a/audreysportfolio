import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Works />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
