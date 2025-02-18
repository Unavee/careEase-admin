
import { Link } from "react-router-dom";


import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-100/60 to-teal-200/40 text-black px-4 py-12 shadow-lg overflow-hidden">
        

     

{/* Content */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center md:justify-items-start">
          {/* Brand Section */}
          <div className="space-y-4 max-w-xs text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              
              <div className="flex items-center space-x-2">
              <img src="/care.png" alt="CareEase" className="object-contain h-24 w-fit" />
              <h2 className="text-primary-blue text-3xl font-bold">CarEEase</h2>
              </div>
                
            </div>
            <p className="text-sm text-blue-800/90">
            Empowering families with trusted, compassionate, and professional home care services.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
             
              <Link href="#" className="p-2 rounded-full bg-primary-blue hover:bg-blue-500 transition-colors text-white">
                <FaFacebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-primary-blue hover:bg-blue-500 transition-colors text-white">
                <FaTwitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-primary-blue hover:bg-blue-500 transition-colors text-white">
                <FaInstagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-primary-blue hover:bg-blue-500 transition-colors text-white">
                <FaLinkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full text-center md:text-left">
            <h3 className="text-blue-800/90 text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Our Blog & News', 'Our Team'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-black transition-colors inline-flex items-center space-x-2 group">
                    <span className="text-blue-400 group-hover:translate-x-1 transition-transform">›</span>
                    <span className="text-blue-800/90">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="w-full text-center md:text-left">
            <h3 className="text-blue-800/90 text-xl font-semibold mb-6">CareEase Services</h3>
            <ul className="space-y-3">
              {['All Services', 'Physiotherapy', 'Diagnostics', 'Manual Therapy', 'Massage Therapy', 'Rehabilitation'].map((service) => (
                <li key={service}>
                  <Link href="#" className="hover:text-black transition-colors inline-flex items-center space-x-2 group">
                    <span className="text-blue-400 group-hover:translate-x-1 transition-transform">›</span>
                    <span className="text-blue-800/90">{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full text-center md:text-left">
            <h3 className="text-blue-800/90 text-xl font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 justify-center md:justify-start">
                <span className="mt-1 text-blue-400">📍</span>
                <span className="text-blue-800/90">123 Street, Delhi, India</span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <span className="text-blue-400">✉</span>
                <span className="text-blue-800/90">info@example.com</span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <span className="text-blue-400">✉</span>
                <span className="text-blue-800/90">info@example.com</span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <span className="text-blue-400">📞</span>
                <span className="text-blue-800/90">+012 345 67890</span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <span className="text-blue-400">📠</span>
                <span className="text-blue-800/90">+012 345 67890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 text-center text-sm white">
        <hr className="border-blue-800/90 mb-10"/>
          <p className="text-blue-800/90">&copy; {new Date().getFullYear()} CareEase. All rights reserved.</p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;