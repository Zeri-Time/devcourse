'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
function PostDetail() {
  const params = useParams()
  // console.log(params)
  const [post, setPost] = useState({}) // 객체 초기화

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${params.id}`).then((res) =>
      res.json().then((res) => setPost(res))
    )
  }, [])
  return (
    <>
      <h2 className="text-[24px]">- 여기는 상세 페이지 -</h2>
      <br />
      <div>id: {post.id} </div>
      <div className="text-[18px]">title: {post.title}</div>
      <br />
      <div>body: {post.body}</div>
    </>
  )
}

export default PostDetail
