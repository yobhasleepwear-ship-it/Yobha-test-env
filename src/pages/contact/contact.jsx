import React from "react";

const Contact = () => {
  const whatsappNumber = "+916200830664";
  const whatsappText = "Hello, I’d like to get in touch regarding your products.";
  
  const handleWhatsAppRedirect = () => {
    const url = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-premium-cream">
      {/* Hero Section */}
      <section className="relative py-8 bg-gradient-to-br from-premium-beige via-premium-cream to-premium-warm-white overflow-hidden">
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
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 shadow-xl border border-text-light/10 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <h2 className="text-xl font-bold text-black uppercase tracking-wide mb-6">
                Get in Touch
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 border-2 border-luxury-gold rounded-full flex items-center justify-center bg-luxury-gold/10">
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

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 border-2 border-luxury-gold rounded-full flex items-center justify-center bg-luxury-gold/10">
                    <svg className="w-4 h-4 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black uppercase tracking-wide mb-1">
                      Phone
                    </h3>
                    <p className="text-text-dark text-sm">+91 6200830664</p>
                    <p className="text-text-dark text-sm">Mon-Fri 9AM-6PM IST</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 border-2 border-luxury-gold rounded-full flex items-center justify-center bg-luxury-gold/10">
                    <svg className="w-4 h-4 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
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
                <div className="flex justify-between border-b border-text-light/20 py-1">
                  <span className="text-text-dark text-sm font-medium">Monday - Friday</span>
                  <span className="text-text-dark text-sm">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-text-light/20 py-1">
                  <span className="text-text-dark text-sm font-medium">Saturday</span>
                  <span className="text-text-dark text-sm">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-text-dark text-sm font-medium">Sunday</span>
                  <span className="text-text-dark text-sm">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Redirect Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 shadow-xl border border-text-light/10 relative h-full flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <h2 className="text-3xl font-bold text-black uppercase tracking-wide mb-4">
                Chat With Us on WhatsApp
              </h2>
              <p className="text-text-dark text-base max-w-lg mb-8 leading-relaxed">
                Have a question or need quick assistance? Our support team is available on WhatsApp to help you with your orders, product details, or any luxury inquiries.
              </p>

              <button
                onClick={handleWhatsAppRedirect}
                className="px-10 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-lg uppercase tracking-widest rounded-none hover:from-green-700 hover:to-green-600 transition-all duration-500 transform hover:scale-105 shadow-xl flex items-center space-x-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.7 14.1c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 .9s-.5 0-.8-.3c-.4-.2-1.4-.6-2.7-1.9-1-1-1.7-2.1-1.9-2.4-.2-.3 0-.5.2-.7.2-.2.3-.5.4-.6.1-.1.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.3 2.1 3.2 5.1 4.5.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.2-.3-.2-.6-.3z" />
                </svg>
                <span>Message on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
