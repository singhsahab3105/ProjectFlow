import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  Mail, 
  Key, 
  Save,
  Camera,
  LogOut
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setIsEditMode(false);
    // In a real app, this would call an API to update the user profile
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <div className="bg-white rounded-apple shadow-apple overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-24"></div>
            <div className="px-4 pt-0 pb-6">
              <div className="flex justify-center -mt-12">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white bg-white">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-700">
                        <span className="text-2xl font-medium">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-1 capitalize">{user?.role}</p>
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                <button
                  onClick={() => setIsEditMode(true)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-error hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Settings */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <div className="bg-white rounded-apple shadow-apple p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Account Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className={`
                        block w-full pl-10 pr-3 py-2 sm:text-sm rounded-md 
                        ${isEditMode 
                          ? 'border-gray-300 focus:ring-primary-500 focus:border-primary-500' 
                          : 'border-transparent bg-gray-50 text-gray-500'}
                      `}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className={`
                        block w-full pl-10 pr-3 py-2 sm:text-sm rounded-md 
                        ${isEditMode 
                          ? 'border-gray-300 focus:ring-primary-500 focus:border-primary-500' 
                          : 'border-transparent bg-gray-50 text-gray-500'}
                      `}
                    />
                  </div>
                </div>

                {isEditMode && (
                  <>
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Key className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="password"
                              id="currentPassword"
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Key className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="password"
                              id="newPassword"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Key className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-5">
                      <button
                        type="button"
                        onClick={() => setIsEditMode(false)}
                        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;