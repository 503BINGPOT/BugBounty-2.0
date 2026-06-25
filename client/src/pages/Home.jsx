import Layout from "../components/layout/layout";

import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturedBounties from "../components/sections/featuredBounties";
import Benefits from "../components/sections/benefits";

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