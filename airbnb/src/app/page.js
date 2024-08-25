import AuthenticationModal from "@/components/authentication/AuthenticationModal";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Footer />
      <AuthenticationModal />
    </div>
  )
}

export default Home;