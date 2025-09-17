import { ArticleContent } from './components/ArticleContent'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-left mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Semantic Zoom — Prototype 1
          </h1>
        </header>

        <ArticleContent initialContent="" />
      </div>
    </main>
  )
}
