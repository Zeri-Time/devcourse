export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      <span className="sr-only">로딩 중...</span>
    </div>
  )
}
