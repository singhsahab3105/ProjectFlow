import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FolderKanban, 
  BarChart2, 
  Users, 
  Settings, 
  HelpCircle, 
  X,
  LayoutDashboard,
  PlusCircle
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}

const Sidebar = ({ open, setOpen, isMobile }: SidebarProps) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Analytics', href: '#', icon: BarChart2 },
    { name: 'Team', href: '#', icon: Users },
  ];
  
  const secondaryNavigation = [
    { name: 'Settings', href: '#', icon: Settings },
    { name: 'Help', href: '#', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const Content = () => (
    <div className="flex flex-col h-full bg-white shadow-lg w-64">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center">
          <div className="bg-primary-500 text-white p-2 rounded-md">
            <Home className="h-5 w-5" />
          </div>
          <span className="ml-2 text-xl font-semibold text-gray-900">ProjectFlow</span>
        </Link>
        {isMobile && (
          <button 
            onClick={() => setOpen(false)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
        <nav className="flex-1 px-3 space-y-3">
          <div>
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-left rounded-md bg-primary-50 text-primary-700 font-medium hover:bg-primary-100 group transition-colors"
            >
              <span>Create New</span>
              <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </p>
            
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${active 
                      ? 'bg-primary-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => isMobile && setOpen(false)}
                >
                  <item.icon 
                    className={`mr-3 h-5 w-5 ${active ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'}`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 pt-5">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Settings
            </p>
            
            {secondaryNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                onClick={(e) => {
                  e.preventDefault();
                  if (isMobile) setOpen(false);
                }}
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-900" />
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* User profile */}
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/profile"
          className="flex items-center hover:bg-gray-50 rounded-md p-2 transition-colors"
          onClick={() => isMobile && setOpen(false)}
        >
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">View profile</p>
          </div>
        </Link>
      </div>
    </div>
  );

  // For mobile
  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed inset-y-0 left-0 z-30 w-64 lg:hidden"
          >
            <Content />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // For desktop
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="w-64">
        <Content />
      </div>
    </div>
  );
};

export default Sidebar;