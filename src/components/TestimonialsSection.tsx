
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    quote: "QuickMeet has transformed how our team collaborates remotely. The crystal clear video and intuitive interface make every meeting productive.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateSoft",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    quote: "We've tried numerous video conferencing tools, but QuickMeet stands out with its reliability and ease of use. Our clients love it too!",
  },
  {
    id: 3,
    name: "Jessica Martinez",
    role: "HR Director",
    company: "GlobalFinance",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    quote: "The simplicity of QuickMeet has made virtual interviews seamless. No downloads or complicated setup - just send a link and connect.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by teams worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our users have to say about their QuickMeet experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card border rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-auto flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
