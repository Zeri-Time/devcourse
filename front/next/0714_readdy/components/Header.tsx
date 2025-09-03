'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('사용자 정보 가져오기 오류:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('로그아웃 오류:', error)
        return
      }
    } catch (error) {
      console.error('로그아웃 오류:', error)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            style={{ fontFamily: 'var(--font-pacifico)' }}
          >
            StudyLog
          </Link>

          <nav className="flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              홈
            </Link>
            <Link
              href="/posts"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              공부 기록
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              카테고리
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
            >
              소개
            </Link>
          </nav>

          <div className="flex space-x-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/mypage"
                      className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-600 font-medium cursor-pointer whitespace-nowrap"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer whitespace-nowrap"
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
