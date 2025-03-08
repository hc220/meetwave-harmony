
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Video, AlertCircle, Mic, MicOff } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function JoinMeeting() {
  const [searchParams] = useSearchParams();
  const [meetingId, setMeetingId] = useState(searchParams.get("id") || "");
  const [name, setName] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingId.trim()) {
      setError("Please enter a meeting ID");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    
    // In a real app, this would validate the meeting ID
    // Here we'll just navigate to the meeting room
    navigate(`/meeting/${meetingId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-md mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Join a Meeting</h1>
            <p className="text-muted-foreground">
              Enter the meeting ID to connect with others
            </p>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            <form onSubmit={handleJoin}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-id">Meeting ID</Label>
                  <Input
                    id="meeting-id"
                    value={meetingId}
                    onChange={(e) => {
                      setMeetingId(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter meeting ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {audioEnabled ? (
                        <Mic className="h-5 w-5 text-primary" />
                      ) : (
                        <MicOff className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span>Join with audio</span>
                    </div>
                    <Switch 
                      checked={audioEnabled} 
                      onCheckedChange={setAudioEnabled} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Video className={`h-5 w-5 ${videoEnabled ? "text-primary" : "text-muted-foreground"}`} />
                      <span>Join with video</span>
                    </div>
                    <Switch 
                      checked={videoEnabled} 
                      onCheckedChange={setVideoEnabled} 
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full mt-6">
                  Join Meeting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
              <p>
                Don't have a meeting ID?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => navigate("/create")}
                >
                  Create a meeting
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
