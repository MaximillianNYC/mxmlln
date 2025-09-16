import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    console.log('API Route called')
    
    const body = await req.json()
    console.log('Request body:', body)
    
    const { prompt } = body
    
    if (!prompt) {
      console.log('No prompt provided')
      return new Response('Missing prompt', { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Missing ANTHROPIC_API_KEY')
      return new Response('API key not configured', { status: 500 })
    }

    console.log('Using prompt:', prompt.substring(0, 100) + '...')

    const expandPrompt = `You are an expert at expanding and elaborating on text while maintaining context and flow. Your task is to take the given text and provide a detailed, insightful expansion that:
1. Explains the concepts in more depth
2. Provides relevant examples or analogies
3. Adds historical or theoretical context where appropriate
4. Maintains academic rigor while being accessible

Here is the text to expand:
"${prompt}"

Provide a thorough, multi-paragraph expansion that builds upon the original text. Focus on adding value through explanation and elaboration, not just rephrasing.`

    console.log('Calling Anthropic API...')

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      temperature: 0.7,
      messages: [{ role: 'user', content: expandPrompt }],
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