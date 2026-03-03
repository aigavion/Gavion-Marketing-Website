import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesTimeline from "@/components/ServicesTimeline";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  useEffect(() => {
    // Intersection Observer for reveal animations
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

     // Smooth scroll for anchor links
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
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <ServicesTimeline />
        <WhyUs />
        <Process />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
