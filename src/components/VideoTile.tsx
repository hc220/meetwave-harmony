
import { useState, useEffect } from "react";
import { Mic, MicOff, Pin, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface VideoTileProps {
  name: string;
  isMuted?: boolean;
  isActive?: boolean;
  isSelf?: boolean;
  className?: string;
}

export default function VideoTile({ 
  name, 
  isMuted = false, 
  isActive = false, 
  isSelf = false,
  className = ""
}: VideoTileProps) {
  const [mouseOver, setMouseOver] = useState(false);
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  const colors = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-green-400 to-green-600",
    "from-orange-400 to-orange-600",
    "from-pink-400 to-pink-600",
    "from-teal-400 to-teal-600"
  ];
  
  // Pseudo-random color based on name
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const gradientColor = colors[colorIndex];

  return (
    <div 
      className={`relative rounded-lg overflow-hidden shadow-sm border transition-all duration-300 ${
        isActive ? "ring-2 ring-primary" : ""
      } ${className}`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {/* Video/Avatar Placeholder */}
      <div className="w-full h-full aspect-video bg-muted flex items-center justify-center">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white text-2xl font-semibold`}>
          {initials}
        </div>
      </div>
      
      {/* Controls Overlay */}
      <div className={`absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300 ${
        mouseOver || isMuted ? "opacity-100" : "opacity-0"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white drop-shadow-md">
              {name} {isSelf ? "(You)" : ""}
            </span>
            {isMuted && (
              <MicOff className="h-4 w-4 text-white drop-shadow-md" />
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            {mouseOver && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pin className="h-4 w-4 mr-2" /> 
                    Pin video
                  </DropdownMenuItem>
                  <DropdownMenuItem>Hide video</DropdownMenuItem>
                  {!isSelf && (
                    <DropdownMenuItem>Mute participant</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
