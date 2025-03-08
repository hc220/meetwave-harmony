
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-enter");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="min-h-screen pt-24 pb-16 flex flex-col justify-center relative overflow-hidden hero-gradient"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block animate-on-scroll opacity-0 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Simple. Secure. Seamless.
          </span>
          
          <h1 className="animate-on-scroll opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Connect with anyone, anywhere with{" "}
            <span className="text-primary">QuickMeet</span>
          </h1>
          
          <p className="animate-on-scroll opacity-0 text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience crystal-clear video calls with intuitive controls and seamless collaboration tools. No downloads required.
          </p>
          
          <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/create">
                Create Meeting <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/join">Join Meeting</Link>
            </Button>
          </div>
        </div>
        
        <div className="animate-on-scroll opacity-0 mt-16 md:mt-24 max-w-5xl mx-auto relative">
          <div className="w-full aspect-video rounded-xl overflow-hidden border shadow-lg">
            <div className="bg-gradient-to-br from-muted to-card h-full w-full flex items-center justify-center">
              <div className="glass rounded-lg p-6 md:p-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-semibold text-lg md:text-xl">QM</span>
                </div>
                <p className="text-lg md:text-xl font-medium">Your meeting is ready to start</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">meeting-id-12345</p>
                <Button size="sm">Join Now</Button>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full filter blur-xl" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full filter blur-xl" />
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
