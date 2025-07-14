
'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';

interface PostDetailProps {
  postId: string;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const posts = {
    '1': {
      title: "React Hooks 정리 - useState와 useEffect",
      category: "React",
      date: "2024-01-15",
      readTime: "5분",
      tags: ["React", "Hooks", "JavaScript"],
      content: `
# React Hooks 정리 - useState와 useEffect

React Hooks는 함수형 컴포넌트에서 상태 관리와 생명주기 메서드를 사용할 수 있게 해주는 강력한 기능입니다.

## useState Hook

useState는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 Hook입니다.

### 기본 사용법

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}
\`\`\`

### 주요 특징

- 초기값을 매개변수로 받습니다
- 배열을 반환하며, 첫 번째 요소는 현재 상태, 두 번째 요소는 상태 업데이트 함수입니다
- 상태 업데이트는 비동기적으로 처리됩니다

## useEffect Hook

useEffect는 사이드 이펙트를 처리하는 Hook입니다.

### 기본 사용법

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`클릭 횟수: \${count}\`;
  });

  return (
    <div>
      <p>클릭 횟수: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        클릭
      </button>
    </div>
  );
}
\`\`\`

### 의존성 배열

\`\`\`javascript
useEffect(() => {
  // 이펙트 로직
}, [dependency1, dependency2]);
\`\`\`

- 빈 배열 []: 컴포넌트 마운트 시에만 실행
- 의존성 포함: 의존성이 변경될 때만 실행
- 의존성 배열 없음: 매 렌더링마다 실행

## 정리

React Hooks를 사용하면 함수형 컴포넌트에서도 클래스 컴포넌트의 모든 기능을 사용할 수 있습니다. useState와 useEffect는 가장 기본적이면서도 중요한 Hook들이므로 반드시 숙지해야 합니다.
      `
    },
    '2': {
      title: "JavaScript 비동기 처리 완벽 가이드",
      category: "JavaScript",
      date: "2024-01-12",
      readTime: "8분",
      tags: ["JavaScript", "Promise", "Async"],
      content: `
# JavaScript 비동기 처리 완벽 가이드

JavaScript에서 비동기 처리는 매우 중요한 개념입니다. 이 글에서는 Promise와 async/await를 중심으로 비동기 처리 방법을 알아보겠습니다.

## Promise란?

Promise는 비동기 작업의 완료 또는 실패를 나타내는 객체입니다.

### Promise 생성

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('성공!');
  }, 1000);
});
\`\`\`

### Promise 사용

\`\`\`javascript
promise
  .then(result => {
    console.log(result); // '성공!'
  })
  .catch(error => {
    console.error(error);
  });
\`\`\`

## async/await

async/await는 Promise를 더 쉽게 사용할 수 있게 해주는 문법입니다.

### 기본 사용법

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('에러 발생:', error);
  }
}
\`\`\`

### 여러 비동기 작업 처리

\`\`\`javascript
async function fetchMultipleData() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchComments()
    ]);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
  }
}
\`\`\`

## 실제 활용 예제

### API 호출 함수

\`\`\`javascript
class ApiService {
  static async get(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      return await response.json();
    } catch (error) {
      console.error('API 호출 실패:', error);
      throw error;
    }
  }
}
\`\`\`

## 정리

비동기 처리는 현대 JavaScript 개발에서 필수적인 기술입니다. Promise와 async/await를 잘 활용하면 더 깔끔하고 읽기 쉬운 코드를 작성할 수 있습니다.
      `
    }
  };

  const post = posts[postId as keyof typeof posts];

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">게시글을 찾을 수 없습니다</h1>
          <Link href="/posts" className="text-blue-600 hover:text-blue-700 cursor-pointer">
            ← 목록으로 돌아가기
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/posts" className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
            ← 목록으로 돌아가기
          </Link>
        </div>

        <header className="mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
            <span className="text-gray-500 text-sm">• {post.readTime}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line text-gray-800 leading-relaxed">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.substring(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{line.substring(3)}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">{line.substring(4)}</h3>;
              } else if (line.startsWith('```')) {
                return <div key={index} className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto">{line}</div>;
              } else if (line.startsWith('- ')) {
                return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
              } else if (line.trim() === '') {
                return <br key={index} />;
              } else {
                return <p key={index} className="mb-4">{line}</p>;
              }
            })}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              이 글이 도움이 되었다면 공유해주세요!
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-blue-600 cursor-pointer">
                <i className="ri-heart-line w-5 h-5 flex items-center justify-center"></i>
              </button>
              <button className="text-gray-400 hover:text-blue-600 cursor-pointer">
                <i className="ri-share-line w-5 h-5 flex items-center justify-center"></i>
              </button>
            </div>
          </div>
        </footer>
      </article>

      <Footer />
    </div>
  );
}
