import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  // Child Care
  { id: 1, question: 'How much should my newborn sleep?', answer: 'Newborns typically sleep for about 16-20 hours a day, but their sleep is divided into short periods and may not follow a regular schedule.', category: 'Child Care' },
  { id: 2, question: 'When do babies start rolling over?', answer: 'Most babies begin rolling over at around 4-6 months of age, although the timing can vary.', category: 'Child Care' },
  { id: 3, question: 'What are the typical feeding patterns for a newborn?', answer: 'Newborns typically feed every 2-3 hours, as they have small stomachs. Breast milk up to 6 months is highly recommended or formula suggested by the pediatrician.', category: 'Child Care' },
  { id: 4, question: 'When do babies usually start sitting up?', answer: 'Babies can typically sit with support at around 4-7 months and sit independently at around 6-9 months.', category: 'Child Care' },
  { id: 5, question: 'How do I know if my baby is teething?', answer: 'Signs of teething include drooling, irritability, gum swelling, and a tendency to chew on objects.', category: 'Child Care' },

  // Mother Care
  { id: 6, question: 'What are common menstrual problems?', answer: 'Common menstrual problems include irregular periods, heavy bleeding, painful cramps, and PMS symptoms. Consult a healthcare provider for persistent issues.', category: 'Mother Care' },
  { id: 7, question: 'How often should I have a mammogram?', answer: 'Women aged 40-74 should have mammograms every 2 years. Those with higher risk factors may need more frequent screenings.', category: 'Mother Care' },
  { id: 8, question: 'How can mothers manage postpartum depression?', answer: 'Seeking support from family, therapy, and maintaining a healthy lifestyle can help manage postpartum depression.', category: 'Mother Care' },
  { id: 9, question: 'What are the symptoms of postpartum depression?', answer: 'Symptoms may include mood swings, fatigue, feelings of sadness, and difficulty bonding with the baby.', category: 'Mother Care' },
  { id: 10, question: 'How can I relieve pregnancy-related back pain?', answer: 'Practicing good posture, prenatal yoga, using a maternity support belt, and sleeping with a pregnancy pillow can help ease discomfort.', category: 'Mother Care' },

  // Elderly Care
  { id: 11, question: 'What factors affect fertility?', answer: 'Fertility can be affected by age, lifestyle factors (smoking, alcohol), weight, stress, medical conditions, and reproductive health issues.', category: 'Elderly Care' },
  { id: 12, question: 'When should I consult a fertility specialist?', answer: "Consider consulting if you're under 35 and haven't conceived after a year of trying, or if you're over 35 and haven't conceived after 6 months.", category: 'Elderly Care' },
  { id: 13, question: 'What are common health concerns for the elderly?', answer: 'Common concerns include arthritis, osteoporosis, heart disease, and memory-related issues like dementia.', category: 'Elderly Care' },
  { id: 14, question: 'How can seniors maintain bone health?', answer: 'Regular exercise, a calcium-rich diet, and vitamin D supplements can help maintain strong bones and prevent osteoporosis.', category: 'Elderly Care' },
  { id: 15, question: 'What are some tips for fall prevention in the elderly?', answer: 'Installing grab bars, using non-slip mats, ensuring good lighting, and regular exercise can reduce the risk of falls.', category: 'Elderly Care' },

  // Post-Accident Care
  { id: 16, question: 'What is post-accident rehabilitation?', answer: 'Post-accident rehabilitation includes physical therapy, counseling, and medical support to aid recovery.', category: 'Post-Accident Care' },
  { id: 17, question: 'How long does rehabilitation take after an accident?', answer: 'Recovery time varies depending on the severity of the injury, but rehabilitation can take weeks to months.', category: 'Post-Accident Care' },
  { id: 18, question: 'What types of therapy are involved in post-accident care?', answer: 'Rehabilitation may include physiotherapy, occupational therapy, speech therapy, and psychological support.', category: 'Post-Accident Care' },

  // Physiotherapy
  { id: 19, question: 'What are common physiotherapy treatments?', answer: 'Treatments include manual therapy, exercises, and electrotherapy to aid recovery from injuries and conditions.', category: 'Physiotherapy' },
  { id: 20, question: 'How does physiotherapy help in recovery?', answer: 'Physiotherapy improves mobility, reduces pain, and enhances strength and coordination.', category: 'Physiotherapy' },
  { id: 21, question: 'Is physiotherapy useful for chronic pain management?', answer: 'Yes, physiotherapy can help manage chronic pain through guided exercises, posture correction, and pain-relief techniques.', category: 'Physiotherapy' },

  // Home Medical Services
  { id: 22, question: 'What services are included in home medical care?', answer: 'Home medical services include nursing care, physical therapy, and medication management.', category: 'Home Medical Services' },
  { id: 23, question: 'Is home medical care suitable for elderly patients?', answer: 'Yes, home medical care provides personalized treatment for elderly patients who require assistance with daily activities and medical needs.', category: 'Home Medical Services' },
  { id: 24, question: 'How do I choose the right home healthcare provider?', answer: 'Look for licensed professionals with experience, check reviews, and ensure they offer the required medical services.', category: 'Home Medical Services' },

  // Special Needs Care
  { id: 25, question: 'How do you support individuals with special needs?', answer: 'Support includes personalized education plans, therapy, and medical care as per the individual’s needs.', category: 'Special Needs Care' },
  { id: 26, question: 'What types of therapy are available for individuals with special needs?', answer: 'Speech therapy, occupational therapy, and behavioral therapy are common types of support.', category: 'Special Needs Care' },
  { id: 27, question: 'How can parents support a child with special needs at home?', answer: 'Providing a structured routine, positive reinforcement, and working with professionals can help in their development.', category: 'Special Needs Care' },

  // Intensive Care at Home
  { id: 28, question: 'What is intensive care at home?', answer: 'Intensive care at home involves advanced medical supervision and equipment support for critical patients.', category: 'Intensive Care at Home' },
  { id: 29, question: 'Who needs intensive care at home?', answer: 'Patients with severe chronic illnesses, post-surgical needs, or long-term ventilation support may require intensive home care.', category: 'Intensive Care at Home' },
  { id: 30, question: 'How is home ICU different from hospital ICU?', answer: 'Home ICU provides personalized care in a comfortable environment, whereas hospital ICUs have more advanced emergency resources.', category: 'Intensive Care at Home' }
];

// console.log(faqs);


const Faq = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Child Care');
  const tabs = ['Elderly Care', 'Mother Care', 'Child Care', 'Post-Accident Care', 'Physiotherapy', 'Home Medical Services', 'Special Needs Care', 'Intensive Care at Home'];

  const filteredResults = useMemo(() => {
    return faqs.filter(faq => {
      const matchesQuery = !searchQuery || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesQuery && faq.category === activeTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="w-full mb-12 p-5">
      <div className="w-full px-4 py-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-primary-blue">FAQ</h1>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Ask your query here"
            className="w-full text-primary-blue px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-blue text-white p-2 rounded-full hover:primary-blue transition-colors"
            aria-label="Search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
  <nav className="pb-4 -mb-px max-w-6xl mx-auto" aria-label="Tabs">
    <div className="flex flex-nowrap lg:justify-center space-x-4 px-4 overflow-x-auto sm:overflow-hidden sm:flex-wrap scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-3 px-5 text-center border-b-2 font-medium text-md 
            ${activeTab === tab
              ? 'border-primary-green text-primary-blue'
              : 'border-transparent text-blue-800 '
            }
            transition-all duration-300 ease-in-out whitespace-nowrap
          `}
          aria-selected={activeTab === tab ? 'true' : 'false'}
          role="tab"
        >
          {tab}
        </button>
      ))}
    </div>
  </nav>
</div>


        {/* Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResults.map((faq) => (
              <motion.div
                key={faq.id}
                className="bg-primary-blue p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }} // Initial state: hidden and slightly moved down
                animate={{ opacity: 1, y: 0 }} // Final state: fully visible and in place
                exit={{ opacity: 0, y: 20 }} // When removed: fade and move down
                transition={{ duration: 0.5 }} // Smooth transition
              >
                <h3 className="text-white font-bold mb-3">{faq.question}</h3>
                <p className="text-white text-md">{faq.answer}</p>
              </motion.div>
            ))}
            {searchQuery && filteredResults.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">No questions found</h3>
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