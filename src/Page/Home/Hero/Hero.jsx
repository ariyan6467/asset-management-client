import React from 'react';
import AssetOverview from './AssetOverview';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-hero-crosses min-h-[600px]">
            {/* Background Overlay for subtle depth if needed */}
            <div className="absolute inset-0 "></div>

            {/* Decorative large shapes/blobs from image (faint) */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-2xl rotate-12 blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"></div>

            <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">

                    {/* Left Content: Value Proposition */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        {/* Trusted By Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 w-fit"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2"></span>
                            <p className="text-xs md:text-sm text-white/90 font-medium tracking-wide">
                                Trusted by 500+ companies worldwide
                            </p>
                        </motion.div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.1] tracking-tight">
                            Streamline Your <br />
                            <span className="text-teal-400">
                                Corporate Asset
                            </span> <br />
                            Management
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-xl text-blue-100/90 max-w-lg leading-relaxed font-light">
                            The all-in-one platform to track, manage, and optimize your company assets. Empower your HR team with powerful tools for seamless asset distribution.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-teal-400 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg hover:bg-teal-300 transition-colors duration-300 flex items-center justify-center"
                            >
                                Get Started Free
                                {/* Arrow Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#1E5AB8] border border-white/20 text-white font-medium py-3.5 px-8 rounded-lg hover:bg-[#2665C7] transition-colors duration-300"
                            >
                                Learn More
                            </motion.button>
                        </div>

                        {/* Feature List */}
                        <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 text-blue-100/80 text-sm font-medium">
                            {['Real-time asset tracking', 'Automated workflows', 'Secure & compliant'].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className="rounded-full border border-teal-400/50 p-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content: Dashboard Mockup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="relative"
                    >
                        <AssetOverview />
                    </motion.div>

                </div>
            </header>
        </div>
    );
};

export default Hero;
