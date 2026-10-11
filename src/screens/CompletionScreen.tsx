interface CompletionScreenProps {
  answeredCount: number;
  onViewResults: () => void;
  onContinue: () => void;
}

export default function CompletionScreen({ answeredCount, onViewResults, onContinue }: CompletionScreenProps) {
  const total = 174;
  const isComplete = answeredCount >= total;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#FAF8F3' }}>
      <div className="h-1.5 w-full fixed top-0 left-0" style={{ background: 'linear-gradient(90deg, #FDE68A, #FCD34D, #FAD4BF, #FACBC0)' }} />

      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: '2px solid #FCD34D' }}>
          <span style={{ fontSize: '2.2rem' }}>✦</span>
        </div>

        <h2
          className="mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#2A2520' }}
        >
          {isComplete ? 'Тест завершён!' : 'Хотите завершить?'}
        </h2>

        <p className="mb-8 text-base leading-relaxed" style={{ color: '#7A726A' }}>
          {isComplete
            ? `Вы ответили на все ${total} вопросов. Результаты готовы — посмотрим, что интересует вас больше всего.`
            : `Вы ответили на ${answeredCount} из ${total} вопросов. Можно посмотреть результаты сейчас или продолжить тест.`}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onViewResults}
            className="w-full py-4 rounded-2xl font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 4px 20px rgba(217,119,6,0.3)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Посмотреть результаты
          </button>

          {!isComplete && (
            <button
              onClick={onContinue}
              className="w-full py-4 rounded-2xl font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: '#F2EEE6',
                color: '#7A726A',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Продолжить тест
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
