'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const rs = fetch('https://dummyjson.com/posts')
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.posts)
        // console.log(res.posts)
      })
  }, []) // 의존 배열
  // console.log(posts)
  return (
    <>
      <h1 className="text-[24px]">
        - /posts 경로의 게시글 목록 페이지입니다 -
      </h1>
      <br />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className="hover:opacity-70">
              {post.title}
            </Link>
            {/* {post.title} */}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Posts
