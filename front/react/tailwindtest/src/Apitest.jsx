import { GoogleGenAI } from '@google/genai'
import { useState, useEffect } from 'react'

function Apitest() {
  // 1. API 응답, 로딩 상태, 에러를 저장할 state를 만듭니다.
  const [schedule, setSchedule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 2. useEffect를 사용해 컴포넌트가 처음 렌더링될 때 API를 호출합니다.
  useEffect(() => {
    async function fetchSchedule() {
      try {
        // ⚠️ 경고: 이 코드는 데모용입니다. 실제 프로덕션 환경에서는
        // 절대 API 키를 프론트엔드에 노출하면 안 됩니다.
        // 반드시 백엔드 서버를 통해 API를 호출해야 합니다.
        //
        // Vite 환경에서는 .env.local 파일에 VITE_GEMINI_API_KEY=... 형식으로 저장하고
        // import.meta.env.VITE_GEMINI_API_KEY 로 접근하는 것이 더 안전합니다.
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY
        if (!apiKey) {
          throw new Error(
            'API 키가 설정되지 않았습니다. .env.local 파일을 확인하세요.'
          )
        }
        const ai = new GoogleGenAI({ apiKey })
        const prompt = `
          2025년 7월 19일부터 21일까지 2박 3일 부산 여행 일정을 JSON으로 만들어줘.
          각각의 일정은 실제 여행 계획처럼 자연스럽게 생성해줘.
          전체는 아래 키를 가진 객체 배열(JSON)로 반환해줘.
          - title (string)
          - start (string, YYYY-MM-DDTHH:MM)
          - end (string, YYYY-MM-DDTHH:MM)
        `

        const result = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: prompt,
        })
        const response = await result.response
        let text = ''
        if (response) {
          text = response.text()

          // 가끔 JSON 앞뒤에 ```json ... ``` 같은 마크다운이 붙는 경우가 있어 제거합니다.
          const cleanedText = text.replace(/```json\n?/, '').replace(/```$/, '')

          const resultJson = JSON.parse(cleanedText)
          setSchedule(resultJson) // 3. 결과를 state에 저장합니다.
        }
      } catch (e) {
        console.error('API 호출 중 에러 발생:', e)
        setError('일정을 불러오는 데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, []) // 빈 배열을 전달하여 최초 1회만 실행되도록 합니다.

  // if (loading) return <div>로딩 중...</div> // 이 부분을 잠시 주석 처리
  if (error) return <div>{error}</div>

  // 4. state에 저장된 데이터를 화면에 렌더링합니다.
  return (
    <div>
      <h1>부산 여행 일정</h1>
      <pre>{JSON.stringify(schedule, null, 2)}</pre>
    </div>
  )
}

export default Apitest
