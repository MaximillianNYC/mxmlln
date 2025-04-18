import { ArticleContent } from './components/ArticleContent'

const sampleText = `The semantic zoom interface represents a paradigm shift in how we interact with textual content. Unlike traditional zoom mechanisms that simply magnify visual elements, semantic zoom delves deeper into the meaning and context of the selected text. This innovative approach allows users to explore content at varying levels of detail, transforming the reading experience from a linear journey into an interactive exploration.`

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Semantic Zoom Demo
          </h1>
          <p className="text-slate-600">
            Select any text and use the context menu to zoom in for more details.
          </p>
        </header>

        <ArticleContent initialContent={sampleText} />
      </div>
    </main>
  )
}
