
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, Copy, Video, Calendar, Users } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function CreateMeeting() {
  const [meetingId] = useState("quick-meet-" + Math.random().toString(36).substring(2, 8));
  const [copied, setCopied] = useState(false);
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [mutedOnEntry, setMutedOnEntry] = useState(true);
  const navigate = useNavigate();

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join?id=${meetingId}`);
    setCopied(true);
    toast.success("Meeting link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const startMeeting = () => {
    navigate(`/meeting/${meetingId}`);
  };

  const scheduleMeeting = () => {
    toast.info("Meeting scheduled for later");
    // This would typically integrate with a calendar API
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create a Meeting</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Set up your video conference and invite participants to join
            </p>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Meeting Information</h2>
                  <p className="text-muted-foreground text-sm">
                    Your personal meeting room is ready to use
                  </p>
                </div>

                <div className="flex items-center mt-4 mb-6">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Personal Meeting ID</p>
                    <p className="text-muted-foreground break-all">{meetingId}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex mb-3">
                    <Input
                      value={`${window.location.origin}/join?id=${meetingId}`}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={copyMeetingLink}
                      variant="outline"
                      className={`rounded-l-none border-l-0 ${
                        copied ? "bg-green-500 text-white" : ""
                      }`}
                    >
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-3">
                <Button onClick={startMeeting} size="lg" className="flex-1 md:w-auto">
                  <Video className="mr-2 h-5 w-5" />
                  Start Meeting
                </Button>
                <Button onClick={scheduleMeeting} variant="outline" size="lg" className="flex-1 md:w-auto">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="text-lg font-medium mb-4">Meeting Options</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="waiting-room">Waiting Room</Label>
                  <p className="text-sm text-muted-foreground">
                    Participants need permission to join
                  </p>
                </div>
                <Switch
                  id="waiting-room"
                  checked={waitingRoom}
                  onCheckedChange={setWaitingRoom}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="muted-on-entry">Mute on Entry</Label>
                  <p className="text-sm text-muted-foreground">
                    Participants join with their microphone muted
                  </p>
                </div>
                <Switch
                  id="muted-on-entry"
                  checked={mutedOnEntry}
                  onCheckedChange={setMutedOnEntry}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="participants-limit">Participant Limit</Label>
                  <p className="text-sm text-muted-foreground">
                    Set maximum number of participants
                  </p>
                </div>
                <div className="w-16">
                  <Input id="participants-limit" type="number" defaultValue={25} min={1} max={100} />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <Button onClick={startMeeting} className="flex-1">
                <Users className="mr-2 h-4 w-4" />
                Start Instant Meeting
              </Button>
              <Button onClick={copyMeetingLink} variant="outline" className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Copy Invitation
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
