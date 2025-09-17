import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    console.log('Rewrite API Route called')
    
    const body = await req.json()
    console.log('Request body:', body)
    
    const { prompt, operation } = body
    
    if (!prompt) {
      console.log('No prompt provided')
      return new Response('Missing prompt', { status: 400 })
    }

    if (!operation || !['expand', 'contract'].includes(operation)) {
      console.log('Invalid or missing operation')
      return new Response('Missing or invalid operation. Must be "expand" or "contract"', { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Missing ANTHROPIC_API_KEY')
      return new Response('API key not configured', { status: 500 })
    }

    console.log('Using prompt:', prompt.substring(0, 100) + '...')
    console.log('Operation:', operation)

    const systemPrompt = operation === 'expand'
      ? `The user has provided you with text to be expanded on, meaning they'd like a version of the same text with more detail and clarity. Please rewrite their text in a form that is around 33% longer, it must be longer than the original text at all costs. Reply with only the expanded text, no introduction, explanation, or quotes. Text: ${prompt}`
      : `The user has provided you with text to be contracted, meaning they'd like a more concise version of the same text with less detail. Please rewrite their text in a form that is around 33% shorter while maintaining the core meaning, it must be shorter than the original text at all costs. Reply with only the contracted text, no introduction, explanation, or quotes. Text: ${prompt}`

    console.log('Calling Anthropic API...')

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [{ role: 'user', content: systemPrompt }],
    })

    console.log('API call successful')
    
    const content = response.content[0]
    if (content.type === 'text') {
      return new Response(content.text, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }
    
    return new Response('No text content received', { status: 500 })
  } catch (error) {
    console.error('API Error:', error)
    return new Response(`Internal Server Error: ${error.message}`, { status: 500 })
  }
}
