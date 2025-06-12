import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Redesign the company website with new branding',
      status: 'in-progress',
      progress: 70,
      dueDate: '2025-07-15',
      members: 5,
      tasks: { total: 23, completed: 16 }
    },
    {
      id: 2,
      name: 'Mobile Application',
      description: 'Develop a cross-platform mobile app for our services',
      status: 'in-progress',
      progress: 45,
      dueDate: '2025-08-20',
      members: 8,
      tasks: { total: 18, completed: 8 }
    },
    {
      id: 3,
      name: 'API Integration',
      description: 'Integrate payment processing API into the platform',
      status: 'completed',
      progress: 100,
      dueDate: '2025-06-05',
      members: 3,
      tasks: { total: 12, completed: 12 }
    },
    {
      id: 4,
      name: 'Dashboard Creation',
      description: 'Create an analytics dashboard for user insights',
      status: 'planning',
      progress: 20,
      dueDate: '2025-09-10',
      members: 4,
      tasks: { total: 15, completed: 3 }
    },
    {
      id: 5,
      name: 'E-commerce Platform',
      description: 'Build an e-commerce platform with inventory management',
      status: 'on-hold',
      progress: 35,
      dueDate: '2025-10-30',
      members: 6,
      tasks: { total: 27, completed: 9 }
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-success';
      case 'in-progress':
        return 'bg-blue-100 text-primary-600';
      case 'planning':
        return 'bg-purple-100 text-accent-600';
      case 'on-hold':
        return 'bg-yellow-100 text-warning';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'on-hold':
        return 'On Hold';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage and track all your projects</p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </button>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-apple shadow-apple p-4"
      >
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative inline-flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="planning">Planning</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="bg-white rounded-apple shadow-apple overflow-hidden hover:shadow-apple-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <Link to={`/projects/${project.id}`} className="hover:text-primary-600">
                  <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
                </Link>
                <div className="relative">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <p className="mt-1 text-gray-600">{project.description}</p>
              
              <div className="mt-4 flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
                <span className="text-xs text-gray-500">
                  Due {formatDate(project.dueDate)}
                </span>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      project.status === 'completed' ? 'bg-success' : 
                      project.status === 'on-hold' ? 'bg-warning' : 
                      'bg-primary-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-5 pt-5 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="text-sm">{project.members} members</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span className="text-sm">{project.tasks.completed}/{project.tasks.total} tasks</span>
                </div>
                
                <Link 
                  to={`/projects/${project.id}`}
                  className="text-sm text-primary-600 hover:text-primary-800 hover:underline font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-apple shadow-apple p-10 text-center"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 text-gray-500 mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            We couldn't find any projects matching your search criteria. Try adjusting your filters or create a new project.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;