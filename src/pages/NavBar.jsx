import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AuthButtons from "../components/AuthButtons";
import { useOktaAuth } from "@okta/okta-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { authState } = useOktaAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/appointments", label: "Appointments" },
    { to: "/users", label: "Users" },
    { to: "/roles", label: "Roles" },
    { to: "/status", label: "Status" },
    { to: "/visittypes", label: "Visit Types" },
  ];

   const isActive = (path) =>
    location.pathname === path
      ? "text-blue-900 font-semibold"
      : "hover:text-blue-900";

  return (
    <nav className="bg-blue-100 text-blue-700 border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Logo + Menu */}
          <div className="flex items-center gap-6">
            <Link to="/" className="font-bold text-lg">
              Vaccine Reminder
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              {navLinks.map(
                (link) =>
                  (link.alwaysShow || !authState?.isAuthenticated) && (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={isActive(link.to)}
                    >
                      {link.label}
                    </Link>
                  )
              )}
            </div>
          </div>

          {/* Right side: Auth + Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <AuthButtons />
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-blue-50 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-3">
          {navLinks.map(
            (link) =>
              (link.alwaysShow || authState?.isAuthenticated) && (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block ${isActive(link.to)}`}
                >
                  {link.label}
                </Link>
              )
          )}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}
