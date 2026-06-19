import Layout from "../components/layout/Layout";

import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturedBounties from "../components/sections/FeaturedBounties";
import Benefits from "../components/sections/Benefits";

const Home = () => {
  return (
    <Layout>

      <Hero />
      <Stats />
      <HowItWorks />
      <FeaturedBounties />
      <Benefits />

    </Layout>
  );
};

export default Home;