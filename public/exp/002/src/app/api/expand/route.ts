import Anthropic from '@anthropic-ai/sdk'
import { streamText } from 'ai'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { text } = await req.json()

  const prompt = `You are an expert at expanding and elaborating on text while maintaining context and flow. Your task is to take the given text and provide a detailed, insightful expansion that:
1. Explains the concepts in more depth
2. Provides relevant examples or analogies
3. Adds historical or theoretical context where appropriate
4. Maintains academic rigor while being accessible

Here is the text to expand:
"${text}"

Provide a thorough, multi-paragraph expansion that builds upon the original text. Focus on adding value through explanation and elaboration, not just rephrasing.`

  const response = await anthropic.messages.create({
    model: 'claude-3-7-sonnet-20250219',
    max_tokens: 1024,
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  })

  // Create an async generator for the text stream
  async function* textGenerator() {
    for await (const chunk of response) {
      if (chunk.type === 'content_block_delta' && chunk.delta && 'text' in chunk.delta) {
        yield chunk.delta.text
      }
    }
  }

  // Use streamText as shown in the docs
  const result = streamText({
    textStream: textGenerator(),
  })

  return result
} 