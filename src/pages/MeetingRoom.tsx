
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  Info,
  Circle,
  Link as LinkIcon,
  Copy,
  X,
  Send,
  MicOff,
} from "lucide-react";
import { toast } from "sonner";
import MeetingControls from "@/components/MeetingControls";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

// Enhanced fake participants list
const participants = [
  { id: 1, name: "You", isSelf: true, isMuted: false },
  { id: 2, name: "John Doe", isMuted: true },
  { id: 3, name: "Jane Smith", isMuted: false },
  { id: 4, name: "David Johnson", isMuted: true },
  { id: 5, name: "Sarah Williams", isMuted: false },
  { id: 6, name: "Michael Chen", isMuted: true },
  { id: 7, name: "Emily Rodriguez", isMuted: false },
  { id: 8, name: "Robert Taylor", isMuted: false },
];

export default function MeetingRoom() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const [isRecording, setIsRecording] = useState(false);
  const [activeParticipant, setActiveParticipant] = useState(1);
  // Enhanced fake chat messages
  const [messages, setMessages] = useState<Array<{id: number, sender: string, text: string, time: string}>>([
    {
      id: 1,
      sender: "John Doe",
      text: "Hi everyone! Thanks for joining the call.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "Jane Smith",
      text: "Good to be here. Shall we go through the agenda?",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "David Johnson",
      text: "I shared the presentation in the team channel. Let me know if anyone can't access it.",
      time: "10:32 AM",
    },
    {
      id: 4,
      sender: "Sarah Williams",
      text: "Got it, thanks David. The slides look great!",
      time: "10:33 AM",
    },
    {
      id: 5,
      sender: "Michael Chen",
      text: "I have a question about slide 4. Can we discuss that section in more detail?",
      time: "10:35 AM",
    },
    {
      id: 6,
      sender: "You",
      text: "Sure Michael, we'll cover that in the Q&A section.",
      time: "10:36 AM",
    },
    {
      id: 7,
      sender: "Emily Rodriguez",
      text: "Just joined. Sorry I'm late!",
      time: "10:38 AM",
    },
    {
      id: 8,
      sender: "Robert Taylor",
      text: "No problem Emily. We're just getting started with the main presentation.",
      time: "10:39 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success("Recording started");
    } else {
      toast.success("Recording stopped");
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const copyMeetingLink = () => {
    const link = `${window.location.origin}/join?id=${meetingId}`;
    navigator.clipboard.writeText(link);
    toast.success("Meeting link copied to clipboard");
  };

  const endCall = () => {
    navigate("/");
    toast.info("You left the meeting");
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Select a participant to be the main speaker
  const selectSpeaker = (id: number) => {
    setActiveParticipant(id);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave the meeting?";
      return "Are you sure you want to leave the meeting?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Find the active participant
  const activeSpeaker = participants.find(p => p.id === activeParticipant) || participants[0];

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-muted dark:bg-background">
      {/* Header */}
      <header className="px-4 py-3 border-b bg-card flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <h1 className="font-semibold">QuickMeet</h1>
            <p className="text-xs text-muted-foreground">{meetingId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isRecording && (
            <div className="flex items-center space-x-1 mr-2 bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs">
              <Circle className="h-3 w-3 animate-pulse" />
              <span>Recording</span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            onClick={copyMeetingLink}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Copy Invite Link
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={isRecording ? "text-destructive" : ""}
          >
            <Circle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Video Area */}
        <main className="flex-1 p-4 overflow-hidden bg-gradient-to-b from-background to-muted flex items-center justify-center">
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg relative">
            {/* Main video feed - active speaker */}
            <div className="w-full h-full bg-black/10 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-semibold">
                  {getInitials(activeSpeaker.name)}
                </div>
              </div>
            </div>
            {/* Speaker name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">{activeSpeaker.name} {activeSpeaker.isSelf ? "(You)" : ""}</span>
                {activeSpeaker.isMuted && <MicOff className="h-4 w-4 text-white" />}
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel: Participants & Chat */}
        <aside className="w-80 border-l bg-card hidden md:flex flex-col">
          <Tabs defaultValue="participants" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="participants" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                <Users className="h-4 w-4 mr-2" /> Participants ({participants.length})
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                <MessageSquare className="h-4 w-4 mr-2" /> Chat
              </TabsTrigger>
            </TabsList>

            {/* Participants Tab */}
            <TabsContent value="participants" className="p-0 m-0 flex-1 overflow-hidden flex flex-col">
              <div className="overflow-y-auto flex-1">
                <div className="p-2">
                  {participants.map((participant) => (
                    <Card 
                      key={participant.id} 
                      className={`flex items-center justify-between p-3 mb-2 cursor-pointer transition-colors hover:bg-muted ${participant.id === activeParticipant ? 'border-primary' : ''}`}
                      onClick={() => selectSpeaker(participant.id)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className={`${participant.id === activeParticipant ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {getInitials(participant.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {participant.name} {participant.isSelf && "(You)"}
                        </span>
                      </div>
                      {participant.isMuted && <MicOff className="h-4 w-4 text-muted-foreground" />}
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="p-0 m-0 flex-1 overflow-hidden flex flex-col">
              <div className="overflow-y-auto flex-1 p-4">
                {messages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-xs text-muted-foreground">
                        {message.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="border-t p-3">
                <form onSubmit={sendMessage} className="flex">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-r-none"
                  />
                  <Button type="submit" className="rounded-l-none">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Mobile View - Will show a bottom sheet with tabs */}
        <div className="md:hidden fixed bottom-20 left-4 right-4">
          <Button 
            variant="outline" 
            className="w-full bg-background border shadow-md"
            onClick={() => toast.info("Mobile view participants panel would open here")}
          >
            <Users className="h-4 w-4 mr-2" /> 
            Show Participants & Chat
          </Button>
        </div>
      </div>

      {/* Meeting Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center">
        <MeetingControls onEndCall={endCall} />
      </div>
    </div>
  );
}
