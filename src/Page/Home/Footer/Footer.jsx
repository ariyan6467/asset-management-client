import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Dribbble } from 'lucide-react'; // Icons for contact and social media
import NavbarLogo from '../Navbar/NavbarLogo';

// --- Footer Link Group Component ---
const LinkGroup = ({ title, links }) => (
  <div className="flex flex-col space-y-3">
    <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Footer Component ---
const FooterSection = () => {
  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'support@assetverse.com', type: 'email' },
    { icon: Phone, label: '+1 (234) 567-890', type: 'phone' },
    { icon: MapPin, label: '123 Business Ave, Suite 100 San Francisco, CA 94102', type: 'address' },
  ];

  return (
    <footer className="bg-[#111827] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Logo, Tagline, and Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
          
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Placeholder for the Logo/Icon - Assuming a teal/blue theme */}
              <NavbarLogo></NavbarLogo>
            </div>
            <p className="text-blue-300 text-sm max-w-xs">
              Streamline your corporate asset management with our comprehensive platform. Track, manage, and optimize your company assets efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <LinkGroup title="Quick Links" links={quickLinks} />

          {/* Legal Links */}
          <LinkGroup title="Legal" links={legalLinks} />

          {/* Contact Us */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-lg font-semibold text-white mb-2">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0 text-teal-400" />
                  <span className="text-blue-300 text-sm">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8">
          
          {/* Copyright */}
          <p className="text-blue-300 text-sm mb-4 md:mb-0">
            © 2025 AssetVerse. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-3">
            {[Linkedin, Twitter, Facebook, Dribbble].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label={Icon.name}
                className="p-2 rounded-full bg-gray-800 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;