
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight, Copy, Lock, Video } from "lucide-react";
import { toast } from "sonner";

export default function CreateMeeting() {
  const [meetingName, setMeetingName] = useState("");
  const [requirePassword, setRequirePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [enableWaitingRoom, setEnableWaitingRoom] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  
  // Generate a random meeting ID
  const [meetingId, setMeetingId] = useState(() => {
    const randomId = `meeting-${Math.random().toString(36).substring(2, 7)}-${Math.random().toString(36).substring(2, 7)}`;
    return randomId;
  });
  
  useEffect(() => {
    setIsValid(meetingName.trim().length > 0 && (!requirePassword || password.trim().length > 0));
  }, [meetingName, requirePassword, password]);
  
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      toast.success("Meeting created successfully!");
      navigate(`/meeting/${meetingId}`);
    }
  };
  
  const copyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
    toast.success("Meeting ID copied to clipboard");
  };
  
  const regenerateMeetingId = () => {
    const newId = `meeting-${Math.random().toString(36).substring(2, 7)}-${Math.random().toString(36).substring(2, 7)}`;
    setMeetingId(newId);
    toast.success("New meeting ID generated");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center py-16 px-4 meeting-gradient">
        <div className="max-w-3xl w-full mx-auto animate-scale-in">
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold">Create a New Meeting</h1>
              </div>
            </div>
            
            <form onSubmit={handleCreate} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="meeting-name" className="block text-sm font-medium mb-1">
                    Meeting Name
                  </label>
                  <Input
                    id="meeting-name"
                    placeholder="Enter meeting name"
                    value={meetingName}
                    onChange={(e) => setMeetingName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="meeting-id" className="block text-sm font-medium mb-1">
                    Meeting ID
                  </label>
                  <div className="flex">
                    <Input
                      id="meeting-id"
                      value={meetingId}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      type="button"
                      onClick={copyMeetingId}
                      variant="outline"
                      className="rounded-l-none border-l-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can share this ID with participants to join your meeting
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={regenerateMeetingId}
                  >
                    Generate new ID
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
                  <h3 className="font-medium flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Security Options
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label htmlFor="require-password" className="font-medium">
                        Require Meeting Password
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Switch
                      id="require-password"
                      checked={requirePassword}
                      onCheckedChange={setRequirePassword}
                    />
                  </div>
                  
                  {requirePassword && (
                    <div className="pl-6 border-l-2 border-primary/20 animate-fade-in">
                      <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter meeting password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={requirePassword}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label htmlFor="waiting-room" className="font-medium">
                        Enable Waiting Room
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Admit participants manually
                      </p>
                    </div>
                    <Switch
                      id="waiting-room"
                      checked={enableWaitingRoom}
                      onCheckedChange={setEnableWaitingRoom}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t flex justify-end">
                  <Button type="submit" disabled={!isValid}>
                    Create Meeting <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
