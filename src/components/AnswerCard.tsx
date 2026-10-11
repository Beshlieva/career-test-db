interface AnswerCardProps {
  value: number;
  label: string;
  selected: boolean;
  onClick: () => void;
}

// Solid colored backgrounds — always visible, not transparent
const STYLES: Record<number, {
  bg: string; bgSel: string;
  border: string; borderSel: string;
  text: string; dot: string; dotBorder: string;
}> = {
  2: {
    bg: '#FFF8D0',     bgSel: '#FDED90',
    border: '#F5D020', borderSel: '#D4AA00',
    text: '#6B4A00',   dot: '#D4AA00', dotBorder: '#D4AA00',
  },
  1: {
    bg: '#EFF9D8',     bgSel: '#D5F0A0',
    border: '#8CC820', borderSel: '#65A000',
    text: '#2E5000',   dot: '#65A000', dotBorder: '#65A000',
  },
  0: {
    bg: '#F3F4F6',     bgSel: '#E0E4EA',
    border: '#BEC5D0', borderSel: '#8895A8',
    text: '#3A4453',   dot: '#8895A8', dotBorder: '#8895A8',
  },
  [-1]: {
    bg: '#FFF0E0',     bgSel: '#FFDBB0',
    border: '#F5A040', borderSel: '#D07010',
    text: '#6B2C00',   dot: '#D07010', dotBorder: '#D07010',
  },
  [-2]: {
    bg: '#FFEEF2',     bgSel: '#FFD0DC',
    border: '#F08098', borderSel: '#C83060',
    text: '#6B0030',   dot: '#C83060', dotBorder: '#C83060',
  },
};

export default function AnswerCard({ value, label, selected, onClick }: AnswerCardProps) {
  const s = STYLES[value];

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        backgroundColor: selected ? s.bgSel : s.bg,
        border: `2px solid ${selected ? s.borderSel : s.border}`,
        boxShadow: selected
          ? `0 4px 16px 0 ${s.dot}40`
          : '0 1px 3px 0 rgba(0,0,0,0.06)',
        padding: '13px 18px',
        cursor: 'pointer',
        transform: selected ? 'translateX(4px)' : 'translateX(0)',
      }}
      onMouseEnter={e => {
        if (!selected) {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.border = `2px solid ${s.borderSel}`;
          el.style.transform = 'translateX(3px)';
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.border = `2px solid ${s.border}`;
          el.style.transform = 'translateX(0)';
        }
      }}
    >
      <div className="flex items-center gap-3">
        {/* Radio circle */}
        <div
          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-150"
          style={{
            border: `2px solid ${s.dotBorder}`,
            backgroundColor: selected ? s.dot : 'transparent',
          }}
        >
          {selected && (
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.2 5.8L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <span
          style={{
            color: s.text,
            fontFamily: 'var(--font-sans)',
            fontWeight: selected ? 700 : 500,
            fontSize: '0.9rem',
            lineHeight: 1.4,
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
