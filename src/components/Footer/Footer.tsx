import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FOOTER_DATA } from '@/constants/footer';
import { Mail, Phone, MessageCircle, ChevronUp } from 'lucide-react';




// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const linkHover = {
  rest: { x: 0 },
  hover: { x: 4 },
};

const iconHover = {
  rest: { scale: 1 },
  hover: { scale: 1.15, rotate: 5 },
};

// Components
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm block py-1.5"
    variants={linkHover}
    initial="rest"
    whileHover="hover"
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.a>
);

const FooterSection: React.FC<{ title: string; children: React.ReactNode; delay?: number }> = ({
  title,
  children,
  delay = 0,
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: delay * 0.1, duration: 0.6 }}
    variants={fadeInUp}
  >
    <h3 className="text-gray-900 font-semibold text-sm mb-4 tracking-wide">{title}</h3>
    {children}
  </motion.div>
);

const SocialLinks: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex gap-4 mb-4">
      {FOOTER_DATA.social.platforms.map((platform, index) => (
        <motion.a
          key={platform.label}
          href={platform.href}
          aria-label={platform.label}
          className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          initial="rest"
          whileHover="hover"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            variants={iconHover}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <platform.icon size={22} />
          </motion.div>
        </motion.a>
      ))}
    </div>
  );
};

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setEmail('');
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.6 }}
      variants={fadeInUp}
    >
      <h3 className="text-gray-900 font-semibold text-sm mb-3 tracking-wide">
        {FOOTER_DATA.newsletter.title}
      </h3>
      <p className="text-gray-600 text-xs mb-4 leading-relaxed">
        {FOOTER_DATA.newsletter.description}
      </p>
      <div className="flex gap-0">
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Email"
          className="flex-1 px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-all duration-300 text-sm"
          animate={{
            borderColor: isFocused ? '#111827' : '#d1d5db',
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting || !email}
          className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-all duration-300 font-semibold text-sm uppercase tracking-wider disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {isSubmitting ? '...' : 'Sign Up'}
        </motion.button>
      </div>
    </motion.div>
  );
};

const ContactInfo: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6 }}
      variants={fadeInUp}
    >
      <h3 className="text-gray-900 font-semibold text-sm mb-4 tracking-wide">CONTACT US</h3>
      
      <motion.a
        href={`mailto:${FOOTER_DATA.contact.email}`}
        className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        onMouseEnter={() => setHoveredItem('email')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <motion.div
          animate={{ scale: hoveredItem === 'email' ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Mail size={18} />
        </motion.div>
        <span className="text-sm">{FOOTER_DATA.contact.email}</span>
      </motion.a>

      <div className="flex items-start gap-3 text-gray-600">
        <Phone size={18} className="mt-0.5" />
        <div className="text-sm">
          <div className="font-medium text-gray-900">{FOOTER_DATA.contact.phone}</div>
          <div className="text-xs text-gray-500 mt-1">{FOOTER_DATA.contact.hours}</div>
        </div>
      </div>

      <motion.a
        href="#chat"
        className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        onMouseEnter={() => setHoveredItem('chat')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <motion.div
          animate={{ scale: hoveredItem === 'chat' ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle size={18} />
        </motion.div>
        <span className="text-sm">Live Chat Assistance</span>
      </motion.a>
    </motion.div>
  );
};

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-gray-900 text-white p-3 rounded-full shadow-lg z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, backgroundColor: '#374151' }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </motion.button>
  );
};

// Main Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Customer Service */}
          <div className="lg:col-span-2">
            <FooterSection title={FOOTER_DATA.customerService.title} delay={0}>
              <nav className="space-y-0">
                {FOOTER_DATA.customerService.links.map((link) => (
                  <FooterLink key={link.text} href={link.href}>
                    {link.text}
                  </FooterLink>
                ))}
              </nav>
            </FooterSection>
          </div>

          {/* My Account */}
          <div className="lg:col-span-2">
            <FooterSection title={FOOTER_DATA.myAccount.title} delay={1}>
              <nav className="space-y-0">
                {FOOTER_DATA.myAccount.links.map((link) => (
                  <FooterLink key={link.text} href={link.href}>
                    {link.text}
                  </FooterLink>
                ))}
              </nav>
            </FooterSection>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <FooterSection title={FOOTER_DATA.company.title} delay={2}>
              <nav className="space-y-0">
                {FOOTER_DATA.company.links.map((link) => (
                  <FooterLink key={link.text} href={link.href}>
                    {link.text}
                  </FooterLink>
                ))}
              </nav>
            </FooterSection>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-6 space-y-8">
            <Newsletter />
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              variants={fadeInUp}
            >
              <FooterSection title={FOOTER_DATA.social.title} delay={3}>
                <SocialLinks />
                <p className="text-gray-600 text-xs">
                  Share your style with{' '}
                  <span className="font-medium">{FOOTER_DATA.social.handle}</span>
                  <br />
                  <span className="font-medium">{FOOTER_DATA.social.hashtag}</span>
                </p>
              </FooterSection>
            </motion.div>

            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            className="text-center space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <motion.h2
              className="text-2xl font-light tracking-[0.3em] text-gray-900"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {FOOTER_DATA.legal.companyName}
            </motion.h2>
            <p className="text-gray-600 text-xs">
              Copyright © {FOOTER_DATA.legal.copyright} By {FOOTER_DATA.legal.companyName}.
            </p>
            <p className="text-gray-500 text-xs">{FOOTER_DATA.legal.rating}</p>
            
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-4">
              {FOOTER_DATA.legal.links.map((link, index) => (
                <React.Fragment key={link.text}>
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-xs transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -2 }}
                  >
                    {link.text}
                  </motion.a>
                  {index < FOOTER_DATA.legal.links.length - 1 && (
                    <span className="text-gray-300">|</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </motion.div>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
};

export default Footer;