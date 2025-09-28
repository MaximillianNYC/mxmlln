import { ArticleContent } from './components/ArticleContent'

export default function Home() {
  return (
    <main className="min-h-screen  bg-slate-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] mx-auto px-4 py-12 ">
        <header className="text-left mb-4">
          <h1 className="text-[18px] font-bold text-slate-500 mb-4" style={{ fontFamily: 'Archivo, sans-serif' }}>
          « ZOOMER »
          </h1>
        </header>

        <ArticleContent initialContent="" />
      </div>
    </main>
  )
}
