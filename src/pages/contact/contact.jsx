import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Contact = () => {
  const whatsappNumber = "+916200830664";
  const whatsappText = "Hello, I'd like to get in touch regarding your products.";
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  const handleWhatsAppRedirect = () => {
    const url = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, "_blank");
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };


  const faqData = [
    {
      question: "What does YOBHA stand for?",
      answer: "YOBHA is a sanctuary of stillness — where modern comfort meets timeless craftsmanship. Born from a desire to reimagine the essence of home, YOBHA creates loungewear, homewear, and sleepwear that transcend generations."
    },
    {
      question: "What makes YOBHA different from other brands?",
      answer: "Every YOBHA creation is a dialogue between comfort and art. We embody quiet luxury — crafted not to impress but to express presence, grace, and ease across our collections for men, women, children, and pets."
    },
    {
      question: "Do you offer matching sets for families?",
      answer: "Yes. YOBHA celebrates togetherness through matching sets for couples, children, and even pets — designed to reflect harmony, comfort, and timeless connection."
    },
    {
      question: "Where are YOBHA pieces made?",
      answer: "Crafted in select ateliers that embody excellence and integrity, each piece is handled by artisans who master the poetry of precision — made with devotion and calm."
    },
    {
      question: "What materials do you use?",
      answer: "We use premium, sustainable fabrics such as organic cotton, bamboo blends, and plant-based silks — ensuring softness, breathability, and harmony with nature."
    },
    {
      question: "Is YOBHA a seasonal brand?",
      answer: "Our creations are timeless, not seasonal. YOBHA believes in slow creation and the beauty of continuity — fashion that transcends trends and time."
    },
    {
      question: "Do you offer worldwide shipping?",
      answer: "Yes. We ship globally with utmost care, each order wrapped with intention and delivered with the serenity that defines YOBHA."
    },
    {
      question: "What is your return and exchange policy?",
      answer: "Our Client Care Team ensures every return or exchange is handled with discretion and grace, provided the item is in its original condition and packaging."
    },
    {
      question: "Does YOBHA offer a restoration or buyback program?",
      answer: "Yes. Select collections qualify for restoration or buyback — reflecting our commitment to conscious luxury and circular craftsmanship."
    },
    {
      question: "How do I care for my YOBHA pieces?",
      answer: "Gentle washing, air drying, and mindful storage preserve each piece's softness and balance. Every item includes care guidance for longevity."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-cream">
      {/* Hero Section */}
      <section className="relative py-2 bg-gradient-to-br from-premium-beige via-premium-cream to-premium-warm-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border border-luxury-gold/30 rotate-45"></div>
          <div className="absolute top-20 right-16 w-16 h-16 border border-luxury-gold/30 rotate-12"></div>
          <div className="absolute bottom-16 left-16 w-18 h-18 border border-luxury-gold/30 -rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-14 h-14 border border-luxury-gold/30 rotate-45"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-black uppercase tracking-widest mb-4">
            Contact Us
          </h1>
          <p className="text-text-medium text-xl font-light tracking-wide max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our luxury team directly on WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="bg-white p-6 sm:p-12 shadow-xl border border-text-light/10 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
          
          {isSubmitted ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide mb-4 sm:mb-6">
                Message Sent Successfully!
              </h2>
              <p className="text-text-dark text-base sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto px-4">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-black text-white py-3 sm:py-4 px-6 sm:px-8 font-semibold uppercase tracking-wider hover:bg-text-dark transition-colors text-sm sm:text-base"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-widest mb-3 sm:mb-4">
                  Send Us a Message
                </h2>
                <p className="text-text-dark text-base sm:text-lg leading-relaxed max-w-2xl">
                  Have a question or need assistance? Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-black uppercase tracking-wide mb-2 sm:mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 sm:py-4 border-2 focus:outline-none text-sm sm:text-base transition-colors ${
                        formErrors.name 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:border-luxury-gold hover:border-gray-400'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && <p className="text-xs sm:text-sm text-red-500 mt-1 sm:mt-2">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black uppercase tracking-wide mb-2 sm:mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 sm:py-4 border-2 focus:outline-none text-sm sm:text-base transition-colors ${
                        formErrors.email 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:border-luxury-gold hover:border-gray-400'
                      }`}
                      placeholder="Enter your email"
                    />
                    {formErrors.email && <p className="text-xs sm:text-sm text-red-500 mt-1 sm:mt-2">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-black uppercase tracking-wide mb-2 sm:mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 border-2 border-gray-300 focus:border-luxury-gold hover:border-gray-400 focus:outline-none text-sm sm:text-base transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black uppercase tracking-wide mb-2 sm:mb-3">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 sm:py-4 border-2 focus:outline-none text-sm sm:text-base transition-colors ${
                        formErrors.subject 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:border-luxury-gold hover:border-gray-400'
                      }`}
                      placeholder="What is this about?"
                    />
                    {formErrors.subject && <p className="text-xs sm:text-sm text-red-500 mt-1 sm:mt-2">{formErrors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black uppercase tracking-wide mb-2 sm:mb-3">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 sm:py-4 border-2 focus:outline-none text-sm sm:text-base transition-colors resize-none ${
                      formErrors.message 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 focus:border-luxury-gold hover:border-gray-400'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {formErrors.message && <p className="text-xs sm:text-sm text-red-500 mt-1 sm:mt-2">{formErrors.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-white py-3 sm:py-4 px-6 sm:px-8 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-sm sm:text-base flex items-center justify-center gap-3 disabled:bg-text-light disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="flex-1 bg-black text-white font-semibold uppercase tracking-wider hover:bg-text-dark transition-colors flex items-center justify-center gap-3 text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-12 sm:py-20 font-['Helvetica Neue','Helvetica',sans-serif]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black uppercase tracking-widest mb-4 sm:mb-5">
              Frequently Asked Questions
            </h2>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-luxury-gold to-[#e4c988] mx-auto rounded-full"></div>
            <p className="mt-3 sm:mt-4 text-text-dark text-xs sm:text-sm tracking-wide uppercase">
              Calm • Connection • Conscious Living
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 sm:space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white border shadow-sm transition-all duration-300 ${
                  expandedFaq === index 
                    ? 'border-luxury-gold shadow-lg' 
                    : 'border-text-light/10 hover:border-luxury-gold/30'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 text-left flex items-center justify-between transition-all duration-300 ${
                    expandedFaq === index 
                      ? 'bg-luxury-gold/5' 
                      : 'hover:bg-premium-beige/20'
                  }`}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black uppercase tracking-wide pr-3 sm:pr-4 md:pr-6 leading-tight">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold transition-transform duration-300" strokeWidth={1.5} />
                    ) : (
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold transition-transform duration-300" strokeWidth={1.5} />
                    )}
                  </div>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 border-t border-luxury-gold/20 bg-luxury-gold/5">
                    <p className="text-text-dark leading-relaxed pt-4 sm:pt-6 text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
