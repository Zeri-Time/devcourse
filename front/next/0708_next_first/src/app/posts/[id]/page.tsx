'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  contents: string
  created_at: string
}

interface Comment {
  id: number
  contents: string
  post_id: number
  created_at?: string
}

function PostDetail() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 댓글 관련 상태
  const [comments, setComments] = useState<Comment[]>([])
  const [commentInput, setCommentInput] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchPost()
      fetchComments()
    }
  }, [params.id])

  const fetchPost = async () => {
    try {
      const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()
      if (error) {
        if (error.code === 'PGRST116') {
          setError('게시글을 찾을 수 없습니다.')
        } else {
          setError('게시글을 불러오는 중 오류가 발생했습니다.')
        }
        throw error
      }
      setPost(post)
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  // 댓글 목록 불러오기
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('id, contents, post_id')
        .eq('post_id', params.id)
        .order('id', { ascending: false })
      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  // 댓글 저장
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim()) return
    setCommentLoading(true)
    try {
      const { error } = await supabase
        .from('comments')
        .insert({ contents: commentInput, post_id: Number(params.id) })
      if (error) throw error
      setCommentInput('')
      fetchComments()
    } catch (error) {
      alert('댓글 저장 중 오류가 발생했습니다.')
      console.error('댓글 저장 에러:', error)
    } finally {
      setCommentLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error || '게시글을 찾을 수 없습니다'}
            </h3>
            <p className="text-gray-500 mb-6">
              요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/posts"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                게시판으로 돌아가기
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                홈으로 가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <div className="mb-8">
          <Link
            href="/posts"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            게시판으로 돌아가기
          </Link>
        </div>

        {/* 게시글 카드 */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* 헤더 */}
          <div className="border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-500">게시글 #{post.id}</span>
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(post.created_at)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
          </div>

          {/* 본문 */}
          <div className="px-8 py-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.contents}
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span className="text-sm text-gray-500">
                  작성일: {formatDate(post.created_at)}
                </span>
              </div>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  좋아요
                </button>
                <button className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  공유
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* 댓글 작성 폼 */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">댓글</h2>
          <form
            onSubmit={handleCommentSubmit}
            className="flex flex-col sm:flex-row gap-2 mb-6"
          >
            <textarea
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-400"
              rows={2}
              placeholder="댓글을 입력하세요"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              disabled={commentLoading}
              maxLength={500}
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold disabled:opacity-50"
              disabled={commentLoading || !commentInput.trim()}
            >
              {commentLoading ? '등록 중...' : '등록'}
            </button>
          </form>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                아직 댓글이 없습니다.
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3"
                >
                  <div className="text-gray-800 whitespace-pre-wrap">
                    {comment.contents}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* 관련 링크 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/posts"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            모든 게시글 보기
          </Link>
          <Link
            href="/posts/new"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            새 글 작성하기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
