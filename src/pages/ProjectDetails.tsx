import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Plus, 
  MoreHorizontal,
  Users,
  MessageSquare,
  Paperclip,
  ChevronDown,
  Edit3,
  Trash2
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'timeline' | 'files'>('tasks');
  const [newTaskInput, setNewTaskInput] = useState('');
  
  // Mock data for a single project
  const project = {
    id: Number(id),
    name: id === '1' ? 'Website Redesign' : 'Project ' + id,
    description: 'Redesign the company website with new branding and improved user experience. Focus on mobile responsiveness and performance optimization.',
    status: 'in-progress',
    progress: 70,
    startDate: '2025-05-01',
    dueDate: '2025-07-15',
    members: [
      { id: 1, name: 'John Doe', role: 'Project Manager', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
      { id: 2, name: 'Jane Smith', role: 'Designer', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
      { id: 3, name: 'Mike Johnson', role: 'Developer', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
      { id: 4, name: 'Sarah Wilson', role: 'Content Writer', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
      { id: 5, name: 'David Brown', role: 'QA Tester', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    ],
    tasks: [
      { id: 1, title: 'Create wireframes', status: 'completed', assignee: 'Jane Smith', dueDate: '2025-05-15', priority: 'high' },
      { id: 2, title: 'Design homepage mockup', status: 'completed', assignee: 'Jane Smith', dueDate: '2025-05-25', priority: 'high' },
      { id: 3, title: 'Develop frontend components', status: 'in-progress', assignee: 'Mike Johnson', dueDate: '2025-06-10', priority: 'medium' },
      { id: 4, title: 'Set up API endpoints', status: 'in-progress', assignee: 'Mike Johnson', dueDate: '2025-06-20', priority: 'medium' },
      { id: 5, title: 'Write website copy', status: 'in-progress', assignee: 'Sarah Wilson', dueDate: '2025-06-25', priority: 'low' },
      { id: 6, title: 'QA testing', status: 'pending', assignee: 'David Brown', dueDate: '2025-07-05', priority: 'high' },
      { id: 7, title: 'Performance optimization', status: 'pending', assignee: 'Mike Johnson', dueDate: '2025-07-10', priority: 'medium' },
    ],
    activities: [
      { id: 1, user: 'John Doe', action: 'created the project', timestamp: '2025-05-01T09:00:00Z' },
      { id: 2, user: 'Jane Smith', action: 'completed task "Create wireframes"', timestamp: '2025-05-15T14:30:00Z' },
      { id: 3, user: 'John Doe', action: 'added Mike Johnson to the project', timestamp: '2025-05-16T10:15:00Z' },
      { id: 4, user: 'Jane Smith', action: 'completed task "Design homepage mockup"', timestamp: '2025-05-25T16:45:00Z' },
      { id: 5, user: 'Mike Johnson', action: 'started working on "Develop frontend components"', timestamp: '2025-05-27T11:20:00Z' },
    ]
  };
  
  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddTask = () => {
    if (newTaskInput.trim()) {
      // In a real app, this would call an API to add the task
      console.log('Adding task:', newTaskInput);
      setNewTaskInput('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-success';
      case 'in-progress':
        return 'bg-blue-100 text-primary-600';
      case 'pending':
        return 'bg-yellow-100 text-warning';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-error';
      case 'medium':
        return 'bg-blue-100 text-primary-600';
      case 'low':
        return 'bg-green-100 text-success';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
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
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <Link to="/projects" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {getStatusText(project.status)}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{project.description}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <Edit3 className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </button>
        </div>
      </motion.div>

      {/* Project Info Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-apple shadow-apple p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 text-success mr-3">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Progress</h3>
              <p className="text-lg font-semibold text-gray-900">{project.progress}%</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-success"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-apple shadow-apple p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100 text-warning mr-3">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
              <p className="text-lg font-semibold text-gray-900">{formatDate(project.dueDate)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-apple shadow-apple p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 text-primary-600 mr-3">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Duration</h3>
              <p className="text-lg font-semibold text-gray-900">75 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-apple shadow-apple p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 text-accent-600 mr-3">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
              <p className="text-lg font-semibold text-gray-900">{project.members.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs and Content */}
      <motion.div variants={itemVariants}>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'tasks', 'timeline', 'files'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-apple shadow-apple p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Project Overview</h3>
                  <p className="text-gray-600">
                    {project.description}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
                      <p className="text-gray-900">{formatDate(project.startDate)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">End Date</h4>
                      <p className="text-gray-900">{formatDate(project.dueDate)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Status</h4>
                      <p className="text-gray-900">{getStatusText(project.status)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                      <p className="text-gray-900">High</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-apple shadow-apple p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {project.activities.map((activity) => (
                      <div key={activity.id} className="flex">
                        <div className="mr-3 flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                            <span className="text-sm font-medium">{activity.user.charAt(0)}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">{formatDateTime(activity.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-apple shadow-apple p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                    <button className="text-sm text-primary-600 hover:text-primary-800">Add Member</button>
                  </div>
                  <div className="space-y-4">
                    {project.members.map((member) => (
                      <div key={member.id} className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-apple shadow-apple p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Task Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="text-sm font-medium text-gray-900">3</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-success" style={{ width: '43%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">In Progress</span>
                      <span className="text-sm font-medium text-gray-900">2</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary-500" style={{ width: '28%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pending</span>
                      <span className="text-sm font-medium text-gray-900">2</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-warning" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-5">
              <div className="bg-white rounded-apple shadow-apple p-5">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Add a new task..."
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={handleAddTask}
                    >
                      <Plus className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    </button>
                  </div>
                  <button className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    <Filter className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  {project.tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="py-4 flex items-center hover:bg-gray-50 rounded-md -mx-2 px-2 group"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked={task.status === 'completed'}
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {task.title}
                          </p>
                          <div className="hidden group-hover:flex items-center space-x-2">
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-error">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            {task.assignee}
                          </span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {getStatusText(task.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="bg-white rounded-apple shadow-apple p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Timeline</h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {project.activities.map((activity, index) => (
                    <div key={activity.id} className="relative flex items-start">
                      <div className="absolute left-0 mt-1">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 border-4 border-white">
                          <span className="text-sm font-medium">{activity.user.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="ml-14">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{formatDateTime(activity.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="bg-white rounded-apple shadow-apple p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Project Files</h3>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                  <Paperclip className="h-4 w-4 mr-1" />
                  Upload Files
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-10 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                  <Paperclip className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No files uploaded yet</h3>
                <p className="mt-2 text-gray-500">
                  Drag and drop files here or click the upload button to add files to this project.
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Upload Files
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;