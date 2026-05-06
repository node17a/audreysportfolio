import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Works from '@/components/Works'
import DesignExperiments from '@/components/DesignExperiments'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Works />
        <DesignExperiments />
        <Contact />
      </main>
    </>
  )
}
