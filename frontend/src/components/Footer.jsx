'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="w-full px-4 pb-6 mt-auto">

            <footer className="relative w-full max-w-7xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40">

                <div className="absolute inset-0 bg-white/40 backdrop-blur-xl z-0"></div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-b-full z-10 opacity-60"></div>

                <div className="relative z-10 px-6 py-5 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                        <div className="md:col-span-5 flex items-center gap-4">
                            <div className="shrink-0 p-2 bg-white/50 rounded-2xl border border-white/50 shadow-sm">
                                <img
                                    src="/Logo.png"
                                    alt="Logo"
                                    className="h-9 w-9 object-contain opacity-80"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-gray-700 text-sm">OOP Lookup System</h3>
                                <p className="text-[11px] text-gray-500 font-medium italic">
                                    "Đây là tiểu luận môn Trí tuệ Nhân tạo, chỉ sử dụng nhằm mục đích học tập. Nội dung có thể thiếu sót và sẽ tiếp tục được hoàn thiện."
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:block md:col-span-1"></div>

                        <div className="md:col-span-6 flex flex-col gap-2">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Nguồn tham khảo
                                </span>
                                <Link href="/about" className="...">  {/* Đổi to -> href */}
                                    Team Dev →
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <a href="#" className="px-2.5 py-1 rounded-lg bg-white/30 hover:bg-white/80 border border-white/40 text-purple-700 text-[11px] font-semibold transition-all">
                                    LearnAnything
                                </a>
                                <a href="https://www.w3schools.com/" target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-lg bg-white/30 hover:bg-white/80 border border-white/40 text-green-700 text-[11px] font-semibold transition-all">
                                    W3Schools
                                </a>
                                <a href="https://stackoverflow.com/" target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-lg bg-white/30 hover:bg-white/80 border border-white/40 text-orange-600 text-[11px] font-semibold transition-all">
                                    StackOverflow
                                </a>
                                <a href="https://gemini.google.com/" target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-lg bg-white/30 hover:bg-white/80 border border-white/40 text-blue-600 text-[11px] font-semibold transition-all">
                                    Gemini
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;