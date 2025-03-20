// app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import EventHeader from './components/EventHeader';
import EventTabs from './components/EventTabs';
import DetailsSection from './components/DetailsSection';
import TimelineSection from './components/Timeline';
import DatesSection from './components/DatesSection';
import PrizesSection from './components/PrizesSection';
import ReviewsSection from './components/ReviewsSection';
import FAQsSection from './components/FAQsSection';

export default function Code2CareerEvent() {
  const [activeTab, setActiveTab] = useState('details');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Create refs for each section
  const sectionRefs = {
    details: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    dates: useRef<HTMLDivElement>(null),
    prizes: useRef<HTMLDivElement>(null),
    reviews: useRef<HTMLDivElement>(null),
    faqs: useRef<HTMLDivElement>(null)
  };

  // Countdown timer for registration deadline
  useEffect(() => {
    const deadline = new Date('Apr 11, 2025 23:59:59').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer to update active tab based on scroll position
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-15% 0px -70% 0px', // Adjusted to be more responsive
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get the section id from the entry and update active tab
          const sectionId = entry.target.id;
          setActiveTab(sectionId);
        }
      });
    }, options);

    // Observe all section refs
    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const isEventActive = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return now >= start && now <= end;
  }
  // Event stages data
  const stages = [
    {
      date: "12 Apr 25",
      title: "Code2Career Aptitude Challenge",
      description: "Test your problem-solving and logical reasoning skills! This round will assess your aptitude in areas like quantitative reasoning, logical thinking, and verbal ability—essential skills for cracking placement tests.",
      startTime: "09:00 AM IST",
      endTime: "10:59 PM IST",
      isActive: isEventActive("2025-04-12T09:00:00+05:30", "2025-04-12T22:59:59+05:30")
    },
    {
      date: "13 Apr 25",
      title: "Code2Career CS Fundamentals",
      description: "Evaluate your core CS knowledge! This round will test your understanding of fundamental computer science concepts such as data structures, algorithms, databases, operating systems, and OOPs—key topics for technical interviews.",
      startTime: "09:00 AM IST",
      endTime: "10:59 PM IST",
      isActive: isEventActive("2025-04-13T09:00:00+05:30", "2025-04-13T22:59:59+05:30")
    },
    {
      date: "20 Apr 25",
      title: "Code2Career Coding Arena - Coding Round (on Unstop)",
      description: "Solve real-world coding problems! In this final round, you will tackle coding challenges that test your ability to write efficient and optimized code. This round simulates the kind of questions asked in technical interviews by top companies.",
      startTime: "10:00 AM IST",
      endTime: "10:59 PM IST",
      isActive: isEventActive("2025-04-20T10:00:00+05:30", "2025-04-20T22:59:59+05:30")
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Scroll to tab section with smooth scrolling
  const scrollToSection = (sectionId: string) => {
    setShowMobileMenu(false);
    const sectionRef = sectionRefs[sectionId as keyof typeof sectionRefs];

    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setActiveTab(sectionId);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <EventHeader
          countdown={countdown}
          scrollToSection={scrollToSection}
        />

        {/* Sticky Navigation */}
        <div className="sticky top-0 z-50 bg-white shadow-md">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-between items-center px-5 py-4 border-b border-gray-200">
            <span className="font-semibold text-indigo-600 text-lg">Code2Career</span>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md p-1 transition-colors duration-200"
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
            >
              {showMobileMenu ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="md:hidden bg-white border-b border-gray-200 py-2 absolute w-full shadow-lg rounded-b-lg">
              {['details', 'timeline', 'dates', 'prizes', 'reviews', 'faqs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`block w-full text-left px-5 py-3 transition-colors duration-200 ${activeTab === tab
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {tab === 'details' && 'Details'}
                  {tab === 'timeline' && 'Stages & Timeline'}
                  {tab === 'dates' && 'Dates & Deadlines'}
                  {tab === 'prizes' && '🏆 Cash Prizes'}
                  {tab === 'reviews' && 'Reviews'}
                  {tab === 'faqs' && 'FAQs & Discussions'}
                </button>
              ))}
            </div>
          )}

          {/* Desktop Tabs Navigation */}
          <EventTabs
            activeTab={activeTab}
            scrollToSection={scrollToSection}
          />
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          {/* Details Section */}
          <div
            id="details"
            ref={sectionRefs.details}
            className="scroll-mt-20 py-12 sm:py-16"
          >
            <DetailsSection
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>

          {/* Timeline Section */}
          <div
            id="timeline"
            ref={sectionRefs.timeline}
            className="scroll-mt-20 py-12 sm:py-16"
          >
            <TimelineSection
              stages={stages}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>

          {/* Dates Section */}
          <div
            id="dates"
            ref={sectionRefs.dates}
            className="scroll-mt-20 py-12 sm:py-16"
          >
            <DatesSection
              stages={stages}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>

          {/* Prizes Section */}
          <div
            id="prizes"
            ref={sectionRefs.prizes}
            className="scroll-mt-20 py-12 sm:py-16"
          >
            <PrizesSection
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>

          {/* Reviews Section */}
          <div
            id="reviews"
            ref={sectionRefs.reviews}
            className="scroll-mt-20 py-12 sm:py-16"
          >
            <ReviewsSection
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>

          {/* FAQs Section */}
          <div
            id="faqs"
            ref={sectionRefs.faqs}
            className="scroll-mt-20 py-12 sm:py-16"
          >
            <FAQsSection
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>
        </div>
        
      </div>
    </>
  );
}