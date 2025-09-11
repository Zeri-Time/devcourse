'use client'

import { use, useEffect, useState } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function Page({ params }: { params: Promise<{ id: number }> }) {
    const [post, setPost] = useState<{
        id: number
        title: string
        content: string
    } | null>(null)

    const { id } = use(params)

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/v1/posts/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
    }, [])

    if (post === null) return <div>로딩중...</div>

    return (
        <>
            <h1>게시글 상세페이지</h1>
            <>
                <div>게시글 번호: {post?.id}</div>
                <div>게시글 제목: {post?.title}</div>
                <div>게시글 내용: {post?.content}</div>
            </>
        </>
    )
}
