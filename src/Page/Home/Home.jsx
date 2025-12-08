import React from 'react';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import CorporateAssetsSection from './CorporateAssetsSection/CorporateAssetsSection';
import GetStartedStepsSection from './StepItem/StepItem';
import FeaturesSection from './FeatureSection/FeatureSection';
import Subscription from './Subscription/Subscription';
import PricingSection from './Subscription/Subscription';
import TestimonialsAndMetricsSection from './TestimonialsAndMetricsSection/TestimonialsAndMetricsSection';
import FAQ from './FaqSection/FaqSection';
import ReadyToTransformCTA from './TransformCTA/ReadyToTransformCTA';



const Home = () => {
    return (
        <div>
          <Hero></Hero>
          <CorporateAssetsSection></CorporateAssetsSection>
          <GetStartedStepsSection></GetStartedStepsSection>
          <FeaturesSection></FeaturesSection>
          <PricingSection></PricingSection>
          <TestimonialsAndMetricsSection></TestimonialsAndMetricsSection>
         <FAQ></FAQ>
         <ReadyToTransformCTA></ReadyToTransformCTA>
        </div>
    );
};

export default Home;