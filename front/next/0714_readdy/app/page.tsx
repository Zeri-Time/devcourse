
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  const recentPosts = [
    {
      id: 1,
      title: "React Hooks 정리 - useState와 useEffect",
      category: "React",
      date: "2024-01-15",
      summary: "React의 기본 Hooks인 useState와 useEffect에 대해 정리한 내용입니다.",
      readTime: "5분"
    },
    {
      id: 2,
      title: "JavaScript 비동기 처리 완벽 가이드",
      category: "JavaScript",
      date: "2024-01-12",
      summary: "Promise, async/await를 활용한 비동기 처리 방법을 단계별로 설명합니다.",
      readTime: "8분"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox 언제 무엇을 사용할까?",
      category: "CSS",
      date: "2024-01-10",
      summary: "CSS Grid와 Flexbox의 차이점과 각각의 적절한 사용 상황을 알아봅니다.",
      readTime: "6분"
    }
  ];

  const categories = [
    { name: "JavaScript", count: 12, color: "bg-yellow-100 text-yellow-800" },
    { name: "React", count: 8, color: "bg-blue-100 text-blue-800" },
    { name: "CSS", count: 6, color: "bg-green-100 text-green-800" },
    { name: "Algorithm", count: 15, color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              매일 성장하는 개발자
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              하루하루 배우고 기록하며 성장해가는 개발 공부 여정을 함께하세요
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/posts" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                공부 기록 보기
              </Link>
              <Link href="/about" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 cursor-pointer whitespace-nowrap">
                소개 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">45</div>
              <div className="text-gray-600">총 게시글</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-gray-600">카테고리</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">120</div>
              <div className="text-gray-600">공부 시간</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">30</div>
              <div className="text-gray-600">연속 일수</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">최근 공부 기록</h2>
            <p className="text-gray-600">최근에 작성한 공부 내용들을 확인해보세요</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/posts" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap">
              모든 게시글 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">공부 카테고리</h2>
            <p className="text-gray-600">분야별로 정리된 학습 내용을 둘러보세요</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href="/categories" className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${category.color}`}>
                  {category.name}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{category.count}</div>
                <div className="text-gray-600 text-sm">게시글</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
