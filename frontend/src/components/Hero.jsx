import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';
import { ArrowDownIcon } from "lucide-react";
import resumePdf from '../assets/resume.pdf'


function Hero() {

    const navigate = useNavigate();
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success(`${label} copied!`);
        }).catch(() => {
            toast.error('Failed to copy');
        });
    };
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <section data-theme="forest" className="min-h-screen flex items-center justify-center">

            <div className="text-center px-4">

                {/* Name Header */}
                <h1 className="title text-6xl md:text-8xl font-bold mb-8"
                >Samuel Oliveira</h1>


                {/* Primary Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">

                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/samuel-ucfprog/"
                        className='btn btn-neutral'
                    >LinkedIn</a>

                    <a
                        target="_blank"
                        href={resumePdf}
                        className='btn btn-neutral'
                    >Resume</a>

                    <a
                        target="_blank"
                        href="https://github.com/soliveira3"
                        className='btn btn-neutral'
                    >GitHub</a>

                    <button
                        onClick={() => scrollToSection('projects')}
                        className="btn btn-neutral"
                    >Projects</button>

                    <a
                        target="_blank"
                        href="https://codeforces.com/profile/soliveira27"
                        className="btn btn-neutral"
                    >CodeForces</a>

                </div>


                {/* Contact Information */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <button
                        onClick={() => copyToClipboard('321-326-0292', 'Phone')}
                        className="btn btn-outline btn-primary"
                    >321-326-0292</button>

                    <button
                        onClick={() => copyToClipboard('sam.l.olive05@gmail.com', 'Email')}
                        className="btn btn-outline btn-primary"
                    > sam.l.olive05@gmail.com</button>
                </div>


                {/* Down Arrow */}
                <div className="flex justify-center">
                    <ArrowDownIcon className="mt-10 size-10"/>
                </div>

            </div>
        </section>
    );
}

export default Hero;