'use client'
import CustomCursor from './CustomCursor'
import IntroVideo from './IntroVideo'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroVideo />
      <CustomCursor />
      {children}
    </>
  )
}
