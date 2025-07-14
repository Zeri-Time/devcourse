
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function PostsPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const posts = [
    {
      id: 1,
      title: "React Hooks 정리 - useState와 useEffect",
      category: "React",
      date: "2024-01-15",
      summary: "React의 기본 Hooks인 useState와 useEffect에 대해 정리한 내용입니다. 상태 관리와 사이드 이펙트 처리 방법을 예제와 함께 설명합니다.",
      readTime: "5분",
      tags: ["React", "Hooks", "JavaScript"]
    },
    {
      id: 2,
      title: "JavaScript 비동기 처리 완벽 가이드",
      category: "JavaScript",
      date: "2024-01-12",
      summary: "Promise, async/await를 활용한 비동기 처리 방법을 단계별로 설명합니다. 콜백 지옥을 해결하고 더 깔끔한 코드를 작성하는 방법을 배워보세요.",
      readTime: "8분",
      tags: ["JavaScript", "Promise", "Async"]
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox 언제 무엇을 사용할까?",
      category: "CSS",
      date: "2024-01-10",
      summary: "CSS Grid와 Flexbox의 차이점과 각각의 적절한 사용 상황을 알아봅니다. 실제 레이아웃 예제를 통해 언제 어떤 것을 사용해야 하는지 배워보세요.",
      readTime: "6분",
      tags: ["CSS", "Grid", "Flexbox"]
    },
    {
      id: 4,
      title: "알고리즘 문제 해결 전략 - 투 포인터",
      category: "Algorithm",
      date: "2024-01-08",
      summary: "투 포인터 기법을 활용한 알고리즘 문제 해결 방법을 정리했습니다. 배열과 문자열 문제에서 효율적인 해결책을 찾는 방법을 배워보세요.",
      readTime: "7분",
      tags: ["Algorithm", "Two Pointer", "Problem Solving"]
    },
    {
      id: 5,
      title: "Node.js Express 서버 구축하기",
      category: "Node.js",
      date: "2024-01-05",
      summary: "Node.js와 Express를 사용해서 기본적인 웹 서버를 구축하는 방법을 단계별로 정리했습니다. REST API 설계와 미들웨어 사용법도 포함되어 있습니다.",
      readTime: "10분",
      tags: ["Node.js", "Express", "Backend"]
    },
    {
      id: 6,
      title: "TypeScript 기초부터 실전까지",
      category: "TypeScript",
      date: "2024-01-03",
      summary: "TypeScript의 기본 문법부터 고급 타입 시스템까지 체계적으로 정리한 내용입니다. JavaScript 개발자가 TypeScript로 넘어가는 과정을 설명합니다.",
      readTime: "12분",
      tags: ["TypeScript", "JavaScript", "Type System"]
    }
  ];

  const categories = ['전체', 'JavaScript', 'React', 'CSS', 'Algorithm', 'Node.js', 'TypeScript'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">공부 기록</h1>
          <p className="text-lg text-gray-600">지금까지 학습하고 정리한 모든 내용들을 확인해보세요</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
              <input
                type="text"
                placeholder="게시글 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">
              총 {filteredPosts.length}개의 게시글
            </p>
          </div>

          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.date}</span>
                      <span className="text-gray-500 text-sm">• {post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                      <Link href={`/posts/${post.id}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                        자세히 보기 →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <i className="ri-file-text-line text-6xl w-16 h-16 flex items-center justify-center mx-auto"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
