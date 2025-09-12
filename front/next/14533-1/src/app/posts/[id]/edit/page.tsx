'use client'

import { apiFetch } from '@/src/lib/backend/client'
import { PostCommentDto, PostDto } from '@/src/types/post'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function Page({ params }: { params: Promise<{ id: number }> }) {
    const [post, setPost] = useState<PostDto | null>(null)
    const [postComments, setPostComments] = useState<PostCommentDto[] | null>(
        null,
    )

    const { id } = use(params)

    const router = useRouter()

    const deletePost = (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return

        apiFetch(`/api/v1/posts/${id}`, {
            method: 'DELETE',
        }).then((data) => {
            alert(data.msg)
            router.replace('/posts')
        })
    }

    const deletePostComment = (id: number, commentId: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return

        apiFetch(`/api/v1/posts/${id}/comments/${commentId}`, {
            method: 'DELETE',
        }).then((data) => {
            alert(data.msg)

            if (postComments === null) return

            setPostComments(
                postComments.filter((comment) => comment.id !== commentId),
            )
        })
    }

    useEffect(() => {
        apiFetch(`/api/v1/posts/${id}`).then(setPost)

        apiFetch(`/api/v1/posts/${id}/comments`).then(setPostComments)
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

            <div className="flex gap-2">
                <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 rounded border"
                >
                    삭제
                </button>
                <Link
                    className="p-2 rounded border"
                    href={`/posts/${post.id}/edit`}
                >
                    수정
                </Link>
            </div>

            <h2>댓글 작성</h2>
            <form className="flex flex-col gap-2 p-2">
                <textarea
                    className="border p-2 rounded"
                    name="content"
                    placeholder="댓글 내용"
                />
                <button className="border p-2 rounded" type="submit">
                    저장
                </button>
            </form>

            <h2>댓글 목록</h2>

            {postComments === null && <div>댓글이 로딩중...</div>}

            {postComments !== null && postComments.length > 0 && (
                <ul>
                    {postComments.map((comment) => (
                        <li key={comment.id}>
                            {comment.content}
                            <button
                                className="p-2 rounded border"
                                onClick={() =>
                                    deletePostComment(id, comment.id)
                                }
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
