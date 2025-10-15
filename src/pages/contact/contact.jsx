import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message. We will get back to you soon!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-premium-cream">
      {/* Luxury Hero Section */}
      <section className="relative py-8 bg-gradient-to-br from-premium-beige via-premium-cream to-premium-warm-white overflow-hidden">
        {/* Luxury background pattern */}
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
            We'd love to hear from you. Get in touch with our luxury team.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information - Luxury Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Details */}
            <div className="bg-white p-6 shadow-xl border border-text-light/10 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 border-2 border-luxury-gold rounded-full flex items-center justify-center flex-shrink-0 bg-luxury-gold/10">
                    <svg className="w-4 h-4 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black uppercase tracking-wide mb-1">
                      Email
                    </h3>
                    <p className="text-text-dark text-sm">hello@yobha.com</p>
                    <p className="text-text-dark text-sm">support@yobha.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 border-2 border-luxury-gold rounded-full flex items-center justify-center flex-shrink-0 bg-luxury-gold/10">
                    <svg className="w-4 h-4 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black uppercase tracking-wide mb-1">
                      Phone
                    </h3>
                    <p className="text-text-dark text-sm">+1 (555) 123-4567</p>
                    <p className="text-text-dark text-sm">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 border-2 border-luxury-gold rounded-full flex items-center justify-center flex-shrink-0 bg-luxury-gold/10">
                    <svg className="w-4 h-4 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black uppercase tracking-wide mb-1">
                      Address
                    </h3>
                    <p className="text-text-dark text-sm">
                      123 Luxury Avenue<br />
                      Fashion District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-premium-beige p-6 border border-text-light/10 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-4">
                Business Hours
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-text-light/20">
                  <span className="text-text-dark font-medium text-sm">Monday - Friday</span>
                  <span className="text-text-dark text-sm">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-text-light/20">
                  <span className="text-text-dark font-medium text-sm">Saturday</span>
                  <span className="text-text-dark text-sm">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-text-dark font-medium text-sm">Sunday</span>
                  <span className="text-text-dark text-sm">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Extended Height */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-xl border border-text-light/10 relative h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <h2 className="text-2xl font-bold text-black uppercase tracking-wide mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-text-dark font-semibold mb-3 uppercase tracking-widest text-sm">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-text-light/20 focus:border-luxury-gold focus:outline-none transition-all duration-300 bg-premium-cream/50 text-base font-light placeholder-text-light/60 rounded-none"
                        placeholder="Enter your full name"
                      />
                      <div className="absolute inset-0 border border-luxury-gold/20 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-text-dark font-semibold mb-3 uppercase tracking-widest text-sm">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-text-light/20 focus:border-luxury-gold focus:outline-none transition-all duration-300 bg-premium-cream/50 text-base font-light placeholder-text-light/60 rounded-none"
                        placeholder="your.email@example.com"
                      />
                      <div className="absolute inset-0 border border-luxury-gold/20 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-text-dark font-semibold mb-3 uppercase tracking-widest text-sm">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-text-light/20 focus:border-luxury-gold focus:outline-none transition-all duration-300 bg-premium-cream/50 text-base font-light placeholder-text-light/60 rounded-none"
                      placeholder="What is this regarding?"
                    />
                    <div className="absolute inset-0 border border-luxury-gold/20 pointer-events-none"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-text-dark font-semibold mb-3 uppercase tracking-widest text-sm">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-text-light/20 focus:border-luxury-gold focus:outline-none transition-all duration-300 bg-premium-cream/50 resize-none text-base font-light placeholder-text-light/60 rounded-none"
                      placeholder="Please share your thoughts and inquiries..."
                    />
                    <div className="absolute inset-0 border border-luxury-gold/20 pointer-events-none"></div>
                  </div>
                </div>

                {/* Luxury Send Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-black to-text-dark text-white font-semibold text-lg uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-black hover:border-luxury-gold shadow-lg hover:shadow-2xl relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Luxury Design */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black uppercase tracking-wide mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="border-l-4 border-luxury-gold pl-6">
                <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                  What is your return policy?
                </h3>
                <p className="text-text-dark text-base leading-relaxed font-light">
                  We offer a 30-day return policy for all unworn items with original tags. Returns are free and easy.
                </p>
              </div>

              <div className="border-l-4 border-luxury-gold pl-6">
                <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                  How long does shipping take?
                </h3>
                <p className="text-text-dark text-base leading-relaxed font-light">
                  Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-l-4 border-luxury-gold pl-6">
                <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                  Do you ship internationally?
                </h3>
                <p className="text-text-dark text-base leading-relaxed font-light">
                  Yes, we ship to over 50 countries worldwide. International shipping takes 7-14 business days.
                </p>
              </div>

              <div className="border-l-4 border-luxury-gold pl-6">
                <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                  What materials do you use?
                </h3>
                <p className="text-text-dark text-base leading-relaxed font-light">
                  We use only the finest materials including organic cotton, silk, and premium modal for ultimate comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
