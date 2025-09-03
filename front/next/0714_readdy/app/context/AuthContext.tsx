// 'use client'

// import { supabase } from '@/lib/supabase'
// import { User } from '@supabase/supabase-js'
// import React, { createContext, useContext, useEffect, useState } from 'react'

// interface AuthContextType {
//   user: User | null
//   isLoading: boolean
//   signUp: (email: string, password: string) => Promise<{ error: Error | null }>
//   signIn: (email: string, password: string) => Promise<{ error: Error | null }>
//   signOut: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const getSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession()

//       setUser(session?.user ?? null)
//       setIsLoading(false)
//     }

//     getSession()

//     // 인증 상태(로그인/로그아웃) 변경을 감지하는 리스너
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user ?? null)
//       setIsLoading(false)
//     })
//     // 클인업 함수 -> 컨포넌트가 언마운트 되거나 useEffect가 재실행되기 전
//     // 이벤트 리스터 중복 호출 방지
//     return () => subscription.unsubscribe()
//   }, [])

//   const signUp = async (email: string, password: string) => {
//     const { error } = await supabase.auth.signUp({ email, password })

//     return { error }
//   }

//   const signIn = async (email: string, password: string) => {
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     return { error }
//   }

//   const signOut = async () => {
//     await supabase.auth.signOut()
//   }

//   const value = {
//     user,
//     isLoading,
//     signUp,
//     signIn,
//     signOut,
//   }
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   return context
// }
