import { useState } from 'react';
import { CATEGORIES, calculateResults, toDisplay } from '../data/questions';
import Top5Chart from '../components/Top5Chart';
import AllDirectionsChart from '../components/AllDirectionsChart';
import AllDirectionsRose from '../components/AllDirectionsRose';

interface ResultsScreenProps {
  answers: Record<number, number>;
  onRetake: () => void;
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  const pct = ((score + 12) / 24) * 100;
  return (
    <div className="w-full flex items-center gap-3">
      <div
        className="flex-1 rounded-full overflow-hidden relative"
        style={{ height: 7, backgroundColor: '#E8E4DC' }}
      >
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{ left: '50%', backgroundColor: '#CCC8BF' }}
        />
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span
        className="text-sm font-bold w-9 text-right shrink-0"
        style={{ color, fontFamily: 'var(--font-sans)' }}
      >
        {score > 0 ? `+${score}` : score}
      </span>
    </div>
  );
}

interface DetailCardProps {
  categoryId: number;
  score: number;
  onClose: () => void;
}

function DetailCard({ categoryId, score, onClose }: DetailCardProps) {
  const cat = CATEGORIES.find(c => c.id === categoryId)!;
  const level = score >= 8 ? 'Высокий' : score >= 4 ? 'Средний' : score >= 0 ? 'Нейтральный' : 'Низкий';
  const levelBg = score >= 8 ? '#FEF3C7' : score >= 4 ? '#F7FEE7' : score >= 0 ? '#F8FAFC' : '#FFF1F2';
  const levelColor = score >= 8 ? '#B45309' : score >= 4 ? '#365314' : score >= 0 ? '#475569' : '#881337';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(42, 37, 32, 0.45)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 relative"
        style={{ backgroundColor: '#FAF8F3', boxShadow: '0 28px 72px rgba(42,37,32,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
          style={{ backgroundColor: '#F2EEE6', border: 'none', cursor: 'pointer', color: '#7A726A', fontSize: '0.9rem' }}
        >
          ✕
        </button>

        {/* Icon + name */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
            style={{ backgroundColor: cat.color + '18', border: `1.5px solid ${cat.color}30` }}
          >
            {cat.icon}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#9CA3AF' }}>
              Направление {cat.id} из 29
            </p>
            <h3
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#2A2520', lineHeight: 1.1 }}
            >
              {cat.name}
            </h3>
          </div>
        </div>

        <p className="text-sm mb-6 leading-relaxed" style={{ color: '#7A726A' }}>
          {cat.description}
        </p>

        {/* Score */}
        <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: '#F2EEE6' }}>
          <div className="flex items-end justify-between mb-3">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
              Ваш результат
            </span>
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: cat.color }}
            >
              {toDisplay(score)} <span style={{ fontSize: '1rem', fontWeight: 400 }}>/ 100</span>
            </span>
          </div>
          <ScoreBar score={score} color={cat.color} />
          <div className="flex justify-between mt-1.5">
            <span className="text-xs" style={{ color: '#C5BFB8' }}>0</span>
            <span className="text-xs" style={{ color: '#C5BFB8' }}>50</span>
            <span className="text-xs" style={{ color: '#C5BFB8' }}>100</span>
          </div>
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
          style={{ backgroundColor: levelBg, color: levelColor }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: levelColor }} />
          {level} интерес
        </div>
      </div>
    </div>
  );
}

export default function ResultsScreen({ answers, onRetake }: ResultsScreenProps) {
  const scores = calculateResults(answers);
  const [activeDetail, setActiveDetail] = useState<number | null>(null);
  const [tab, setTab] = useState<'chart' | 'all' | 'rose'>('chart');

  const sorted = CATEGORIES
    .map(cat => ({ ...cat, score: scores[cat.id] }))
    .sort((a, b) => b.score - a.score);

  const top5 = sorted.slice(0, 5);

  return (
    <div className="min-h-dvh" style={{ backgroundColor: '#FAF8F3' }}>
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #FDE68A, #D9F99D, #A5F3FC, #DDD6FE, #FECDD3)' }} />

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
            style={{ backgroundColor: '#FEF3C7', color: '#92700A', border: '1px solid #FCD34D' }}
          >
            Тест завершён
          </div>
          <h1
            className="mb-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#2A2520', lineHeight: 1.1 }}
          >
            Ваша карта интересов
          </h1>
          <p style={{ color: '#7A726A', fontSize: '1rem', lineHeight: 1.6 }}>
            {Object.keys(answers).length} вопросов · 29 направлений
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-2xl p-1 mb-8"
          style={{ backgroundColor: '#F2EEE6' }}
        >
          {[
            { key: 'chart', label: '◎ Топ‑5' },
            { key: 'rose',  label: '❋ Роза' },
            { key: 'all',   label: '▤ Список' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as 'chart' | 'all' | 'rose')}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{
                backgroundColor: tab === t.key ? '#FAF8F3' : 'transparent',
                color: tab === t.key ? '#2A2520' : '#9CA3AF',
                border: 'none',
                cursor: 'pointer',
                boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Chart tab */}
        {tab === 'chart' && (
          <div>
            <div className="rounded-3xl p-6 mb-8" style={{ backgroundColor: '#F2EEE6' }}>
              <h2
                className="mb-2 text-center"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#2A2520' }}
              >
                5 ведущих направлений
              </h2>
              <p className="text-center text-xs mb-6" style={{ color: '#9CA3AF' }}>
                Чем шире сектор — тем выше интерес
              </p>
              <Top5Chart scores={scores} />
            </div>

            {/* Top 5 cards */}
            <div className="flex flex-col gap-3">
              {top5.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveDetail(cat.id)}
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-150 hover:scale-[1.01] w-full"
                  style={{
                    backgroundColor: i === 0 ? cat.color + '15' : '#FAF8F3',
                    border: i === 0 ? `2px solid ${cat.color}40` : '1.5px solid #E8E4DC',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: cat.color + '20' }}
                  >
                    {cat.icon}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: i === 0 ? cat.color : '#E8E4DC',
                      color: i === 0 ? '#fff' : '#7A726A',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: '#2A2520' }}>{cat.name}</div>
                    <div className="text-xs mt-0.5 truncate" style={{ color: '#9CA3AF' }}>{cat.description}</div>
                  </div>
                  <div
                    className="text-base font-bold shrink-0"
                    style={{ fontFamily: 'var(--font-display)', color: cat.color }}
                  >
                    {cat.score > 0 ? `+${cat.score}` : cat.score}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rose chart — all 29 directions */}
        {tab === 'rose' && (
          <div className="rounded-3xl p-6" style={{ backgroundColor: '#F2EEE6' }}>
            <h2 className="mb-1 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#2A2520' }}>
              Все 29 направлений
            </h2>
            <p className="text-center text-xs mb-6" style={{ color: '#9CA3AF' }}>
              Чем длиннее лепесток — тем выше интерес · шкала 0–100
            </p>
            <AllDirectionsRose scores={scores} onSelect={setActiveDetail} />
          </div>
        )}

        {/* All directions list tab */}
        {tab === 'all' && (
          <div className="rounded-3xl p-6" style={{ backgroundColor: '#F2EEE6' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#9CA3AF' }}>
              Все 29 направлений · от высокого к низкому
            </p>
            <AllDirectionsChart scores={scores} onSelect={setActiveDetail} />
          </div>
        )}

        {/* Retake */}
        <div className="text-center mt-10">
          <button
            onClick={onRetake}
            className="px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-150 hover:opacity-80"
            style={{ backgroundColor: '#F2EEE6', color: '#7A726A', border: 'none', cursor: 'pointer' }}
          >
            Пройти тест заново
          </button>
        </div>
      </div>

      {activeDetail !== null && (
        <DetailCard
          categoryId={activeDetail}
          score={scores[activeDetail]}
          onClose={() => setActiveDetail(null)}
        />
      )}
    </div>
  );
}
