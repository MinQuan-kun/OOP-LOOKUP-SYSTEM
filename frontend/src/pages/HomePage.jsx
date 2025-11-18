import React from "react";
import Header from "@/components/Header";
import LanguageBar from "@/components/LanguageBar";
import LoginButton from "../components/LoginButton";
import SearchFilterBar from "@/components/SearchFilterBar";
import KnowledgeTree from "@/components/KnowledgeTree";
import MainContent from "@/components/MainContent";
import RelatedContent from "@/components/RelatedContent";
const HomePage = () => {

    return (
        <div className="min-h-screen w-full relative">
            {/* Radial Gradient Background from Top */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
                }}
            />
            {/* Your Content/Components */}

            <div className="container relative z-10 pt-8 mx-auto">
                <div className="w-full max-w-13xl p-6 mx-auto space-y-6">
                    {/*Nút login*/}
                    <LoginButton />
                    {/* Đầu Trang */}
                    <Header />
                    {/* Thanh ngôn ngữ*/}
                    <LanguageBar />
                    {/* --- MAIN CONTENT --- */}
                    {/* MAIN CONTENT */}
                    <div className="relative z-10 container mx-auto pb-10 px-4">
                        <div className="w-full max-w-7xl mx-auto space-y-6">

                            {/* 1. Thanh Search & Filter */}
                            <SearchFilterBar />

                            {/* 2. BỐ CỤC 3 CỘT (GRID LAYOUT) */}
                            {/* lg:grid-cols-12: Chia màn hình làm 12 phần bằng nhau */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                                {/* CỘT 1: (Cây kiến thức) - Chiếm 3 phần (3/12 ~ 25%) */}
                                <div className="lg:col-span-3">
                                    <KnowledgeTree />
                                </div>
                                {/* CỘT 2: Nội dung chính (Chiếm 6/12) */}
                                <div className="lg:col-span-6">
                                    <MainContent />
                                </div>

                                {/* CỘT 3: Kiến thức liên quan (Chiếm 3/12) */}
                                <div className="lg:col-span-3">
                                    <RelatedContent />
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomePage;
