// components/faq.tsx
"use client";
import { useState, useMemo } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'Child Care' | 'Women Care' | 'Fertility Care';
}

const faqs: FAQ[] = [
  // Child Care FAQs
  {
    id: 1,
    question: 'How much should my newborn sleep?',
    answer: 'Newborns typically sleep for about 16-20 hours a day, but their sleep is divided into short periods and may not follow a regular schedule.',
    category: 'Child Care'
  },
  {
    id: 2,
    question: 'When do babies start rolling over?',
    answer: 'Most babies begin rolling over at around 4-6 months of age, although the timing can vary.',
    category: 'Child Care'
  },
  {
    id: 3,
    question: 'What are the typical feeding patterns for a newborn?',
    answer: 'Newborns typically feed every 2-3 hours, as they have small stomachs. Breast milk upto 6 months is highly recommended or formula suggested by the paediatrician.',
    category: 'Child Care'
  },
  {
    id: 4,
    question: 'When do babies usually start sitting up?',
    answer: 'Babies can typically sit with support at around 4-7 months and sit independently at around 6-9 months.',
    category: 'Child Care'
  },
  // Women Care FAQs
  {
    id: 5,
    question: 'What are common menstrual problems?',
    answer: 'Common menstrual problems include irregular periods, heavy bleeding, painful cramps, and PMS symptoms. Consult a healthcare provider for persistent issues.',
    category: 'Women Care'
  },
  {
    id: 6,
    question: 'How often should I have a mammogram?',
    answer: 'Women aged 40-74 should have mammograms every 2 years. Those with higher risk factors may need more frequent screenings.',
    category: 'Women Care'
  },
  // Fertility Care FAQs
  {
    id: 7,
    question: 'What factors affect fertility?',
    answer: 'Fertility can be affected by age, lifestyle factors (smoking, alcohol), weight, stress, medical conditions, and reproductive health issues.',
    category: 'Fertility Care'
  },
  {
    id: 8,
    question: 'When should I consult a fertility specialist?',
    answer: "Consider consulting if you're under 35 and haven't conceived after a year of trying, or if you're over 35 and haven't conceived after 6 months.",
    category: 'Fertility Care'
  }
];

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Child Care');
  const tabs = ['Child Care', 'Women Care', 'Fertility Care'];

  const filteredResults = useMemo(() => {
    return faqs.filter(faq => {
      const matchesQuery = !searchQuery || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesQuery && faq.category === activeTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="w-full bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-black">Ask Our Experts</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Unlock answers, gain insights: Engage with our esteemed experts who provide valuable guidance, 
            expert advice, and personalized solutions to address your queries and empower your decision-making process.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Ask your query here"
            className="w-full text-gray-600 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            aria-label="Search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex justify-center -mb-px max-w-2xl mx-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  transition-colors duration-200
                `}
                aria-selected={activeTab === tab ? 'true' : 'false'}
                role="tab"
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Panels */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResults.map((faq) => (
              <div
                key={faq.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-purple-600 font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
            {searchQuery && filteredResults.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                  <p className="text-gray-500">
                    No results match your search criteria. Try adjusting your search terms.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;