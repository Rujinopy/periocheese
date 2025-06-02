import Hero from "@/components/landing/Hero";
import Header from "@/components/landing/Header";
import Features from "./(detail)/feature/page";
import Footer from "@/components/landing/Footer"

export default function Home() {

  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
