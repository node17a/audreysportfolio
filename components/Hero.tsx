import Terminal from './Terminal'

const polaroids = [
  { gradient: 'from-pink-200 to-rose-300',     rotate: '-rotate-2' },
  { gradient: 'from-sky-200 to-blue-300',      rotate: 'rotate-3'  },
  { gradient: 'from-amber-200 to-yellow-300',  rotate: '-rotate-1' },
  { gradient: 'from-emerald-200 to-green-300', rotate: 'rotate-2'  },
  { gradient: 'from-violet-200 to-purple-300', rotate: '-rotate-3' },
  { gradient: 'from-orange-200 to-red-200',    rotate: 'rotate-1'  },
  { gradient: 'from-teal-200 to-cyan-300',     rotate: '-rotate-2' },
]

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="#F5C842">
    <path d="M6 0l1 5 5 1-5 1-1 5-1-5-5-1 5-1z" />
  </svg>
)

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: '100vh',
        backgroundColor: '#F5F4F1',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* ────────────────── MOBILE LAYOUT ────────────────── */}
      <div className="md:hidden flex flex-col items-center justify-center h-full pt-24 pb-12 px-6 gap-8">
        <div className="text-center">
          <h1
            className="font-dancing"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 5rem)', color: '#1a1a1a', fontWeight: 700, lineHeight: 1 }}
          >
            Audrey Leo
          </h1>
          <p className="mt-4 text-[#888888]" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
            A CREATIVE. A TECHNOLOGIST. IN BETWEEN.
          </p>
        </div>

        <Terminal className="w-full max-w-xs">
          <p><span className="text-[#4ADE80]">~ $ whoami</span></p>
          <p className="text-gray-300">Creative &amp; Technologist @ UCL Slade</p>
          <p>&nbsp;</p>
          <p><span className="text-[#4ADE80]">~ $ ls interests/</span></p>
          <p className="text-gray-300">arduino/ p5js/ c++/ illustration/ ux</p>
          <p>
            <span className="text-[#4ADE80]">~ $ </span>
            <span className="inline-block w-2 h-4 bg-[#4ADE80] cursor-blink align-middle" />
          </p>
        </Terminal>

        <div className="flex flex-col items-center">
          <div className="w-1 h-12 bg-black rounded" />
          <div className="bg-[#1a1a1a] rounded-2xl w-44 p-5 shadow-xl">
            <p className="text-white font-semibold text-base">Audrey Leo</p>
            <p className="text-gray-400 text-xs mt-0.5">Art &amp; Technology</p>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mx-auto mt-3" />
          </div>
        </div>
      </div>

      {/* ────────────────── DESKTOP SCATTER ────────────────── */}
      <div className="hidden md:block relative w-full h-full">

        {/* Center — Name + tagline */}
        <div
          className="absolute text-center"
          style={{ top: '38%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
        >
          <h1
            className="font-dancing"
            style={{ fontSize: 'clamp(5rem, 9vw, 8rem)', color: '#1a1a1a', fontWeight: 700, lineHeight: 1 }}
          >
            Audrey Leo
          </h1>
          <p className="mt-8 text-[#888888]" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
            A CREATIVE. A TECHNOLOGIST. IN BETWEEN.
          </p>
        </div>

        {/* Left — Badge / Lanyard */}
        <div
          className="absolute float float-delay-1"
          style={{ top: '12%', left: '3%', '--rotation': '-2deg' } as React.CSSProperties}
        >
          <div className="-rotate-[2deg]">
            <div className="w-1 h-16 bg-black mx-auto rounded" />
            <div className="bg-[#1a1a1a] rounded-2xl w-48 p-5 shadow-xl">
              <div className="flex gap-3 items-start">
                <p
                  className="text-white text-[9px] tracking-widest uppercase flex-shrink-0"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  AUDREY LEO · DESIGNER
                </p>
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg leading-tight">Audrey Leo</p>
                  <p className="text-gray-400 text-xs mt-1">Art &amp; Technology</p>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mx-auto mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left — Vinyl / Playlist card */}
        <div
          className="absolute float float-delay-2"
          style={{ top: '52%', left: '3%', '--rotation': '0deg' } as React.CSSProperties}
        >
          <div className="bg-white rounded-2xl w-48 p-4 shadow-md">
            <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto">
              <circle cx="40" cy="40" r="38" fill="#1a1a1a" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#2a2a2a" strokeWidth="2" />
              <circle cx="40" cy="40" r="22" fill="none" stroke="#2a2a2a" strokeWidth="2" />
              <circle cx="40" cy="40" r="14" fill="none" stroke="#2a2a2a" strokeWidth="2" />
              <circle cx="40" cy="40" r="5"  fill="#22C55E" />
            </svg>
            <p className="text-center text-gray-400 text-[9px] tracking-widest uppercase mt-2">PLAYLIST</p>
            <p className="text-center font-bold text-base mt-0.5">Vibe Coding</p>
            <p className="text-center text-gray-400 text-xs mt-0.5">X projects and counting</p>
            <p className="text-center text-gray-400 text-[10px] mt-0.5">Learning by building</p>
          </div>
        </div>

        {/* Top center — Ripped paper */}
        <div
          className="absolute float float-delay-3"
          style={{ top: '5%', left: '22%', '--rotation': '1deg' } as React.CSSProperties}
        >
          <div
            className="rotate-[1deg] bg-white shadow-md"
            style={{
              width: '380px',
              paddingBottom: '2.5rem',
              clipPath:
                'polygon(0 0,100% 0,100% 82%,97% 90%,94% 80%,91% 88%,88% 78%,85% 87%,82% 77%,79% 85%,76% 75%,73% 83%,70% 73%,67% 81%,64% 71%,61% 79%,58% 69%,55% 77%,52% 67%,49% 75%,46% 65%,43% 73%,40% 63%,37% 71%,34% 63%,31% 71%,28% 61%,25% 69%,22% 61%,19% 69%,16% 59%,13% 67%,10% 59%,7% 67%,4% 59%,0 65%)',
            }}
          >
            <div className="flex items-center justify-center gap-8 px-10 pt-6 pb-6">
              <span className="text-6xl" style={{ transform: 'rotate(-5deg)', display: 'inline-block' }}>🌿</span>
              <span className="text-4xl" style={{ transform: 'rotate(3deg)',  display: 'inline-block' }}>☕</span>
              <span className="text-3xl" style={{ transform: 'rotate(-8deg)', display: 'inline-block' }}>✏️</span>
              <div
                className="w-16 h-12 bg-[#E8D5A3] rounded-sm shadow-sm"
                style={{ transform: 'rotate(6deg)' }}
              />
            </div>
          </div>
        </div>

        {/* Top right — Event ticket */}
        <div
          className="absolute float float-delay-1"
          style={{ top: '8%', right: '6%', '--rotation': '2deg' } as React.CSSProperties}
        >
          <div className="rotate-[2deg] bg-white border-2 border-black rounded-lg w-72 shadow-lg flex overflow-hidden">
            <div className="flex-1 p-5">
              <p className="font-bold text-2xl leading-tight">ART × TECHNOLOGY</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <p className="text-xs text-gray-500">Design tour</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-gray-500">
                <span>Time: Anytime</span>
                <span>Price: Free</span>
                <span>Location: London + Online</span>
                <span>Open worldwide</span>
              </div>
              <p className="mt-3 text-[9px] tracking-widest text-gray-400 uppercase">EST. 2024 · PRESENT</p>
            </div>
            <div className="w-16 border-l-2 border-dashed border-black flex flex-col items-center justify-center gap-3 p-2">
              <p
                className="text-[9px] font-bold tracking-widest"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                AUDREY LEO
              </p>
              <div className="flex gap-[2px] items-end">
                {[3, 6, 2, 8, 4, 7, 3, 5, 9, 2].map((h, i) => (
                  <div key={i} className="w-[2px] bg-black" style={{ height: `${h * 3}px` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Polaroid board */}
        <div
          className="absolute float float-delay-4"
          style={{ top: '15%', right: '-1%', '--rotation': '1deg' } as React.CSSProperties}
        >
          <div className="rotate-[1deg] bg-[#C8A97E] rounded-2xl p-4 shadow-2xl relative" style={{ width: '340px' }}>
            <div className="grid grid-cols-3 gap-1">
              {polaroids.map((p, i) => (
                <div key={i} className={`bg-white p-1.5 pb-6 shadow-md ${p.rotate}`}>
                  <div className={`h-24 w-full rounded-sm bg-gradient-to-br ${p.gradient}`} />
                </div>
              ))}
            </div>
            <p
              className="font-dancing text-white text-xl absolute bottom-3 right-4"
              style={{ transform: 'rotate(-8deg)' }}
            >
              capture moments
            </p>
          </div>
        </div>

        {/* Center-bottom left — Mac folder */}
        <div
          className="absolute float float-delay-5"
          style={{ bottom: '20%', left: '30%', '--rotation': '-3deg' } as React.CSSProperties}
        >
          <div className="-rotate-[3deg] relative" style={{ width: '128px' }}>
            <div className="w-16 h-4 bg-[#F5C842] rounded-t-lg absolute top-0 left-4" />
            <div className="w-32 h-24 bg-[#F5C842] rounded-b-xl rounded-tr-xl shadow-lg mt-3 relative overflow-hidden">
              <div className="absolute inset-2 bg-[#FBDA61] rounded-xl" />
            </div>
          </div>
        </div>

        {/* Center — Terminal */}
        <div
          className="absolute float float-delay-3"
          style={{ bottom: '10%', left: '40%', '--rotation': '0deg' } as React.CSSProperties}
        >
          <Terminal className="w-80">
            <p><span className="text-[#4ADE80]">~ $ whoami</span></p>
            <p className="text-gray-300">Creative &amp; Technologist @ UCL Slade</p>
            <p>&nbsp;</p>
            <p><span className="text-[#4ADE80]">~ $ ls interests/</span></p>
            <p className="text-gray-300">arduino/ p5js/ c++/ illustration/ ux</p>
            <p>
              <span className="text-[#4ADE80]">~ $ </span>
              <span className="inline-block w-2 h-4 bg-[#4ADE80] cursor-blink align-middle" />
            </p>
          </Terminal>
        </div>

        {/* Bottom-left — Flower vase */}
        <div
          className="absolute float float-delay-1"
          style={{ bottom: '28%', left: '22%', '--rotation': '5deg' } as React.CSSProperties}
        >
          <div
            className="w-20 h-28 bg-white shadow-md flex items-end justify-center pb-3"
            style={{ borderRadius: '50% 50% 0 0', transform: 'rotate(5deg)' }}
          >
            <span className="text-3xl">🌸</span>
          </div>
        </div>

        {/* ✦ stars */}
        <div className="absolute" style={{ top: '25%', left: '48%' }}>
          <StarIcon />
        </div>
        <div className="absolute" style={{ top: '70%', right: '35%' }}>
          <StarIcon />
        </div>

        {/* Black dot */}
        <div
          className="absolute w-4 h-4 rounded-full bg-black"
          style={{ bottom: '30%', right: '42%' }}
        />

      </div>
    </section>
  )
}
