import { useState } from 'react';
import { saveAttempt } from './lib/supabase';
import StartScreen from './screens/StartScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import TestScreen from './screens/TestScreen';
import CompletionScreen from './screens/CompletionScreen';
import ResultsScreen from './screens/ResultsScreen';

type Screen = 'start' | 'instructions' | 'test' | 'completion' | 'results';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [saved, setSaved] = useState(false);

  function handleAnswer(questionId: number, value: number) {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  function handleRetake() {
    setAnswers({});
    setSaved(false);
    setScreen('start');
  }

  async function handleViewResults() {
    setScreen('results');
    if (saved) return;
    try {
      await saveAttempt(answers);
      setSaved(true);
    } catch (e) {
      console.error('Не удалось сохранить результат', e);
    }
  }

  return (
    <>
      {screen === 'start' && (
        <StartScreen onStart={() => setScreen('instructions')} />
      )}
      {screen === 'instructions' && (
        <InstructionsScreen
          onBegin={() => setScreen('test')}
          onBack={() => setScreen('start')}
        />
      )}
      {screen === 'test' && (
        <TestScreen
          answers={answers}
          onAnswer={handleAnswer}
          onComplete={() => setScreen('completion')}
        />
      )}
      {screen === 'completion' && (
        <CompletionScreen
          answeredCount={Object.keys(answers).length}
          onViewResults={handleViewResults}
          onContinue={() => setScreen('test')}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          answers={answers}
          onRetake={handleRetake}
        />
      )}
    </>
  );
}