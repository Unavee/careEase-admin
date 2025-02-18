import CountUp from "react-countup";
import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  UserRoundCheck,
  TrendingUp,
  Ambulance
} from "lucide-react";

const stats = [
  { 
    value: 25000, 
    label: "Successful Treatments", 
    icon: <HeartHandshake className="w-8 h-8 text-primary-blue" />,
    color: "text-blue-200"
  },
  { 
    value: 500, 
    label: "Expert Specialists", 
    icon: <UserRoundCheck className="w-8 h-8 text-primary-blue" />,
    color: "text-green-200"
  },
  { 
    value: 95, 
    label: "Success Rate", 
    icon: <TrendingUp className="w-8 h-8 text-primary-blue" />,
    color: "text-yellow-300"
  },
  { 
    value: 24, 
    label: "Emergency Care", 
    icon: <Ambulance className="w-8 h-8 text-primary-blue" />,
    color: "text-red-200"
  },
];

export default function Stats() {
  return (
    <div className="bg-gradient-to-br from-blue-100/60 to-teal-200/40 relative text-white rounded-xl p-5 m-8 text-center border border-white/20 max-w-5xl mx-auto shadow-lg overflow-hidden">
      
      {/* Animated Background Pattern */}
      {/* <motion.div 
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-gradient-to-r from-white/10 to-transparent" />
      </motion.div> */}

      <h3 className="text-2xl font-bold mb-2 text-primary-blue">Why Choose Us?</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-primary-blue">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className={`p-4 flex flex-col items-center ${index < stats.length - 1 ? 'md:border-r border-white/20' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Icon Container */}
            <div className={`mb-4 p-3 rounded-full backdrop-blur-sm shadow-lg ${stat.color}`}>
              <motion.div 
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>
            </div>

            {/* Animated Counter */}
            <div className="text-3xl font-bold mb-2 text-primary-blue">
              <CountUp 
                start={0} 
                end={stat.value} 
                duration={2.5} 
                separator=","
                decimals={stat.label === "Success Rate" ? 1 : 0}
              />
              {stat.label === "Success Rate" ? "%" : "+"}
            </div>

            <div className="text-sm text-blue-800">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}