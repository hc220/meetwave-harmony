
import { Users, Video, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    number: "1M+",
    label: "Active Users",
  },
  {
    icon: <Video className="h-6 w-6 text-primary" />,
    number: "10M+",
    label: "Meetings Hosted",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    number: "500M+",
    label: "Meeting Minutes",
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    number: "99.9%",
    label: "Uptime",
  },
];

export default function StatisticsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.number}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
