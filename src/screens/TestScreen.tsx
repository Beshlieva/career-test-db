import { useState, useEffect } from 'react';
import { QUESTIONS, ANSWER_OPTIONS, CATEGORIES } from '../data/questions';
import AnswerCard from '../components/AnswerCard';
import ProgressBar from '../components/ProgressBar';

interface TestScreenProps {
  answers: Record<number, number>;
  onAnswer: (questionId: number, value: number) => void;
  onComplete: () => void;
}

export default function TestScreen({ answers, onAnswer, onComplete }: TestScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Resume from last unanswered
    const firstUnanswered = QUESTIONS.findIndex(q => answers[q.id] === undefined);
    return firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered;
  });
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const question = QUESTIONS[currentIndex];
  const category = CATEGORIES.find(c => c.id === question.categoryId)!;
  const answeredCount = Object.keys(answers).length;
  const total = QUESTIONS.length;

  useEffect(() => {
    // Keyboard nav
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') handleBack();
      const map: Record<string, number> = { '1': 2, '2': 1, '3': 0, '4': -1, '5': -2 };
      if (map[e.key] !== undefined) handleSelect(map[e.key]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  function handleSelect(value: number) {
    if (animating) return;
    onAnswer(question.id, value);

    if (currentIndex < total - 1) {
      setDirection('forward');
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(i => i + 1);
        setAnimating(false);
      }, 180);
    } else {
      onComplete();
    }
  }

  function handleBack() {
    if (currentIndex === 0) return;
    setDirection('back');
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(i => i - 1);
      setAnimating(false);
    }, 150);
  }

  function handleNext() {
    if (answers[question.id] === undefined) return;
    if (currentIndex < total - 1) {
      setDirection('forward');
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(i => i + 1);
        setAnimating(false);
      }, 150);
    } else {
      onComplete();
    }
  }

  const translateY = animating
    ? direction === 'forward' ? '-12px' : '12px'
    : '0px';

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: '#FAF8F3' }}>
      {/* Header */}
      <div className="sticky top-0 z-10" style={{ backgroundColor: '#FAF8F3', borderBottom: '1px solid #E8E4DC' }}>
        <div className="max-w-2xl mx-auto px-6 py-4">
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 text-sm font-medium transition-all rounded-lg px-2 py-1 -ml-2"
              style={{
                color: currentIndex === 0 ? '#D1CBC4' : '#7A726A',
                background: 'none', border: 'none', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Назад
            </button>

            <span className="text-sm font-semibold" style={{ color: '#5A524A' }}>
              Вопрос{' '}
              <span style={{ color: '#D97706' }}>{currentIndex + 1}</span>
              {' '}из {total}
            </span>

            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#F2EEE6', color: '#9CA3AF' }}
            >
              {answeredCount} / {total}
            </span>
          </div>

          {/* Progress bar */}
          <ProgressBar current={answeredCount} total={total} />

          {/* Category label */}
          <div className="mt-2.5 flex items-center gap-2">
            <span style={{ fontSize: '0.95rem', lineHeight: 1 }}>{category.icon}</span>
            <span className="text-xs font-semibold" style={{ color: category.color }}>
              {category.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div
          className="w-full max-w-xl"
          style={{
            transform: `translateY(${translateY})`,
            opacity: animating ? 0 : 1,
            transition: 'transform 180ms ease, opacity 180ms ease',
          }}
        >
          {/* Question */}
          <div className="mb-10">
            <p
              className="leading-snug"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.35rem, 3.5vw, 1.8rem)',
                color: '#2A2520',
                letterSpacing: '-0.01em',
              }}
            >
              {question.text}
            </p>
          </div>

          {/* Answer cards */}
          <div className="flex flex-col gap-2.5">
            {ANSWER_OPTIONS.map(opt => (
              <AnswerCard
                key={opt.value}
                value={opt.value}
                label={opt.label}
                selected={answers[question.id] === opt.value}
                onClick={() => handleSelect(opt.value)}
              />
            ))}
          </div>

          {/* Next button — if already answered, show explicit Next */}
          {answers[question.id] !== undefined && currentIndex < total - 1 && (
            <button
              onClick={handleNext}
              className="mt-6 w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-150 hover:opacity-90"
              style={{
                backgroundColor: '#F2EEE6',
                color: '#7A726A',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Далее →
            </button>
          )}
          {answers[question.id] !== undefined && currentIndex === total - 1 && (
            <button
              onClick={onComplete}
              className="mt-6 w-full py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(217,119,6,0.3)',
              }}
            >
              Завершить тест
            </button>
          )}
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="text-center pb-6">
        <p className="text-xs" style={{ color: '#C5BFB8' }}>
          Клавиши 1–5 для выбора · ← для возврата
        </p>
      </div>
    </div>
  );
}
