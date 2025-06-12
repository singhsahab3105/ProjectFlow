import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { 
  BarChart, 
  PieChart, 

  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell, 
  Pie 
} from 'recharts';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Users, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const projectData = [
    { name: 'Website Redesign', complete: 70, tasks: 23, tasksComplete: 16 },
    { name: 'Mobile App', complete: 45, tasks: 18, tasksComplete: 8 },
    { name: 'API Integration', complete: 90, tasks: 12, tasksComplete: 11 },
    { name: 'Dashboard', complete: 20, tasks: 15, tasksComplete: 3 },
  ];
  
  const taskStatusData = [
    { name: 'Completed', value: 38 },
    { name: 'In Progress', value: 27 },
    { name: 'Pending', value: 15 },
  ];
  
  const activityData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 6 },
    { name: 'Wed', tasks: 8 },
    { name: 'Thu', tasks: 5 },
    { name: 'Fri', tasks: 7 },
    { name: 'Sat', tasks: 3 },
    { name: 'Sun', tasks: 2 },
  ];
  
  const upcomingEvents = [
    { id: 1, title: 'Team Meeting', date: 'Today, 2:00 PM', type: 'meeting' },
    { id: 2, title: 'Project Deadline', date: 'Tomorrow, 11:59 PM', type: 'deadline' },
    { id: 3, title: 'Client Presentation', date: 'Jul 15, 10:00 AM', type: 'presentation' },
  ];

  const COLORS = ['#30D158', '#0A84FF', '#FF9F0A'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome section */}
      <motion.div variants={itemVariants} className="bg-white rounded-apple shadow-apple p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
      </motion.div>

      {/* Stats overview */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-apple shadow-apple p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-success">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Completed Tasks</h2>
              <p className="text-2xl font-semibold text-gray-900">38</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-green-100">
                <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success"></div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">75% of total tasks</p>
          </div>
        </div>

        <div className="bg-white rounded-apple shadow-apple p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-primary-500">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">In Progress</h2>
              <p className="text-2xl font-semibold text-gray-900">27</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                <div className="progressBar shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">45% of total tasks</p>
          </div>
        </div>

        <div className="bg-white rounded-apple shadow-apple p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-warning">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Pending</h2>
              <p className="text-2xl font-semibold text-gray-900">15</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-100">
                <div style={{ width: "20%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-warning"></div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">20% of total tasks</p>
          </div>
        </div>

        <div className="bg-white rounded-apple shadow-apple p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-accent-500">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Team Members</h2>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
          <div className="flex -space-x-2 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white">
                <div className="h-full w-full flex items-center justify-center text-xs font-medium text-gray-600">
                  {i}
                </div>
              </div>
            ))}
            <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +7
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-apple shadow-apple p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Project Progress</h2>
            <button className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="complete" name="Completion %" fill="#0A84FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-apple shadow-apple p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Task Status</h2>
            <button className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
              Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4">
            {taskStatusData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full mr-1"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity and upcoming events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-apple shadow-apple p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Activity</h2>
            <button className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
              This Month
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" name="Tasks Completed" fill="#BF5AF2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-apple shadow-apple p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
            <button className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
              View Calendar
              <Calendar className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className={`
                  p-2 rounded-md mr-3 flex-shrink-0 
                  ${event.type === 'meeting' ? 'bg-blue-100 text-primary-600' : 
                    event.type === 'deadline' ? 'bg-red-100 text-error' : 
                    'bg-purple-100 text-accent-600'}
                `}>
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                  <p className="text-xs text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;