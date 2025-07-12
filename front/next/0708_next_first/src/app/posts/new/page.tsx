'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function PostNew() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: 실제 API 호출로 변경
      console.log('새 게시글 작성:', { title, content })

      // 성공 시 게시글 목록으로 이동
      router.push('/posts')
    } catch (error) {
      console.error('게시글 작성 실패:', error)
      alert('게시글 작성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                새 게시글 작성
              </h1>
            </div>
            <Link
              href="/posts"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              게시글 목록
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                당신의 이야기를 공유하세요
              </h2>
              <p className="text-blue-100 text-lg">
                흥미로운 아이디어나 경험을 다른 사람들과 나누어보세요
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-lg font-semibold text-gray-900 mb-3"
                >
                  제목
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="게시글의 제목을 입력하세요..."
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
                    maxLength={100}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-sm text-gray-400">
                      {title.length}/100
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  명확하고 흥미로운 제목으로 독자들의 관심을 끌어보세요
                </p>
              </div>

              {/* Content Input */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-lg font-semibold text-gray-900 mb-3"
                >
                  내용
                </label>
                <div className="relative">
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="게시글의 내용을 작성하세요..."
                    rows={12}
                    className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400 resize-none"
                    maxLength={5000}
                  />
                  <div className="absolute right-4 bottom-4">
                    <span className="text-sm text-gray-400">
                      {content.length}/5000
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  자유롭게 생각을 표현하고, 마크다운 형식을 사용할 수 있습니다
                </p>
              </div>

              {/* Writing Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  글쓰기 팁
                </h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• 명확하고 간결한 문장을 사용하세요</li>
                  <li>• 독자들이 이해하기 쉽게 구성하세요</li>
                  <li>• 개인적인 경험이나 예시를 포함하면 더욱 흥미롭습니다</li>
                  <li>• 적절한 단락 구분으로 가독성을 높이세요</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      게시 중...
                    </div>
                  ) : (
                    '게시하기'
                  )}
                </button>
                <Link
                  href="/posts"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-center"
                >
                  취소
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Section (Optional) */}
        {title || content ? (
          <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                미리보기
              </h3>
            </div>
            <div className="p-6">
              {title && (
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {title}
                </h2>
              )}
              {content && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default PostNew
