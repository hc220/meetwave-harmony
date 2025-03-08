
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingControls from "@/components/MeetingControls";
import VideoTile from "@/components/VideoTile";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  Info,
  Circle,
  Link as LinkIcon,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

const participants = [
  { id: 1, name: "You", isSelf: true, isMuted: false },
  { id: 2, name: "John Doe", isMuted: true },
  { id: 3, name: "Jane Smith", isMuted: false },
  { id: 4, name: "David Johnson", isMuted: true },
];

export default function MeetingRoom() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeParticipant, setActiveParticipant] = useState(1);
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
  ]);
  const [newMessage, setNewMessage] = useState("");
  const isMobile = useIsMobile();
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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave the meeting?";
      return "Are you sure you want to leave the meeting?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-muted dark:bg-background">
      {/* Header */}
      <header className="px-4 py-3 border-b bg-card flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-2 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold">QuickMeet</h1>
            <p className="text-xs text-muted-foreground">{meetingId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isRecording && (
            <div className="hidden sm:flex items-center space-x-1 mr-2 bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs">
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
        {/* Sidebar (Desktop) */}
        <aside
          className={`w-80 border-r bg-card hidden md:block transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Tabs defaultValue="participants">
            <TabsList className="w-full justify-start p-0 h-12 rounded-none border-b bg-muted/30">
              <TabsTrigger
                value="participants"
                className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <Users className="h-4 w-4 mr-2" /> Participants ({participants.length})
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="participants" className="p-0 m-0">
              <div className="overflow-y-auto h-[calc(100vh-9rem)]">
                <div className="p-4">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-xs font-medium">
                            {participant.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <span>
                          {participant.name} {participant.isSelf && "(You)"}
                        </span>
                      </div>
                      {participant.isMuted && <MicOff className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="p-0 m-0 flex flex-col h-[calc(100vh-9rem)]">
              <div className="overflow-y-auto flex-1 p-4">
                {messages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-xs text-muted-foreground">
                        {message.time}
                      </span>
                    </div>
                    <p className="mt-1">{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <form onSubmit={sendMessage} className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-muted rounded-l-md px-3 py-2 focus:outline-none"
                  />
                  <Button type="submit" className="rounded-l-none">
                    Send
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Sidebar (Mobile) */}
        <Sheet open={isMobile && isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[85%] sm:w-80">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Meeting Controls</SheetTitle>
            </SheetHeader>
            <Tabs defaultValue="participants">
              <TabsList className="w-full justify-start p-0 h-12 rounded-none border-b bg-muted/30">
                <TabsTrigger
                  value="participants"
                  className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <Users className="h-4 w-4 mr-2" /> Participants
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="participants" className="p-0 m-0">
                <div className="overflow-y-auto h-[calc(100vh-10rem)]">
                  <div className="p-4">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-xs font-medium">
                              {participant.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <span>
                            {participant.name} {participant.isSelf && "(You)"}
                          </span>
                        </div>
                        {participant.isMuted && <MicOff className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chat" className="p-0 m-0 flex flex-col h-[calc(100vh-10rem)]">
                <div className="overflow-y-auto flex-1 p-4">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-4">
                      <div className="flex justify-between">
                        <span className="font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.time}
                        </span>
                      </div>
                      <p className="mt-1">{message.text}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t p-4">
                  <form onSubmit={sendMessage} className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-muted rounded-l-md px-3 py-2 focus:outline-none"
                    />
                    <Button type="submit" className="rounded-l-none">
                      Send
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden p-4 flex flex-col bg-gradient-to-b from-background to-muted">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-20">
            {participants.map((participant) => (
              <VideoTile
                key={participant.id}
                name={participant.name}
                isMuted={participant.isMuted}
                isActive={participant.id === activeParticipant}
                isSelf={participant.isSelf}
                className={participant.id === activeParticipant ? "md:col-span-2 md:row-span-2" : ""}
              />
            ))}
          </div>

          {/* Meeting Controls */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center">
            <MeetingControls onEndCall={endCall} />
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper component for MicOff icon
function MicOff(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      {...props}
    >
      <line x1="1" y1="1" x2="23" y2="23"></line>
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  );
}

