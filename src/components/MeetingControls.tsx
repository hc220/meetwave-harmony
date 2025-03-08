
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mic, MicOff, Video, VideoOff, Share, Users, MessageSquare, 
  MoreVertical, Phone, Settings 
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MeetingControlsProps {
  onEndCall?: () => void;
}

export default function MeetingControls({ onEndCall }: MeetingControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const toggleSharing = () => setIsSharing(!isSharing);

  return (
    <div className="glass rounded-full py-3 px-4 inline-flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={toggleMute}
              variant={isMuted ? "destructive" : "ghost"} 
              size="icon" 
              className="rounded-full h-12 w-12 transition-all duration-300"
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isMuted ? "Unmute" : "Mute"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={toggleVideo}
              variant={isVideoOff ? "destructive" : "ghost"} 
              size="icon" 
              className="rounded-full h-12 w-12 transition-all duration-300"
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isVideoOff ? "Turn on camera" : "Turn off camera"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={toggleSharing}
              variant={isSharing ? "outline" : "ghost"} 
              size="icon" 
              className={`rounded-full h-12 w-12 transition-all duration-300 ${isSharing ? 'border-primary text-primary' : ''}`}
            >
              <Share className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isSharing ? "Stop sharing" : "Share screen"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-12 w-12 transition-all duration-300"
            >
              <Users className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Participants</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-12 w-12 transition-all duration-300"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chat</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-12 w-12 transition-all duration-300"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={onEndCall}
              variant="destructive" 
              size="icon" 
              className="rounded-full h-12 w-12 transition-all duration-300 bg-destructive hover:bg-destructive/90"
            >
              <Phone className="h-5 w-5 rotate-[135deg]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>End call</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
