'use server';

import { supabase } from '@/lib/supabase';

type FeedbackInput = {
  name: string;
  email: string;
  message: string;
};

type ActionResult = { success: true } | { success: false; error: string };

export async function submitFeedback(input: FeedbackInput): Promise<ActionResult> {
  const { name, email, message } = input;

  if (!email.trim()) {
    return { success: false, error: 'Email is required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!message.trim()) {
    return { success: false, error: 'Message is required.' };
  }

  const { error } = await supabase.from('feedback').insert({
    name: name.trim() || null,
    email: email.trim(),
    message: message.trim(),
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}