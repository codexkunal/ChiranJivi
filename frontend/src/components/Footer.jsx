import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="relative z-20 bg-[#F1F5F9] border-t border-purple-500/20 rounded-xl">
    <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-800">ChiranJivi</h3>
                <p className="text-black">
                Our healthcare website connects you with qualified doctors for virtual consultations. You can easily schedule appointments, get personalized health advice, and access medical resources from the comfort of your home, all through a secure and user-friendly platform.
                </p>
                <div className="flex space-x-4">
                    <a href="https://github.com/soulastro" target="_blank" rel="noopener noreferrer" 
                       className="text-black hover:text-blue-800 transition-colors">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com/company/soulastro" target="_blank" rel="noopener noreferrer"
                       className="text-black hover:text-blue-800 transition-colors">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com/soulastro" target="_blank" rel="noopener noreferrer"
                       className="text-black hover:text-blue-800 transition-colors">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="https://instagram.com/soulastro" target="_blank" rel="noopener noreferrer"
                       className="text-black hover:text-blue-800 transition-colors">
                        <Instagram className="w-6 h-6" />
                    </a>
                    <a href="https://facebook.com/soulastro" target="_blank" rel="noopener noreferrer"
                       className="text-black hover:text-blue-800 transition-colors">
                        <Facebook className="w-6 h-6" />
                    </a>
                </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6 ">
                <h3 className="text-xl font-semibold text-blue-800 ">Quick Links</h3>
                <ul className="space-y-3 ">
                    <li>
                        <a href="#services" className="text-black hover:text-blue-800 transition-colors">Services</a>
                    </li>
                    <li>
                        <a href="#about" className="text-black hover:text-blue-800 transition-colors">About Us</a>
                    </li>
                    <li>
                        <a href="#testimonials" className="text-black hover:text-blue-800 transition-colors">Testimonials</a>
                    </li>
                    <li>
                        <a href="/blog" className="text-black hover:text-blue-800 transition-colors">Blog</a>
                    </li>
                    <li>
                        <a href="/careers" className="text-black hover:text-blue-800 transition-colors">Careers</a>
                    </li>
                </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-blue-800">Contact Us</h3>
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-blue-800 flex-shrink-0 mt-1" />
                        <p className="text-black">
                            5th floor, Arybhatta Hall<br />
                            E-Block<br />
                            Silver Oak University<br />
                            Gota, Ahmedabad 400001<br />
                            Gujarat, India
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-800" />
                        <p className="text-black">+91 (123) 456-7890</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-700" />
                        <a href="mailto:contact@soulastro.com" className="text-black hover:text-blue-800 transition-colors">
                            contact@chiranjivi.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-blue-800">Newsletter</h3>
                <p className="text-black">Subscribe to receive celestial updates and spiritual insights.</p>
                <form className="space-y-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 bg-[#2a2a6a]/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-yellow-300 text-black placeholder-black"
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-gradient-to-r bg-[#ad60fa] rounded-lg text-white font-semibold hover:from-purple-700 transition-all"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-500/20 text-center">
            <p className="text-slate-700">
                © {new Date().getFullYear()} Chiranjivi. All rights reserved. |{' '}
                <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a> |{' '}
                <a href="/terms" className="hover:text-black transition-colors">Terms of Service</a>
            </p>
        </div>
    </div>
</footer>
    </div>
  )
}

export default Footer