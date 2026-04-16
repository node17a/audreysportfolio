interface TerminalProps {
  children: React.ReactNode
  className?: string
}

export default function Terminal({ children, className = '' }: TerminalProps) {
  return (
    <div className={`bg-[#1C1C1E] rounded-xl overflow-hidden shadow-2xl ${className}`}>
      {/* Title bar */}
      <div className="bg-[#2C2C2E] px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="text-xs text-gray-400 mx-auto">audrey-leo — zsh</span>
      </div>
      {/* Body */}
      <div className="p-4 font-mono text-sm space-y-1">
        {children}
      </div>
    </div>
  )
}
