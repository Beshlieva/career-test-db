interface InstructionsScreenProps {
  onBegin: () => void;
  onBack: () => void;
}

const SCALE = [
  { value: 2,  label: 'Очень нравится',    bg: '#FFF8D0', border: '#D4AA00', color: '#6B4A00' },
  { value: 1,  label: 'Нравится',           bg: '#EFF9D8', border: '#65A000', color: '#2E5000' },
  { value: 0,  label: 'Не знаю',            bg: '#F3F4F6', border: '#8895A8', color: '#3A4453' },
  { value: -1, label: 'Не нравится',        bg: '#FFF0E0', border: '#D07010', color: '#6B2C00' },
  { value: -2, label: 'Очень не нравится',  bg: '#FFEEF2', border: '#C83060', color: '#6B0030' },
];

export default function InstructionsScreen({ onBegin, onBack }: InstructionsScreenProps) {
  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: '#FAF8F3' }}>
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #FDE68A, #FCD34D, #FAD4BF, #FACBC0)' }} />

      <div className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-xl">
          {/* Back */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-10 text-sm font-medium transition-colors"
            style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Назад
          </button>

          <h2
            className="mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: '#2A2520' }}
          >
            Как проходить тест
          </h2>
          <p className="mb-10 text-base leading-relaxed" style={{ color: '#7A726A' }}>
            Вам будет показано 174 утверждения — виды деятельности или занятий. Оцените каждое по шкале: насколько вам это нравится или не нравится.
          </p>

          {/* Scale demo */}
          <div className="rounded-3xl p-6 mb-8" style={{ backgroundColor: '#F2EEE6' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#9CA3AF' }}>
              Варианты ответа
            </p>
            <div className="flex flex-col gap-2">
              {SCALE.map(item => (
                <div
                  key={item.value}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{ backgroundColor: item.bg, border: `1.5px solid ${item.border}40` }}
                >
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ border: `1.5px solid ${item.border}80` }}
                  />
                  <span className="text-sm font-medium" style={{ color: item.color }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="flex flex-col gap-4 mb-10">
            {[
              { icon: '◎', text: 'Отвечайте по первому ощущению — не раздумывайте долго.' },
              { icon: '↩', text: 'Вы всегда можете вернуться и изменить предыдущий ответ.' },
              { icon: '◑', text: 'Нет правильных или неправильных ответов — только честные.' },
              { icon: '♡', text: 'Нейтральный ответ тоже информативен — выбирайте его смело.' },
            ].map(tip => (
              <div key={tip.icon} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0" style={{ color: '#D97706', fontSize: '1rem' }}>{tip.icon}</span>
                <p className="text-sm leading-relaxed" style={{ color: '#5A524A' }}>{tip.text}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onBegin}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Начать тест
          </button>
        </div>
      </div>
    </div>
  );
}
