// pages/index.tsx
'use client'
import { useState, FormEvent } from 'react'

export default function AISearchPage() {
  const [query, setQuery] = useState<string>('')
  const [aiResponse, setAiResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 폼 기본 제출 동작 방지
    if (!query.trim()) return // 입력값이 비어있으면 함수 종료

    setLoading(true) // 로딩 상태 시작
    setAiResponse('') // 이전 응답 초기화
    setError(null) // 에러 메시지 초기화

    try {
      // --- 중요: 여기에서 우리가 만든 Gemini API Route로 요청을 보냅니다 ---
      const response = await fetch('/api/gemini-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }), // 사용자 질문을 JSON 형식으로 전송
      })

      // 응답이 성공적이지 않으면 에러 처리
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || 'AI 응답을 가져오는 데 실패했습니다.'
        )
      }

      // 성공적인 응답 데이터 파싱 및 AI 응답 설정
      const data = await response.json()
      setAiResponse(data.response)
    } catch (err: any) {
      setError(err.message) // 에러 발생 시 에러 메시지 설정
    } finally {
      setLoading(false) // 로딩 상태 종료
    }
  }

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>Gemini AI 기반 여행 추천 검색</h1>
      <p>궁금한 여행지에 대해 질문해보세요!</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="예: 제주도 3박 4일 친구들과 여행 추천해줘"
          style={{
            flexGrow: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
          disabled={loading} // 로딩 중에는 입력 비활성화
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          disabled={loading} // 로딩 중에는 버튼 비활성화
        >
          {loading ? '검색 중...' : '검색'}
        </button>
      </form>

      {error && (
        <div
          style={{
            color: 'red',
            marginBottom: '15px',
            padding: '10px',
            border: '1px solid red',
            borderRadius: '4px',
            backgroundColor: '#ffe6e6',
          }}
        >
          오류: {error}
        </div>
      )}

      {aiResponse && (
        <div
          style={{
            border: '1px solid #eee',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h2>AI 추천 결과:</h2>
          {/* AI가 마크다운으로 응답하므로, <br /> 태그로 줄바꿈을 처리하여 보기 좋게 만듭니다. */}
          {/* 더 정교한 마크다운 렌더링을 위해 'react-markdown' 라이브러리 사용을 고려할 수 있습니다. */}
          <div
            dangerouslySetInnerHTML={{
              __html: aiResponse.replace(/\n/g, '<br />'),
            }}
          />
        </div>
      )}
    </div>
  )
}
