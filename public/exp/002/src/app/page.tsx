import { BookOpen } from 'lucide-react'
import { ArticleContent } from './components/ArticleContent'

export default function Home() {
  return (
    <main className="min-h-screen  bg-slate-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] mx-auto px-4 py-12">
        <BookOpen className="w-6 h-6 text-slate-500 mb-[8px] stroke-[2px]" />
        <ArticleContent initialContent="" />
      </div>
    </main>
  )
}
