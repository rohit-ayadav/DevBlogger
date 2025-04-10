"use client";
import React, { useState } from 'react';
import { Search, Code, ChevronRight, Filter, Star, BookOpen, Download, ExternalLink } from 'lucide-react';

const CheatSheets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Expanded cheatsheet data with more tech stacks
  const cheatsheets = [
    {
      id: 1,
      title: 'Python Cheatsheet',
      description: 'Essential Python syntax, built-in functions, and common libraries',
      category: 'backend',
      slug: '/cheatsheets/python',
      icon: '🐍',
      popular: true,
      color: 'bg-blue-50 text-blue-600',
      downloads: 3240
    },
    {
      id: 2,
      title: 'JavaScript Cheatsheet',
      description: 'Core JavaScript concepts, ES6+ features, and DOM manipulation',
      category: 'frontend',
      slug: '/cheatsheets/javascript',
      icon: '🟨',
      popular: true,
      color: 'bg-yellow-50 text-yellow-600',
      downloads: 4150
    },
    {
      id: 3,
      title: 'React.js Cheatsheet',
      description: 'React hooks, components, state management, and best practices',
      category: 'frontend',
      slug: '/cheatsheets/react',
      icon: '⚛️',
      popular: true,
      color: 'bg-cyan-50 text-cyan-600',
      downloads: 3890
    },
    {
      id: 4,
      title: 'C Programming Cheatsheet',
      description: 'C syntax, memory management, pointers, and standard library',
      category: 'backend',
      slug: '/cheatsheets/c',
      icon: '©️',
      color: 'bg-purple-50 text-purple-600',
      downloads: 1870
    },
    {
      id: 5,
      title: 'Git Commands Cheatsheet',
      description: 'Essential git commands and workflows for version control',
      category: 'tools',
      slug: '/cheatsheets/git',
      icon: '📝',
      popular: true,
      color: 'bg-orange-50 text-orange-600',
      downloads: 5230
    },
    {
      id: 6,
      title: 'CSS Flexbox & Grid Cheatsheet',
      description: 'Visual guide to CSS layout techniques with examples',
      category: 'frontend',
      slug: '/cheatsheets/css-layouts',
      icon: '🎨',
      color: 'bg-pink-50 text-pink-600',
      downloads: 2740
    },
    {
      id: 7,
      title: 'Node.js Cheatsheet',
      description: 'Node.js fundamentals, npm, and server-side JavaScript',
      category: 'backend',
      slug: '/cheatsheets/nodejs',
      icon: '🟢',
      color: 'bg-green-50 text-green-600',
      downloads: 2980
    },
    {
      id: 8,
      title: 'SQL Cheatsheet',
      description: 'SQL queries, joins, indexes, and database operations',
      category: 'data',
      slug: '/cheatsheets/sql',
      icon: '🗄️',
      popular: true,
      color: 'bg-indigo-50 text-indigo-600',
      downloads: 3450
    },
    {
      id: 9,
      title: 'Java Cheatsheet',
      description: 'Java syntax, object-oriented concepts, and standard libraries',
      category: 'backend',
      slug: '/cheatsheets/java',
      icon: '☕',
      color: 'bg-red-50 text-red-600',
      downloads: 2850
    },
    {
      id: 10,
      title: 'C++ Cheatsheet',
      description: 'C++ syntax, STL, object-oriented features, and memory management',
      category: 'backend',
      slug: '/cheatsheets/cpp',
      icon: '🔧',
      color: 'bg-blue-50 text-blue-600',
      downloads: 2340
    },
    {
      id: 11,
      title: 'TypeScript Cheatsheet',
      description: 'TypeScript types, interfaces, and advanced features',
      category: 'frontend',
      slug: '/cheatsheets/typescript',
      icon: '🔷',
      popular: true,
      color: 'bg-blue-50 text-blue-600',
      downloads: 3120
    },
    {
      id: 12,
      title: 'Docker Cheatsheet',
      description: 'Essential Docker commands, Dockerfile syntax, and container management',
      category: 'devops',
      slug: '/cheatsheets/docker',
      icon: '🐳',
      color: 'bg-cyan-50 text-cyan-600',
      downloads: 2980
    },
    {
      id: 13,
      title: 'Vue.js Cheatsheet',
      description: 'Vue.js directives, components, and state management',
      category: 'frontend',
      slug: '/cheatsheets/vue',
      icon: '🟩',
      color: 'bg-green-50 text-green-600',
      downloads: 1890
    },
    {
      id: 14,
      title: 'Go (Golang) Cheatsheet',
      description: 'Go syntax, concurrency patterns, and standard libraries',
      category: 'backend',
      slug: '/cheatsheets/golang',
      icon: '🐹',
      color: 'bg-cyan-50 text-cyan-600',
      downloads: 2140
    },
    {
      id: 15,
      title: 'Kubernetes Cheatsheet',
      description: 'Kubernetes commands, YAML configs, and cluster management',
      category: 'devops',
      slug: '/cheatsheets/kubernetes',
      icon: '⎈',
      color: 'bg-blue-50 text-blue-600',
      downloads: 2670
    }
  ];

  // Expanded filter categories
  const categories = [
    { id: 'all', name: 'All Cheatsheets' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'data', name: 'Data' },
    { id: 'devops', name: 'DevOps' },
    { id: 'tools', name: 'Tools' },
    { id: 'popular', name: 'Popular' }
  ];

  // Filter cheatsheets based on search and category
  const filteredCheatsheets = cheatsheets.filter((cheatsheet) => {
    const matchesSearch = cheatsheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cheatsheet.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'popular') return matchesSearch && cheatsheet.popular;
    return matchesSearch && cheatsheet.category === activeFilter;
  });

  // Get featured cheatsheets (top 3 by downloads)
  const featuredCheatsheets = [...cheatsheets]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 mb-12 text-white shadow-lg">
          <div className="md:flex items-center justify-between">
            <div className="md:w-3/5">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Programming Cheatsheets</h1>
              <p className="text-lg opacity-90 mb-6">
                Master your coding skills with our comprehensive collection of cheatsheets.
                Quick reference guides for all popular programming languages and frameworks.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium flex items-center transition-colors">
                  <Download size={18} className="mr-2" /> Download All
                </button>
                <button className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors">
                  <Star size={18} className="mr-2" /> Popular Sheets
                </button>
              </div>
            </div>
            <div className="hidden md:block md:w-2/5">
              <div className="relative h-64 flex items-center justify-center">
                <div className="absolute transform rotate-6 bg-white/10 p-6 rounded-lg border border-white/20 backdrop-blur-sm">
                  <div className="text-xl font-mono">const <span className="text-yellow-300">dev</span> = {`{`}</div>
                  <div className="text-xl font-mono pl-4"><span className="text-green-300">code</span>: <span className="text-purple-300">'faster'</span>,</div>
                  <div className="text-xl font-mono pl-4"><span className="text-green-300">learn</span>: <span className="text-purple-300">'deeper'</span></div>
                  <div className="text-xl font-mono">{`}`};</div>
                </div>
                <div className="absolute transform -rotate-6 -translate-x-8 translate-y-6 bg-white/10 p-6 rounded-lg border border-white/20 backdrop-blur-sm">
                  <div className="text-xl font-mono"><span className="text-cyan-300">function</span> <span className="text-yellow-300">master</span>() {`{`}</div>
                  <div className="text-xl font-mono pl-4"><span className="text-green-300">return</span> <span className="text-purple-300">'skills'</span>;</div>
                  <div className="text-xl font-mono">{`}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured cheatsheets */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Star size={22} className="text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Featured Cheatsheets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCheatsheets.map((cheatsheet) => (
              <a
                href={cheatsheet.slug}
                key={`featured-${cheatsheet.id}`}
                className={`${cheatsheet.color} rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-1 flex flex-col border-2 border-white`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{cheatsheet.icon}</span>
                  <span className="bg-white/70 backdrop-blur-sm text-xs px-3 py-1 rounded-full font-medium flex items-center">
                    <Download size={12} className="mr-1" /> {cheatsheet.downloads.toLocaleString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{cheatsheet.title}</h3>
                <p className="mt-2 text-sm opacity-80 flex-grow">{cheatsheet.description}</p>
                <div className="flex items-center mt-4 font-medium">
                  View Cheatsheet <ChevronRight size={16} className="ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Search and filter section */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search bar */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search cheatsheets..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>

            {/* Filter tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              <Filter size={16} className="text-gray-500" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${activeFilter === category.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cheatsheets grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCheatsheets.length > 0 ? (
            filteredCheatsheets.map((cheatsheet) => (
              <a
                href={cheatsheet.slug}
                key={cheatsheet.id}
                className="bg-white rounded-xl border hover:shadow-lg transition-all hover:-translate-y-1 p-6 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`${cheatsheet.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                    {cheatsheet.icon}
                  </div>
                  {cheatsheet.popular && (
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                      <Star size={12} className="mr-1" /> Popular
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">{cheatsheet.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow text-sm">{cheatsheet.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 flex items-center">
                    <Download size={14} className="mr-1" /> {cheatsheet.downloads.toLocaleString()} downloads
                  </div>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-500">
                    View <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-16 bg-white rounded-xl">
              <Code size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-500">No cheatsheets found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter subscription */}
        <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-center text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-3">Stay Updated with New Cheatsheets</h3>
              <p className="opacity-90 max-w-xl">
                Subscribe to our newsletter and be the first to know when we release new cheatsheets or update existing ones with the latest tech information.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
                />
                <button className="bg-white text-indigo-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Why Choose Our Cheatsheets?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-600">Our cheatsheets cover everything from basic syntax to advanced techniques for each technology stack.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Code size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Practical Examples</h3>
              <p className="text-gray-600">Learn with practical, ready-to-use code examples that demonstrate real-world applications.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ExternalLink size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Regularly Updated</h3>
              <p className="text-gray-600">All cheatsheets are kept up-to-date with the latest language features and industry best practices.</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Boost Your Coding Skills?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse our comprehensive collection of cheatsheets and accelerate your development journey.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center">
              <Download size={18} className="mr-2" /> Download All Cheatsheets
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-lg transition-colors flex items-center">
              <Star size={18} className="mr-2" /> Request New Cheatsheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheatSheets;