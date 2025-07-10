'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase.from('posts').select('*')
    setPosts(data)
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.id} /
          <Link
            href={`/posts/${post.id}`}
            className="p-2 rounded hover:bg-gray-100"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
