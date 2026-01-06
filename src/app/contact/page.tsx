"use client";
import React, { useState, useRef } from "react";
import { Mail, MapPin, Send, Instagram, Linkedin } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaperPlane, setShowPaperPlane] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // EmailJS configuration - Updated with your actual credentials
      const result = await emailjs.sendForm(
        'service_zj705eu',     // Your EmailJS service ID
        'template_smmz7mq',    // Your EmailJS template ID
        formRef.current!,
        'eyFPylX4PhxdF895E'    // Your EmailJS public key
      );

      console.log('Email sent successfully:', result.text);
      
      setIsSubmitting(false);
      setShowPaperPlane(true);
      setSubmitStatus('success');
      
      // Show paper plane animation, then success message
      setTimeout(() => {
        setShowPaperPlane(false);
        setIsSubmitted(true);
      }, 3000);
      
      // Reset the form after 8 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitStatus(null);
        formRef.current?.reset();
      }, 8000);

    } catch (error) {
      console.error('Email send failed:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  // Particle explosion effect
  const createParticles = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isSubmitting || isSubmitted) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.left + rect.width / 2 - 3}px;
        top: ${rect.top + rect.height / 2 - 3}px;
      `;
      
      document.body.appendChild(particle);
      
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 100 + Math.random() * 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      particle.animate([
        { 
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        },
        { 
          transform: `translate(${vx}px, ${vy}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).addEventListener('finish', () => {
        document.body.removeChild(particle);
      });
    }
  };
  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-32 min-h-screen bg-black text-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Get in Touch</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-shadow-grey border border-shadow-grey-2 rounded-xl md:rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Contact Information</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-shadow-grey-2 rounded-lg border border-graphite flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white text-sm md:text-base">Email</p>
                    <button 
                      type="button"
                      onClick={() => {
                        window.open("mailto:maharaharshit31@gmail.com", "_self");
                      }}
                      className="text-dim-grey hover:text-white transition-colors text-sm md:text-base break-all bg-transparent border-none p-0 cursor-pointer text-left"
                    >
                      maharaharshit31@gmail.com
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-shadow-grey-2 rounded-lg border border-graphite flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white text-sm md:text-base">Location</p>
                    <p className="text-dim-grey text-sm md:text-base">New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-shadow-grey border border-shadow-grey-2 rounded-xl md:rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Socials</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-shadow-grey-2 rounded-lg border border-graphite flex-shrink-0">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white text-sm md:text-base">Instagram</p>
                    <a href="https://www.instagram.com/harshit_mahara_31/" target="_blank" rel="noopener noreferrer" className="text-dim-grey hover:text-white transition-colors text-sm md:text-base break-all">@harshit_mahara_31</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-shadow-grey-2 rounded-lg border border-graphite flex-shrink-0">
                    <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white text-sm md:text-base">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/harshit-singh-mahara/" target="_blank" rel="noopener noreferrer" className="text-dim-grey hover:text-white transition-colors text-sm md:text-base break-all">linkedin.com/in/harshit-singh-mahara</a>
                  </div>
                </div>
               </div>
            </div>
            
            <div className="bg-shadow-grey border border-shadow-grey-2 rounded-xl md:rounded-2xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Let&apos;s Connect</h3>
              <p className="text-dim-grey mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                I&apos;m always up for a chat whether it&apos;s sharing ideas, exploring new projects or just talking tech and creativity. If you have something interesting in mind, I&apos;d love to hear about it.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="bg-shadow-grey border border-shadow-grey-2 rounded-xl md:rounded-2xl p-6 md:p-8 space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-white">Send Me A Message</h3>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label htmlFor="user_name" className="text-xs md:text-sm font-medium text-white block">Name*</label>
                <input 
                  type="text" 
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full bg-black border border-graphite rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-white focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                  placeholder="What should I call you?"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="user_email" className="text-xs md:text-sm font-medium text-white block">Email*</label>
                <input 
                  type="email" 
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full bg-black border border-graphite rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-white focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                  placeholder="Where can I reach you?"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs md:text-sm font-medium text-white block">Subject*</label>
              <input 
                type="text" 
                id="subject"
                name="subject"
                required
                className="w-full bg-black border border-graphite rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-white focus:outline-none focus:border-white transition-colors text-sm md:text-base"
                placeholder="What&apos;s this about?"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs md:text-sm font-medium text-white block">Message*</label>
              <textarea 
                id="message"
                name="message"
                rows={5}
                required
                className="w-full bg-black border border-graphite rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-white focus:outline-none focus:border-white transition-colors resize-none text-sm md:text-base leading-relaxed"
                placeholder="Tell me about your project or idea…"
              ></textarea>
            </div>
            
            <button 
              ref={buttonRef}
              type="submit" 
              disabled={isSubmitting || isSubmitted}
              onClick={createParticles}
              className={`
                w-full font-semibold py-3 md:py-4 rounded-lg transition-all duration-200 
                flex items-center justify-center gap-2 text-sm md:text-base
                transform active:scale-95 relative overflow-hidden group
                ${isSubmitting 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : submitStatus === 'error'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                  : isSubmitted 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                  : 'bg-white text-black hover:bg-gray-100 hover:shadow-xl hover:shadow-white/10 border border-transparent hover:border-gray-300'
                }
                ${isSubmitting ? 'animate-pulse' : ''}
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : submitStatus === 'error' ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Failed to Send
                </>
              ) : isSubmitted ? (
                <>
                  <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Message Sent!
                </>
              ) : (
                <>
                  Send Message 
                  <Send className="w-4 h-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>

            {/* Error message */}
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg animate-[slideUp_0.5s_ease-out_forwards] opacity-0">
                <p className="text-red-200 text-center text-sm md:text-base">
                  ✗ Failed to send message. Please try again or contact me directly at maharaharshit31@gmail.com
                </p>
              </div>
            )}

            {/* Floating Geometric Animation - Expanded */}
            <div className="relative h-32 overflow-hidden mt-6">
              {/* Primary Central glowing orb */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-60 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-30"></div>
              </div>

              {/* Secondary glowing orb */}
              <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full animate-pulse opacity-50 shadow-lg shadow-teal-500/40"
                     style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
                <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full animate-ping opacity-20"
                     style={{ animationDelay: '1.5s' }}></div>
              </div>

              {/* Third glowing orb */}
              <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-pulse opacity-55 shadow-lg shadow-pink-500/45"
                     style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
                <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-ping opacity-25"
                     style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Primary Orbiting elements */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 animate-spin" style={{ animationDuration: '8s' }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-teal-400 rounded-full transform -translate-x-1/2 opacity-70"></div>
                  <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full transform -translate-x-1/2 opacity-70"></div>
                  <div className="absolute left-0 top-1/2 w-1 h-1 bg-yellow-400 rounded-full transform -translate-y-1/2 opacity-70"></div>
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-y-1/2 opacity-70"></div>
                </div>
              </div>

              {/* Secondary Orbiting elements (reverse direction) */}
              <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>
                  <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full transform -translate-x-1/2 opacity-60"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-orange-400 rounded-full transform -translate-x-1/2 opacity-60"></div>
                  <div className="absolute left-0 top-1/2 w-2 h-2 bg-indigo-400 rounded-full transform -translate-y-1/2 opacity-60"></div>
                  <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full transform -translate-y-1/2 opacity-60"></div>
                </div>
              </div>

              {/* Third Orbiting elements */}
              <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 animate-spin" style={{ animationDuration: '12s' }}>
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-rose-400 rounded-full transform -translate-x-1/2 opacity-65"></div>
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-violet-400 rounded-full transform -translate-x-1/2 opacity-65"></div>
                  <div className="absolute left-0 top-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full transform -translate-y-1/2 opacity-65"></div>
                  <div className="absolute right-0 top-1/2 w-1 h-1 bg-lime-400 rounded-full transform -translate-y-1/2 opacity-65"></div>
                </div>
              </div>

              {/* Extended Floating particles */}
              {/* Top area particles */}
              <div className="absolute top-2 left-1/6 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '0s', animationDuration: '2s' }} />
              <div className="absolute top-3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '0.3s', animationDuration: '2.8s' }} />
              <div className="absolute top-1 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '0.6s', animationDuration: '2.3s' }} />
              <div className="absolute top-4 right-1/6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '0.9s', animationDuration: '3.1s' }} />

              {/* Middle area particles */}
              <div className="absolute top-1/2 left-1/8 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '1.2s', animationDuration: '2.6s' }} />
              <div className="absolute top-1/2 right-1/8 w-1 h-1 bg-orange-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '1.5s', animationDuration: '2.9s' }} />
              <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '1.8s', animationDuration: '2.4s' }} />

              {/* Bottom area particles */}
              <div className="absolute bottom-3 left-1/5 w-1 h-1 bg-indigo-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '2.1s', animationDuration: '2.7s' }} />
              <div className="absolute bottom-2 right-1/3 w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '2.4s', animationDuration: '3.2s' }} />
              <div className="absolute bottom-4 right-1/5 w-1 h-1 bg-violet-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '2.7s', animationDuration: '2.5s' }} />
              <div className="absolute bottom-1 left-2/3 w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce opacity-60"
                   style={{ animationDelay: '3s', animationDuration: '2.8s' }} />

              {/* Extended Connecting lines */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-pulse opacity-40"></div>
                <div className="w-px h-24 bg-gradient-to-b from-transparent via-gray-600 to-transparent animate-pulse opacity-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              {/* Diagonal connecting lines */}
              <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-600/50 to-transparent animate-pulse opacity-30 transform rotate-45"></div>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-600/50 to-transparent animate-pulse opacity-30 transform -rotate-45"></div>
              </div>

              <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-pink-600/50 to-transparent animate-pulse opacity-30 transform rotate-45"
                     style={{ animationDelay: '0.5s' }}></div>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-pink-600/50 to-transparent animate-pulse opacity-30 transform -rotate-45"
                     style={{ animationDelay: '0.8s' }}></div>
              </div>

              {/* Extended grid pattern */}
              <div className="absolute inset-0 opacity-8">
                <div className="grid grid-cols-12 grid-rows-8 h-full gap-px">
                  {[...Array(96)].map((_, i) => (
                    <div key={i} className="border border-gray-700 animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
                  ))}
                </div>
              </div>

              {/* Floating geometric shapes */}
              <div className="absolute top-1/6 left-1/12 w-3 h-3 border border-blue-400/20 transform rotate-45 animate-spin opacity-40"
                   style={{ animationDuration: '6s' }}></div>
              <div className="absolute bottom-1/6 right-1/12 w-4 h-4 border border-purple-400/20 transform rotate-45 animate-spin opacity-40"
                   style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
              <div className="absolute top-2/3 left-5/6 w-2 h-2 border border-teal-400/20 rounded-full animate-pulse opacity-40"
                   style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Paper Plane Animation */}
            {showPaperPlane && (
              <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                <div className="paper-plane absolute left-0 top-1/2 transform -translate-y-1/2">
                  <svg 
                    className="w-8 h-8 text-blue-400 animate-[fly_3s_ease-in-out_forwards]" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                  {/* Dotted trail */}
                  <div className="absolute top-1/2 left-0 w-screen h-0.5 transform -translate-y-1/2">
                    <div className="h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-[trail_3s_ease-in-out_forwards] opacity-60"></div>
                  </div>
                </div>
              </div>
            )}

            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-900/50 border border-green-700 rounded-lg animate-[slideUp_0.5s_ease-out_forwards] opacity-0">
                <p className="text-green-200 text-center text-sm md:text-base">
                  ✓ Thank you for your message! I&apos;ll reach back to you soon.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
