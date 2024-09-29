import React from 'react';
import Header from '../LandingPageComponents/Header';
import TaglineAndImage from '../LandingPageComponents/TaglineAndImage';
import Topics from '../LandingPageComponents/Topics';
import Reviews from '../LandingPageComponents/Reviews';
import Features from '../LandingPageComponents/Features'
import Footer from '../LandingPageComponents/Footer';
import SubTopics from '../LandingPageComponents/SubTopics'
import FAQs from '../LandingPageComponents/FAQs';
import BlogsAndArticles from '../LandingPageComponents/Blogs';
import Benefits from '../LandingPageComponents/Benefits'

const LandingPage = () => {
    return (
        <>
            <Header />

            <TaglineAndImage />
            <Topics />
            <Reviews />
            <Features />
            <SubTopics />
            <FAQs/>
            <Benefits/>
            <BlogsAndArticles/>

            <Footer />
        </>
    );
};

export default LandingPage;