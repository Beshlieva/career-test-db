interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: '#FAF8F3' }}>
      {/* Decorative top band */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #FDE68A, #FCD34D, #FAD4BF, #FACBC0)' }} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-8"
            style={{ backgroundColor: '#FEF3C7', color: '#92700A', border: '1px solid #FDE68A' }}
          >
            Профориентационный тест
          </div>

          {/* Title */}
          <h1
            className="mb-4 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
              color: '#2A2520',
              letterSpacing: '-0.01em',
            }}
          >
            Карта интересов
          </h1>

          {/* Subtitle */}
          <p
            className="mb-12 mx-auto"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              color: '#7A726A',
              maxWidth: 400,
              lineHeight: 1.65,
            }}
          >
            Исследуйте свои профессиональные интересы. 174 вопроса, 29 направлений, честный результат.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mb-12">
            {[
              { num: '174', label: 'вопроса' },
              { num: '29', label: 'направлений' },
              { num: '15–20', label: 'минут' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#2A2520' }}>
                  {item.num}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9CA3AF', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            className="px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              boxShadow: '0 4px 20px rgba(217, 119, 6, 0.35)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Начать исследование
          </button>

          {/* Caption */}
          <p className="mt-6 text-xs" style={{ color: '#B5AFA8' }}>
            Методика А.Е. Голомштока · адаптированная версия
          </p>
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="text-center pb-8">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 6, height: 6,
                backgroundColor: ['#FDE68A','#FCD34D','#E5E3DE','#FAD4BF','#FACBC0'][i],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
