import React from 'react';
import Header from '../LandingPageComponents/Header';
import TaglineAndImage from '../LandingPageComponents/TaglineAndImage';
import Topics from '../LandingPageComponents/Topics';
import Reviews from '../LandingPageComponents/Reviews';
import Features from '../LandingPageComponents/Features'
import Footer from '../LandingPageComponents/Footer';
import SubTopics from '../LandingPageComponents/SubTopics'

const LandingPage = () => {
    return (
        <>
            <Header />

            <TaglineAndImage />
            <Topics />
            <Reviews />
            <Features />
            <SubTopics />

            <Footer />
        </>
    );
};

export default LandingPage;