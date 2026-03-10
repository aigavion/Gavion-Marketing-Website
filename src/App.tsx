import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Background from "@/components/Background";
import ServicesTimeline from "@/components/ServicesTimeline";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ServicesPage from "@/components/ServicesPage";
import TermsPage from "@/components/TermsPage";
import PrivacyPage from "@/components/PrivacyPage";
import ChatWidget from "@/components/ChatWidget";
import { ChatProvider } from "@/contexts/ChatContext";

function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const handleScroll = () => {
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="pt-16">
      <Hero />
      <ServicesTimeline />
      <WhyUs />
      <Process />
      <Pricing />
      <Contact />
    </main>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash && !(location.state as any)?.scrollToContact) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    const state = location.state as any;
    if (state?.scrollToContact) {
      setTimeout(() => {
        const target = document.querySelector('#contact');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Background />
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ChatProvider>
      <AppContent />
      <ChatWidget />
    </ChatProvider>
  );
}