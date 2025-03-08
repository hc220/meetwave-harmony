
import { Shield, Zap, Smartphone, Users, Video, Lock } from "lucide-react";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Instant Meetings",
    description:
      "Create and join meetings with a single click. No downloads or installations required.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Secure Calls",
    description:
      "End-to-end encryption ensures your conversations remain private and secure.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    title: "Multi-device Support",
    description:
      "Join from any device with a browser - desktop, tablet, or smartphone.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Team Collaboration",
    description:
      "Screen sharing, live chat, and interactive whiteboard for effective collaboration.",
  },
  {
    icon: <Video className="h-6 w-6 text-primary" />,
    title: "HD Video Quality",
    description:
      "Crystal clear audio and high-definition video for a premium meeting experience.",
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Meeting Controls",
    description:
      "Host controls, waiting rooms, and password protection for added security.",
  },
];

export default function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const elements = featuresRef.current?.querySelectorAll(".feature-item");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for seamless communication
          </h2>
          <p className="text-muted-foreground text-lg">
            QuickMeet combines powerful features with elegant simplicity, making virtual meetings effortless.
          </p>
        </div>

        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item opacity-0 bg-card border rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
