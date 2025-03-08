
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-xl font-semibold"
        >
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md">Q</span>
          <span>QuickMeet</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/join"
              className={({ isActive }) =>
                `font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
            >
              Join Meeting
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
            >
              Create Meeting
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild size="sm">
              <NavLink to="/create">Start Meeting</NavLink>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-background transition-all duration-300 ease-in-out z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-8">
          <div className="flex flex-col space-y-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-medium py-2 transition-colors ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/join"
              className={({ isActive }) =>
                `text-lg font-medium py-2 transition-colors ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Join Meeting
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `text-lg font-medium py-2 transition-colors ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Create Meeting
            </NavLink>
          </div>
          <div className="mt-auto">
            <Button className="w-full" onClick={() => setIsOpen(false)} asChild>
              <NavLink to="/create">Start Meeting</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
