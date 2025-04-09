"use client";
import React, { useState } from 'react';
import { Search, BookOpen, ChevronRight, Filter, Star, ThumbsUp, Clock, BrainCircuit, CheckCircle, MessageCircle } from 'lucide-react';

const InterviewQuestions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Sample interview questions data - replace with your actual data
  const interviewQuestionSets = [
    {
      id: 1,
      title: 'Python Interview Questions',
      description: 'Common Python questions covering core concepts, data structures, and algorithms',
      category: 'backend',
      slug: '/interview-questions/python',
      icon: '🐍',
      questions: 135,
      difficulty: 'medium',
      color: 'bg-blue-50 text-blue-600',
      popular: true,
      updated: '2 weeks ago',
      likes: 452
    },
    {
      id: 2,
      title: 'JavaScript Interview Questions',
      description: 'Essential JavaScript concepts, closures, promises, and DOM manipulation',
      category: 'frontend',
      slug: '/interview-questions/javascript',
      icon: '🟨',
      questions: 200,
      difficulty: 'medium',
      color: 'bg-yellow-50 text-yellow-600',
      popular: true,
      updated: '3 days ago',
      likes: 618
    },
    {
      id: 3,
      title: 'React.js Interview Questions',
      description: 'React concepts, hooks, state management, and optimization techniques',
      category: 'frontend',
      slug: '/interview-questions/react',
      icon: '⚛️',
      questions: 150,
      difficulty: 'hard',
      color: 'bg-cyan-50 text-cyan-600',
      popular: true,
      updated: '1 week ago',
      likes: 537
    },
    {
      id: 4,
      title: 'C Programming Interview Questions',
      description: 'C language fundamentals, pointers, memory management, and data structures',
      category: 'backend',
      slug: '/interview-questions/c',
      icon: '©️',
      questions: 120,
      difficulty: 'hard',
      color: 'bg-purple-50 text-purple-600',
      updated: '1 month ago',
      likes: 316
    },
    {
      id: 5,
      title: 'SQL Interview Questions',
      description: 'Database concepts, complex queries, optimization, and scenarios',
      category: 'data',
      slug: '/interview-questions/sql',
      icon: '🗄️',
      questions: 110,
      difficulty: 'medium',
      color: 'bg-indigo-50 text-indigo-600',
      popular: true,
      updated: '2 weeks ago',
      likes: 429
    },
    {
      id: 6,
      title: 'Java Interview Questions',
      description: 'Core Java concepts, collections, multithreading, and design patterns',
      category: 'backend',
      slug: '/interview-questions/java',
      icon: '☕',
      questions: 180,
      difficulty: 'hard',
      color: 'bg-red-50 text-red-600',
      popular: true,
      updated: '3 weeks ago',
      likes: 491
    },
    {
      id: 7,
      title: 'System Design Interview Questions',
      description: 'Scalable architecture, microservices, databases, and design patterns',
      category: 'architecture',
      slug: '/interview-questions/system-design',
      icon: '🏗️',
      questions: 85,
      difficulty: 'expert',
      color: 'bg-blue-50 text-blue-600',
      popular: true,
      updated: '1 week ago',
      likes: 702
    },
    {
      id: 8,
      title: 'C++ Interview Questions',
      description: 'C++ concepts, STL, memory management, and advanced features',
      category: 'backend',
      slug: '/interview-questions/cpp',
      icon: '🔧',
      questions: 140,
      difficulty: 'hard',
      color: 'bg-blue-50 text-blue-600',
      updated: '1 month ago',
      likes: 344
    },
    {
      id: 9,
      title: 'Data Structures & Algorithms',
      description: 'Arrays, linked lists, trees, graphs, sorting, and complexity analysis',
      category: 'algorithms',
      slug: '/interview-questions/dsa',
      icon: '📊',
      questions: 200,
      difficulty: 'expert',
      color: 'bg-green-50 text-green-600',
      popular: true,
      updated: '5 days ago',
      likes: 826
    },
    {
      id: 10,
      title: 'Node.js Interview Questions',
      description: 'Node.js architecture, event loop, streams, and performance',
      category: 'backend',
      slug: '/interview-questions/nodejs',
      icon: '🟢',
      questions: 120,
      difficulty: 'medium',
      color: 'bg-green-50 text-green-600',
      updated: '2 weeks ago',
      likes: 317
    },
    {
      id: 11,
      title: 'DevOps Interview Questions',
      description: 'CI/CD pipelines, containerization, cloud platforms, and monitoring',
      category: 'devops',
      slug: '/interview-questions/devops',
      icon: '⚙️',
      questions: 95,
      difficulty: 'hard',
      color: 'bg-orange-50 text-orange-600',
      updated: '3 weeks ago',
      likes: 284
    },
    {
      id: 12,
      title: 'AWS Interview Questions',
      description: 'AWS services, architecture, security, and best practices',
      category: 'cloud',
      slug: '/interview-questions/aws',
      icon: '☁️',
      questions: 110,
      difficulty: 'hard',
      color: 'bg-yellow-50 text-yellow-600',
      updated: '1 month ago',
      likes: 419
    },
    {
      id: 13,
      title: 'Machine Learning Interview Questions',
      description: 'ML algorithms, data preprocessing, model evaluation, and practical scenarios',
      category: 'data-science',
      slug: '/interview-questions/machine-learning',
      icon: '🤖',
      questions: 130,
      difficulty: 'expert',
      color: 'bg-purple-50 text-purple-600',
      updated: '2 weeks ago',
      likes: 531
    },
    {
      id: 14,
      title: 'HTML & CSS Interview Questions',
      description: 'Modern layout techniques, responsive design, and browser compatibility',
      category: 'frontend',
      slug: '/interview-questions/html-css',
      icon: '🎨',
      questions: 110,
      difficulty: 'easy',
      color: 'bg-pink-50 text-pink-600',
      updated: '1 month ago',
      likes: 326
    },
    {
      id: 15,
      title: 'TypeScript Interview Questions',
      description: 'TypeScript type system, interfaces, generics, and advanced patterns',
      category: 'frontend',
      slug: '/interview-questions/typescript',
      icon: '🔷',
      questions: 95,
      difficulty: 'medium',
      color: 'bg-blue-50 text-blue-600',
      updated: '3 weeks ago',
      likes: 287
    }
  ];

  // Filter categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'data', name: 'Data' },
    { id: 'devops', name: 'DevOps' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'popular', name: 'Popular' }
  ];

  // Difficulty levels
  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
    { id: 'expert', name: 'Expert' }
  ];

  // Filter interview questions based on search, category, and difficulty
  const filteredQuestions = interviewQuestionSets.filter((questionSet) => {
    const matchesSearch = questionSet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      questionSet.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeFilter === 'all' ? true :
      (activeFilter === 'popular' ? questionSet.popular : questionSet.category === activeFilter);

    const matchesDifficulty = difficultyFilter === 'all' ? true : questionSet.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Get top interview question sets
  const topQuestionSets = [...interviewQuestionSets]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  // Function to get difficulty badge style
  const difficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-blue-100 text-blue-700';
      case 'hard':
        return 'bg-orange-100 text-orange-700';
      case 'expert':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-12 text-white shadow-lg">
          <div className="md:flex items-center justify-between">
            <div className="md:w-3/5">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Programming Interview Questions</h1>
              <p className="text-lg opacity-90 mb-6">
                Prepare for tech interviews with our comprehensive collection of interview questions.
                Practice with real questions and expert-verified answers.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-lg font-medium flex items-center transition-colors">
                  <BrainCircuit size={18} className="mr-2" /> Practice Now
                </button>
                <button className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors">
                  <Star size={18} className="mr-2" /> Top Questions
                </button>
              </div>
            </div>
            <div className="hidden md:block md:w-2/5">
              <div className="relative h-64 flex items-center justify-center">
                <div className="absolute -right-4 transform bg-white/10 p-6 rounded-lg border border-white/20 backdrop-blur-sm">
                  <div className="font-mono text-lg pb-1">// Common Interview Question</div>
                  <div className="font-mono text-lg"><span className="text-yellow-300">function</span> <span className="text-green-300">findMissingNumber</span>(nums) {'{'}</div>
                  <div className="font-mono text-lg pl-4"><span className="text-purple-300">// Your solution here</span></div>
                  <div className="font-mono text-lg">{'}'}</div>
                </div>
                <div className="absolute left-4 bottom-0 transform bg-white/10 p-6 rounded-lg border border-white/20 backdrop-blur-sm">
                  <div className="font-mono text-lg"><span className="text-cyan-300">const</span> <span className="text-yellow-300">candidate</span> = {'{'}</div>
                  <div className="font-mono text-lg pl-4"><span className="text-green-300">prepared</span>: <span className="text-purple-300">true</span>,</div>
                  <div className="font-mono text-lg pl-4"><span className="text-green-300">willSucceed</span>: <span className="text-purple-300">true</span></div>
                  <div className="font-mono text-lg">{'}'};</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top questions section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Star size={22} className="text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Most Popular Question Sets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topQuestionSets.map((questionSet) => (
              <a
                href={questionSet.slug}
                key={`top-${questionSet.id}`}
                className={`${questionSet.color} rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-1 flex flex-col border-2 border-white`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{questionSet.icon}</span>
                  <span className={`${difficultyStyle(questionSet.difficulty)} text-xs px-3 py-1 rounded-full font-medium`}>
                    {questionSet.difficulty.charAt(0).toUpperCase() + questionSet.difficulty.slice(1)}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{questionSet.title}</h3>
                <p className="mt-2 text-sm opacity-80 flex-grow">{questionSet.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm flex items-center">
                    <MessageCircle size={14} className="mr-1" /> {questionSet.questions} questions
                  </span>
                  <div className="flex items-center font-medium">
                    Practice Now <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Search and filter section */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col gap-4">
            {/* Search bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search interview questions..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
              {/* Category filters */}
              <div className="w-full md:w-auto">
                <div className="flex items-center gap-1 mb-2">
                  <Filter size={14} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${activeFilter === category.id
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      onClick={() => setActiveFilter(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty filters */}
              <div className="w-full md:w-auto">
                <div className="flex items-center gap-1 mb-2">
                  <BrainCircuit size={14} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Difficulty</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${difficultyFilter === difficulty.id
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      onClick={() => setDifficultyFilter(difficulty.id)}
                    >
                      {difficulty.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interview questions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((questionSet) => (
              <a
                href={questionSet.slug}
                key={questionSet.id}
                className="bg-white rounded-xl border hover:shadow-lg transition-all hover:-translate-y-1 p-6 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`${questionSet.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                    {questionSet.icon}
                  </div>
                  <span className={`${difficultyStyle(questionSet.difficulty)} text-xs px-2 py-1 rounded-full font-medium`}>
                    {questionSet.difficulty.charAt(0).toUpperCase() + questionSet.difficulty.slice(1)}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">{questionSet.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow text-sm">{questionSet.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <MessageCircle size={14} className="mr-1" /> {questionSet.questions} questions
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp size={14} className="mr-1" /> {questionSet.likes} likes
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" /> {questionSet.updated}
                  </div>
                </div>
                <div className="flex items-center text-indigo-600 font-medium group-hover:text-indigo-700">
                  Start Practicing <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-16 bg-white rounded-xl">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-500">No question sets found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                  setDifficultyFilter('all');
                }}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Benefits section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Level Up Your Interview Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Verified Questions</h3>
              <p className="text-gray-600">All questions are sourced from real technical interviews and verified by industry experts.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BrainCircuit size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Detailed Explanations</h3>
              <p className="text-gray-600">Complete with step-by-step explanations, time complexity analysis, and alternative approaches.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Community Discussion</h3>
              <p className="text-gray-600">Learn from the community with discussions, alternative solutions, and helpful tips.</p>
            </div>
          </div>
        </div>

        {/* Interview prep tips */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Interview Preparation Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="text-xl font-bold mb-3">Technical Preparation</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-0.5 text-green-300" />
                  <span>Review core computer science concepts and data structures</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-0.5 text-green-300" />
                  <span>Practice coding problems with time constraints</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-0.5 text-green-300" />
                  <span>Understand system design principles and scalability</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-0.5 text-green-300" />
                  <span>Prepare to explain your thought process clearly</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="text-xl font-bold mb-3">Behavioral Preparation</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-0.5 text-green-300" />
                  <span>Prepare stories about challenging projects</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-0.5 text-green-300" />
                  <span>Practice the STAR method for behavioral questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-0.5 text-green-300" />
                  <span>Research the company culture and values</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="mr-2 mt-0.5 text-green-300" />
                  <span>Prepare thoughtful questions to ask your interviewers</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="/interview-guide" className="inline-block bg-white text-purple-600 hover:bg-purple-50 font-medium px-6 py-3 rounded-lg transition-colors mt-4">
              Read Our Complete Interview Guide
            </a>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="mt-16 bg-white rounded-xl p-8 border shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Get Weekly Interview Questions</h3>
              <p className="text-gray-600 max-w-xl">
                Subscribe to receive handpicked interview questions delivered to your inbox every week, tailored to your technology stack.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Prepare with our comprehensive interview questions and land your dream job in tech.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center">
              <BrainCircuit size={18} className="mr-2" /> Start Practicing
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-lg transition-colors flex items-center">
              <Star size={18} className="mr-2" /> View Top Questions
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-gray-600 text-sm">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} DevBlogger.in • All rights reserved
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-600">About</a>
              <a href="#" className="hover:text-indigo-600">Contact</a>
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default InterviewQuestions;