
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ArrowRight, Users } from "lucide-react";

export default function JoinMeeting() {
  const [meetingId, setMeetingId] = useState("");
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(meetingId.trim().length > 0 && name.trim().length > 0);
  }, [meetingId, name]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      navigate(`/meeting/${meetingId}`);
    }
  };

  const recentMeetings = [
    { id: "meeting-abc-123", name: "Weekly Team Sync", time: "Yesterday" },
    { id: "meeting-def-456", name: "Product Review", time: "2 days ago" },
    { id: "meeting-ghi-789", name: "Design Workshop", time: "Last week" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center py-16 px-4 meeting-gradient">
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 animate-scale-in">
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Join a Meeting</h1>
              <p className="text-muted-foreground">
                Enter a meeting ID to join an existing QuickMeet conference
              </p>
            </div>

            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label htmlFor="meeting-id" className="block text-sm font-medium mb-1">
                  Meeting ID
                </label>
                <Input
                  id="meeting-id"
                  placeholder="Enter meeting ID"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-2" 
                disabled={!isValid}
              >
                Join Meeting <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Recent Meetings</h2>
            </div>
            
            <div className="space-y-3">
              {recentMeetings.map((meeting) => (
                <div 
                  key={meeting.id}
                  className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setMeetingId(meeting.id);
                    if (name) {
                      navigate(`/meeting/${meeting.id}`);
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{meeting.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">ID: {meeting.id}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{meeting.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Don't have a meeting ID?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={() => navigate("/create")}
                >
                  Create a new meeting
                </Button>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
