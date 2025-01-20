import type { NextRequest } from 'next/server';

import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const {
    apiKey: key,
    messages,
    model = 'gpt-4o-mini',
    system,
  } = await req.json();

  const apiKey = key || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing OpenAI API key.' },
      { status: 401 }
    );
  }

  const openai = createOpenAI({ apiKey, baseURL: 'https://api.deepseek.com/v1' });

  try {
    const result = await streamText({
      maxTokens: 5096,
      messages: convertToCoreMessages(messages),
      model: openai('deepseek-chat'),
      system: system,
    });

    return result.toDataStreamResponse();
  } catch {
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
