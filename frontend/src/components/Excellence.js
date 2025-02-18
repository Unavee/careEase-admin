import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircle,
  HeartPulse,
  Brain,
  Pill,
  Baby,
  Milk,
  HeartHandshake,
  Syringe,
  Utensils,
  Cannabis,
  Ambulance,
  Bandage,
  Bone,
  Armchair,
  Weight,
  Footprints,
  Home,
  Stethoscope,
  Accessibility,
  Speech,
  Eye,
  AlertCircle,
  BookHeartIcon,
  LifeBuoy
} from 'lucide-react';

const mockData = [
  {
    id: 'elderly-care',
    name: 'Elderly Care',
    backgroundImage: 'https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    services: [
      { id: '1', title: 'Senior Wellness', icon: <UserCircle size={32}  className="text-white"/>, description: 'Personalized health programs for active aging' },
      { id: '2', title: 'Cardiac Care', icon: <HeartPulse size={32} className="text-white" />, description: '24/7 cardiac monitoring and support' },
      { id: '3', title: 'Memory Care', icon: <Brain size={32} className="text-white"/>, description: 'Specialized dementia and Alzheimer care' },
      { id: '4', title: 'Medication Management', icon: <Pill size={32} className="text-white" />, description: 'Professional medication supervision' },
    ]
  },
  {
    id: 'mother-care',
    name: 'Mother Care',
    backgroundImage: 'https://images.unsplash.com/photo-1612336307429-8a0d5b5e32d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    services: [
      { id: '5', title: 'Newborn Care', icon: <Baby size={32} className="text-white" />, description: 'Complete newborn care solutions' },
      { id: '6', title: 'Lactation Support', icon: <Milk size={32} className="text-white"/>, description: 'Expert breastfeeding guidance' },
      { id: '7', title: 'Postnatal Care', icon: <HeartHandshake size={32}  className="text-white"/>, description: 'Mother and baby wellness programs' },
      { id: '8', title: 'Nutrition Plans', icon: <Utensils size={32} className="text-white" />, description: 'Customized diet plans for mothers' },
    ]
  },
  {
    id: 'child-care',
    name: 'Child Care',
    backgroundImage: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    services: [
      { id: '9', title: 'Vaccinations', icon: <Syringe size={32} className="text-white" />, description: 'Complete immunization management' },
      { id: '10', title: 'Pediatric Care', icon: <Cannabis size={32} className="text-white" />, description: 'Regular health checkups' },
      { id: '11', title: 'Developmental Checks', icon: <Footprints size={32} className="text-white" />, description: 'Growth milestone monitoring' },
      { id: '12', title: 'Emergency Care', icon: <Ambulance size={32} className="text-white" />, description: '24/7 pediatric emergency support' },
    ]
  },
  {
    id: 'post-accident-care',
    name: 'Post-Accident Care',
    backgroundImage: '/accident.jpg',
    services: [
      { id: '13', title: 'Wound Care', icon: <Bandage size={32} className="text-white" />, description: 'Professional wound management' },
      { id: '14', title: 'Fracture Care', icon: <Bone size={32} className="text-white" />, description: 'Orthopedic recovery programs' },
      { id: '15', title: 'Trauma Support', icon: <Armchair size={32} className="text-white" />, description: 'Psychological rehabilitation' },
      { id: '16', title: 'Mobility Aid', icon: <Weight size={32} className="text-white" />, description: 'Physical therapy and equipment' },
    ]
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    services: [
      { id: '17', title: 'Mobility Therapy', icon: <Footprints size={32}  className="text-white"/>, description: 'Restore movement and function' },
      { id: '18', title: 'Pain Management', icon: <Armchair size={32} className="text-white" />, description: 'Chronic pain relief therapies' },
      { id: '19', title: 'Post-Surgical Rehab', icon: <Weight size={32} className="text-white" />, description: 'Recovery after operations' },
      { id: '20', title: 'Sports Injury', icon: <Bone size={32} className="text-white" />, description: 'Athlete recovery programs' },
    ]
  },
  {
    id: 'home-medical-services',
    name: 'Home Medical Services',
    backgroundImage: 'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    services: [
      { id: '21', title: 'Nursing Care', icon: <Stethoscope size={32} className="text-white" />, description: 'Professional home nursing' },
      { id: '22', title: 'Medical Equipment', icon: <Home size={32} className="text-white" />, description: 'Equipment setup and maintenance' },
      { id: '23', title: 'Health Monitoring', icon: <BookHeartIcon size={32} className="text-white" />, description: 'Regular vital checks' },
      { id: '24', title: 'Palliative Care', icon: <HeartHandshake size={32}  className="text-white"/>, description: 'Comfort-focused treatment' },
    ]
  },
  {
    id: 'special-needs-care',
    name: 'Special Needs Care',
    backgroundImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    services: [
      { id: '25', title: 'Autism Support', icon: <Accessibility size={32} className="text-white" />, description: 'Specialized ASD care' },
      { id: '26', title: 'Mobility Assistance', icon: <Armchair size={32} className="text-white" />, description: 'Physical disability support' },
      { id: '27', title: 'Speech Therapy', icon: <Speech size={32} className="text-white" />, description: 'Communication skills development' },
      { id: '28', title: 'Visual Support', icon: <Eye size={32} className="text-white" />, description: 'Low vision assistance' },
    ]
  },
  {
    id: 'intensive-care-at-home',
    name: 'Intensive Care at Home',
    backgroundImage: 'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    services: [
      { id: '29', title: 'Critical Care', icon: <AlertCircle size={32} className="text-white" />, description: '24/7 medical supervision' },
      { id: '30', title: 'Ventilator Support', icon: <LifeBuoy size={32} className="text-white" />, description: 'Respiratory system management' },
      { id: '31', title: 'IV Therapy', icon: <Syringe size={32} className="text-white" />, description: 'Intravenous treatment administration' },
      { id: '32', title: 'Pain Management', icon: <Pill size={32} className="text-white" />, description: 'Advanced pain control' },
    ]
  }
];

export default function Excellence() {
  const [selectedTab, setSelectedTab] = useState('elderly-care');
  const activeCategory = mockData.find(cat => cat.id === selectedTab);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100/60 to-teal-200/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-primary-blue mb-4"
          >
            Specialized Care Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-800 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Comprehensive healthcare solutions tailored to individual needs
          </motion.p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {mockData.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedTab(category.id)}
              className={`px-4 py-2 text-sm sm:text-base rounded-full transition-colors ${
                selectedTab === category.id 
                  ? 'bg-primary-blue text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Services Container */}
        <motion.div 
          className="relative rounded-xl overflow-hidden shadow-lg bg-primary-blue min-h-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${activeCategory?.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          </div>

          {/* Services Grid */}
          <div className="relative z-10 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeCategory?.services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="bg-primary-blue/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl sm:text-3xl">{service.icon}</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-white text-sm sm:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}