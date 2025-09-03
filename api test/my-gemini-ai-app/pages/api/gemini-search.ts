// pages/api/gemini-search.ts
import { NextApiRequest, NextApiResponse } from 'next'
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai'

// 환경 변수에서 Gemini API 키 로드
// 키가 없으면 빈 문자열을 넘겨 초기화 오류를 방지하지만, 실제로는 유효한 키가 필요합니다.
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

// === 시스템 프롬프트 정의 ===
// Gemini는 'system' 역할을 직접 지원하지 않으므로,
// 대화의 첫 번째 'user' 메시지에 AI의 역할과 지침을 포함시키는 방식으로 사용합니다.
const SYSTEM_INSTRUCTIONS_FOR_GEMINI = `
당신은 사용자에게 상세하고 실용적인 정보를 제공하는 베테랑 여행 플래너입니다.
답변은 항상 한국어로 작성하며, 간결하고 명확한 문체를 사용해주세요. 불필요한 서론은 피하고 바로 본론으로 들어가세요.

사용자가 여행 추천을 요청할 경우, 답변에는 아래의 모든 항목이 *반드시* 포함되어야 합니다:
-   **추천 경로 및 동선**: 하루 또는 며칠 단위의 구체적인 여행 동선과 추천 장소들을 순서대로 제시합니다. (예: 1일차 오전: OO, 오후: XX)
-   **지역 특색 맛집**: 현지인이 즐겨 찾는 곳 위주로 3곳 이상 추천하며, 대표 메뉴와 간단한 특징을 언급합니다.
-   **1인 기준 예상 총 비용**: 숙박, 식사, 교통비(예: KTX 왕복, 현지 대중교통 등)를 상세히 구분하여 제시하고, 총 예상 비용을 산출합니다. (대략적인 금액 범위로 제시 가능)
-   **주요 출발지 기준 교통편**: 서울, 대전, 부산 등 주요 도시에서 해당 여행지로 이동하는 기차, 버스, 자가용 등 다양한 교통편의 장단점 및 소요 시간을 간략히 비교하여 설명합니다.

답변은 마크다운 형식으로 보기 좋게 정리해주시고, 각 항목은 명확한 소제목으로 구분해주세요.
만약 요청된 정보 중 특정 항목을 제공할 수 없는 경우에는 '정보 부족' 등으로 명시하고 다른 항목은 최선을 다해 채워주세요. 절대 정보를 지어내지 마세요.
`
// ===========================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { query } = req.body // 클라이언트에서 전송된 사용자 질문

  // 질문이 없는 경우 오류 응답
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' })
  }

  try {
    // Gemini 모델 인스턴스 가져오기
    // 'gemini-1.0-pro'는 텍스트 전용 모델입니다.
    // 더 강력한 모델이나 멀티모달 기능을 사용하려면 'gemini-1.5-pro' 등을 고려할 수 있습니다.
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Gemini API 호출
    const result = await model.generateContent({
      // 'contents' 배열의 첫 번째 'user' 메시지에 시스템 지침과 사용자 질문을 결합하여 전달
      contents: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_INSTRUCTIONS_FOR_GEMINI + '\n\n' + query }],
        },
      ],
      // 안전 설정 (필요에 따라 조절하여 유해성 검열 강도 변경)
      // 개발 단계에서는 BLOCK_NONE으로 설정하여 더 많은 응답을 받을 수 있습니다.
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
      // 생성 설정 (온도, 최대 출력 토큰 등)
      generationConfig: {
        temperature: 0.7, // 0.0 ~ 1.0 (높을수록 창의적, 낮을수록 보수적)
        maxOutputTokens: 1000, // AI 응답의 최대 토큰(단어) 수
      },
    })

    // AI 응답 텍스트 추출
    const aiResponse = result.response.text()
    // 클라이언트로 AI 응답 전송
    res.status(200).json({ response: aiResponse })
  } catch (error: any) {
    console.error('Gemini API 호출 중 오류 발생:', error)
    res
      .status(500)
      .json({ message: 'Failed to get AI response', error: error.message })
  }
}
