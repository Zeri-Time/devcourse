
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer" style={{ fontFamily: 'var(--font-pacifico)' }}>
            StudyLog
          </Link>
          
          <nav className="flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap">
              홈
            </Link>
            <Link href="/posts" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap">
              공부 기록
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap">
              카테고리
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer whitespace-nowrap">
              소개
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
