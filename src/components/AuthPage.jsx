import { useState } from "react";
import { Eye, EyeOff, User, Lock, Mail, ArrowRight } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle authentication here
    console.log("Submitting:", formData);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Reset form data when switching modes
    setFormData({
      email: "",
      username: isLogin ? "" : formData.username,
      password: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-gray-900 text-white overflow-hidden">
      {/* Left panel - Auth form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-400">
              {isLogin
                ? "Sign in to access your account"
                : "Sign up to get started with coding"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    placeholder="username"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full pl-10 pr-10 p-2.5 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-500 hover:text-gray-300"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="text-gray-500 hover:text-gray-300"
                    />
                  )}
                </button>
              </div>
              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-white transition-all duration-200"
            >
              {isLogin ? "Sign In" : "Sign Up"}
              <ArrowRight size={18} />
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="ml-1 text-green-500 hover:underline focus:outline-none"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right panel - Promotional area */}
      <div className="hidden md:flex md:w-1/2 bg-gray-800 h-full">
        <div className="flex flex-col items-center justify-center w-full p-8 lg:p-12">
          <div className="max-w-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Code Anywhere, Anytime</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join our coding platform and take your programming skills to the
              next level
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900 p-5 rounded-lg">
                <h3 className="font-bold mb-2">Multi-language Support</h3>
                <p className="text-gray-400">
                  JavaScript, Python, Java, C++, and more!
                </p>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg">
                <h3 className="font-bold mb-2">Interactive Challenges</h3>
                <p className="text-gray-400">
                  Practice with real-world coding problems
                </p>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg">
                <h3 className="font-bold mb-2">Collaborative Editing</h3>
                <p className="text-gray-400">
                  Code together in real-time with team members
                </p>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg">
                <h3 className="font-bold mb-2">Cloud Saves</h3>
                <p className="text-gray-400">
                  Access your projects from any device
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
