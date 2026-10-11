import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function saveAttempt(answers: Record<number, number>) {
  const { data, error } = await supabase
    .from('attempts')
    .insert({})
    .select()
    .single();
  if (error) throw error;

  const rows = Object.entries(answers).map(([q, v]) => ({
    attempt_id: data.id,
    question_no: Number(q),
    value: String(v),
  }));

  const { error: answersError } = await supabase.from('answers').insert(rows);
  if (answersError) throw answersError;

  return data.id as string;
}