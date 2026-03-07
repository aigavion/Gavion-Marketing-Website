import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesTimeline from "@/components/ServicesTimeline";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import ServicesPage from "@/components/ServicesPage";

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <ServicesTimeline />
      <WhyUs />
      <Process />
      <Pricing />
      <Testimonials />
      <Contact />
    </main>
  );
}

function App() {
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
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
