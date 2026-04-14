import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="text-center py-20 bg-[#0d172a] rounded-3xl mb-12 border border-[#1f293a] shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tighter">
            Your finances, organized. <br />
            <span className="text-[#38bdf8]">Your market, understood.</span>
            </h1>
            <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10">
            A specialized vantage point for Chicago-based professionals to track personal cash flow and global market velocity in one place.
            </p>
            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-[#38bdf8] text-[#0a1120] rounded-full font-bold text-lg hover:bg-[#7dd3fc] transform hover:scale-105 transition-all">
            Get Started <ArrowRight size={20} />
            </Link>
            <Link to='/signup' className="inline-flex items-center gap-2 px-8 py-4 bg-[#f87338] text-[#0a1120] rounded-full font-bold text-lg hover:bg-[#fa9669] transform hover:scale-105 transition-all ml-4">
            Sign Up <ArrowRight size={20} />
            </Link>
        </section>    
        );
}
export default Hero;