'use client'

import AuthenticationModal from "@/components/authentication/AuthenticationModal";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { useAirbnbStore } from "@/store/store";

const Home = () => {
  const isAuthModalOpen = useAirbnbStore((state) => state.isAuthModalOpen);
  return (
    <div>
      <Navbar />
      <Footer />
      {isAuthModalOpen && (<AuthenticationModal />)}
    </div>
  )
}

export default Home;