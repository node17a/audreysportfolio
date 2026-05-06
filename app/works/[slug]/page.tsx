import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AutoPlayVideo from '@/components/AutoPlayVideo'
import { projects, getProject } from '@/lib/projects'
import { sfPro, mono } from '@/lib/fonts'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

type Props = { params: { slug: string } }

// Parse **bold** syntax into React nodes
function parseBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ fontWeight: 500, color: '#111' }}>{part}</strong>
      : part
  )
}

// Section label — same across all sections
function Label({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily: mono,
      fontSize: '0.55rem',
      color: '#888',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      margin: '0 0 6px',
    }}>
      [{text}]
    </p>
  )
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const currentIdx = projects.findIndex(p => p.slug === params.slug)
  const nextProjects = [1, 2].map(offset => projects[(currentIdx + offset) % projects.length])

  return (
    <>
      <Navbar />
      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO: tag + H1 + subtitle paragraph + skip link ── */}
        <div className="cs-hero-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '160px 48px 72px' }}>
          <p style={{
            fontFamily: mono,
            fontSize: '0.58rem',
            color: '#bbb',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            margin: '0 0 24px',
          }}>
            [{project.tags.join(' · ')}]
          </p>

          <h1 style={{
            fontFamily: sfPro,
            fontWeight: 400,
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            color: '#111',
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            margin: '0 0 28px',
          }}>
            {project.h1}
          </h1>

          <p style={{
            fontFamily: sfPro,
            fontWeight: 300,
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: '#666',
            lineHeight: 1.75,
            margin: '0 0 28px',
            maxWidth: 640,
          }}>
            {project.subtitleParagraph}
          </p>

          <a
            href="#final"
            style={{
              fontFamily: mono,
              fontSize: '0.62rem',
              color: '#bbb',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              borderBottom: '1px solid #e8e8e8',
              paddingBottom: 2,
            }}
          >
            Skip to Final Design ↓
          </a>
        </div>

        {/* ── SHOWCASE IMAGES ── */}
        <div className="cs-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px 72px' }}>
          {project.showcaseImages.length === 1 ? (
            <div style={{ borderRadius: 16, overflow: 'hidden' }}>
              <img
                src={project.showcaseImages[0]}
                alt={project.title}
                style={{
                  width: '100%', display: 'block', maxHeight: 580,
                  objectFit: project.showcaseImages[0].endsWith('.png') ? 'contain' : 'cover',
                }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 16 }}>
              {project.showcaseImages.map((src, i) => (
                <div key={i} style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}>
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: '100%', display: 'block', maxHeight: 500,
                      objectFit: src.endsWith('.png') ? 'contain' : 'cover',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── METADATA: SCOPE | ROLE ── */}
        <div className="cs-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px 96px' }}>
          <div className="cs-grid-2" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            borderTop: '1px solid #f0f0ec',
            paddingTop: 32,
          }}>
            {[
              { label: 'SCOPE', value: project.scope },
              { label: 'ROLE',  value: project.role  },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{
                  fontFamily: mono,
                  fontSize: '0.52rem',
                  color: '#ccc',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  margin: '0 0 10px',
                }}>
                  {label}
                </p>
                <p style={{
                  fontFamily: sfPro,
                  fontSize: '0.9rem',
                  color: '#444',
                  fontWeight: 300,
                  margin: 0,
                  lineHeight: 1.65,
                  whiteSpace: 'pre-line',
                }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROBLEM SPACE ── */}
        <div className="cs-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px 96px' }}>
          <Label text="PROBLEM SPACE" />
          <h2 style={{
            fontFamily: sfPro,
            fontWeight: 400,
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            margin: '0 0 28px',
          }}>
            {project.problemSpaceHeading}
          </h2>
          <p style={{
            fontFamily: sfPro,
            fontWeight: 300,
            fontSize: '1rem',
            color: '#555',
            lineHeight: 1.85,
            margin: 0,
          }}>
            {parseBold(project.problemSpace)}
          </p>
        </div>

        {/* ── CONCEPT ── */}
        <div className="cs-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px 96px' }}>
          <Label text="CONCEPT" />
          <h2 style={{
            fontFamily: sfPro,
            fontWeight: 400,
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            margin: '0 0 28px',
          }}>
            {project.conceptHeading}
          </h2>
          <p style={{
            fontFamily: sfPro,
            fontWeight: 300,
            fontSize: '1rem',
            color: '#555',
            lineHeight: 1.85,
            margin: 0,
          }}>
            {project.concept}
          </p>
        </div>

        {/* ── PROCESS ── */}
        <div className="cs-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px 96px' }}>
          <Label text="PROCESS" />
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 64 }}>
            {project.processSections.map((section, i) => (
              <div key={i}>
                <h3 style={{
                  fontFamily: sfPro,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: '#111',
                  letterSpacing: '-0.01em',
                  margin: '0 0 14px',
                }}>
                  {section.title}
                </h3>
                <p style={{
                  fontFamily: sfPro,
                  fontWeight: 300,
                  fontSize: '0.97rem',
                  color: '#555',
                  lineHeight: 1.85,
                  margin: section.image || section.video ? '0 0 28px' : '0',
                }}>
                  {parseBold(section.body)}
                </p>
                {section.video && (
                  <figure style={{ margin: 0 }}>
                    <div style={{ borderRadius: 14, overflow: 'hidden' }}>
                      <AutoPlayVideo
                        src={section.video}
                        style={{ width: '100%', display: 'block' }}
                      />
                    </div>
                    {section.imageCaption && (
                      <figcaption style={{ fontFamily: mono, fontSize: '0.66rem', color: '#888', letterSpacing: '0.04em', marginTop: 12, lineHeight: 1.5 }}>
                        {section.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {section.image && !section.video && (
                  <figure style={{ margin: 0 }}>
                    <div style={{ borderRadius: 14, overflow: 'hidden' }}>
                      <img
                        src={section.image}
                        alt={section.imageCaption ?? section.title}
                        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                      />
                    </div>
                    {section.imageCaption && (
                      <figcaption style={{ fontFamily: mono, fontSize: '0.66rem', color: '#888', letterSpacing: '0.04em', marginTop: 12, lineHeight: 1.5 }}>
                        {section.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {section.image2 && (
                  <figure style={{ margin: '24px 0 0' }}>
                    <div style={{ borderRadius: 14, overflow: 'hidden' }}>
                      <img
                        src={section.image2}
                        alt={section.imageCaption2 ?? section.title}
                        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                      />
                    </div>
                    {section.imageCaption2 && (
                      <figcaption style={{ fontFamily: mono, fontSize: '0.66rem', color: '#888', letterSpacing: '0.04em', marginTop: 12, lineHeight: 1.5 }}>
                        {section.imageCaption2}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── FINAL DESIGN ── */}
        {project.finalImages.length > 0 && (
          <div id="final" className="cs-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px 96px' }}>
            <Label text="FINAL DESIGN" />
            <h2 style={{
              fontFamily: sfPro,
              fontWeight: 400,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              color: '#111',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              margin: '0 0 20px',
            }}>
              {project.title}
            </h2>
            <p style={{
              fontFamily: sfPro,
              fontWeight: 300,
              fontSize: '0.97rem',
              color: '#666',
              lineHeight: 1.8,
              margin: '0 0 48px',
              maxWidth: 580,
            }}>
              {project.meetTheWork}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {project.finalImages.map((img, i) => (
                <figure key={i} style={{ margin: 0 }}>
                  <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '16/9' }}>
                    {img.isVideo ? (
                      <AutoPlayVideo
                        src={img.src}
                        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={img.src}
                        alt={img.caption}
                        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  {img.caption && (
                    <figcaption style={{ fontFamily: mono, fontSize: '0.66rem', color: '#888', letterSpacing: '0.04em', marginTop: 12, lineHeight: 1.5 }}>
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* ── REFLECTION ── */}
        {project.reflection.length > 0 && (
          <div className="cs-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px 96px' }}>
            <Label text="REFLECTION" />
            <h2 style={{
              fontFamily: sfPro,
              fontWeight: 400,
              fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
              color: '#111',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              margin: '0 0 40px',
            }}>
              {project.reflectionHeading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {project.reflection.map((item, i) => (
                <div key={i}>
                  <h3 style={{
                    fontFamily: sfPro,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: '#111',
                    letterSpacing: '-0.01em',
                    margin: '0 0 12px',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: sfPro,
                    fontWeight: 300,
                    fontSize: '0.97rem',
                    color: '#555',
                    lineHeight: 1.85,
                    margin: 0,
                  }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SOURCE CODE ── */}
        {project.sourceCode && (
          <div className="cs-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px 96px' }}>
            <Label text="SOURCE CODE" />
            <a
              href={project.sourceCode.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: sfPro,
                fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
                fontWeight: 400,
                color: '#111',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                textDecoration: 'none',
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: 2,
                display: 'inline-block',
              }}
            >
              {project.sourceCode.label} ↗
            </a>
          </div>
        )}

        {/* ── INTERESTED IN MORE? ── */}
        <div className="cs-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 48px 40px' }}>
          <Label text="INTERESTED IN MORE?" />
          <h2 style={{
            fontFamily: sfPro,
            fontWeight: 400,
            fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            margin: '0 0 32px',
          }}>
            See the next projects here →
          </h2>

          <div className="cs-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {nextProjects.map((p) => (
              <Link key={p.slug} href={`/works/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  background: '#f9f9f8',
                  border: '1px solid #ebebE8',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}>
                  <div style={{ background: p.bg, aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '14px 16px 18px' }}>
                    <p style={{ fontFamily: mono, fontSize: '0.52rem', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>
                      [{p.tags.slice(0, 2).join(', ')}]
                    </p>
                    <p style={{ fontFamily: sfPro, fontSize: '0.92rem', fontWeight: 500, color: '#111', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                      {p.title}
                    </p>
                    <p style={{ fontFamily: sfPro, fontSize: '0.75rem', color: '#aaa', fontWeight: 300, margin: 0, lineHeight: 1.5 }}>
                      {p.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link
              href="/works"
              style={{ fontFamily: mono, fontSize: '0.6rem', color: '#bbb', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid #e8e8e8', paddingBottom: 2 }}
            >
              view all works →
            </Link>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="cs-pad cs-footer-flex" style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: '40px 48px 100px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #f0f0ec',
          marginTop: 32,
        }}>
          <Link
            href="/works"
            style={{ fontFamily: mono, fontSize: '0.6rem', color: '#ccc', textDecoration: 'none', letterSpacing: '0.06em' }}
          >
            ← all works
          </Link>
          <span style={{ fontFamily: sfPro, fontSize: '0.85rem', color: '#ccc' }}>
            Thanks for stopping by! :)
          </span>
        </div>

      </main>
    </>
  )
}
