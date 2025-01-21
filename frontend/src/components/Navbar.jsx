import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, User, Calendar, LogOut } from 'lucide-react';
import { assets } from "../assets/assets";
import { AppContext } from '../context/AppContext';
import AQIButton from './AqiButton';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [aqi, setAqi] = useState(54);

  const pincode = userData.pincode;


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : 'unset';
  }, [showMenu]);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');

  };

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Find Doctors' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/medicinescanner', label: 'Scan my Med' }
  ];

  const notifications = [
    { id: 1, text: 'Appointment confirmed with Dr. Smith', time: '2 mins ago' },
    { id: 2, text: 'Reminder: Upcoming appointment tomorrow', time: '1 hour ago' },
  ];


  return (
    <>
      <div className="h-24 md:h-24"></div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-lg'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28 md:h-24">
            <div
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 cursor-pointer group relative"
            >
              <img
                src={assets.mainLogo}
                alt="MediSync Logo"
                className="w-28 h-28 object-contain group-hover:scale-105 transition-transform duration-200 overflow-hidden "
              />
              <span className="text-2xl font-bold text-black tracking-tight hover:text-gray-800 transition-colors group-hover:z-10">
                ChiranJivi
              </span>
            </div>



            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-gray-600 ${isActive ? 'text-primary' : 'text-gray-700'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-300 transform origin-left transition-transform duration-200 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center space-x-6">





              {/* <h1 className='bg-slate-200 py-2 px-3 rounded-lg'>AQI : {aqi}</h1> */}
              {/* <AQIButton className='bg-slate-800 py-2 px-3 rounded-lg'/> */}
              <div>
                <AQIButton pincode={pincode} />
              </div>






              {token ? (
                <>
                  <div className="relative hidden md:block">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 rounded-full bg-purple-300 hover:bg-purple-800 relative transition-colors duration-200"
                    >
                      <Bell className="w-5 h-5 text-white" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </button>

                    {showNotifications && (
                      <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-purple-50 cursor-pointer"
                          >
                            <p className="text-sm text-gray-600">{notification.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative hidden md:block group">

                    <button className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-purple-500 transition-colors duration-200">
                      <div className="relative">
                        <img
                          src={userData.image}
                          alt="Profile"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-300"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                      </div>
                      <ChevronDown className="w-4 h-4 text-white group-hover:text-purple-200 transition-colors" />
                    </button>

                    <div className=" absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{userData.email}</p>
                      </div>
                      <button
                        onClick={() => navigate('/my-profile')}
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 w-full text-left"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => navigate('/my-appointments')}
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 w-full text-left"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>My Appointments</span>
                      </button>
                      <div className=" border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={logout}
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-purple-500  text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-purple-400 transition-all duration-200 shadow-lg shadow-purple-300 hover:shadow-purple-200 hover:-translate-y-0.5 hidden md:block"
                >
                  Get Started
                </button>
              )}


              <button
                onClick={() => setShowMenu(true)}
                className="md:hidden p-2 rounded-lg text-gray-500 transition-colors duration-200"
              >
                <Menu className="w-6 h-6 text-purple-600" />
              </button>
            </div>
          </div>
        </div>

        <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
          <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 transform ${showMenu ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <img
                  src={assets.logo}
                  alt="MediSync Logo"
                  className="w-12 h-12 object-contain"
                />
                <span className="text-xl font-bold text-purple-700 tracking-tight">
                  MediSync
                </span>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-lg hover:bg-purple-50 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-purple-600" />
              </button>
            </div>

            <div className="py-6 px-4 space-y-1.5">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg text-base font-medium ${isActive ? 'bg-purple-600 text-white' : 'text-gray-800 hover:bg-purple-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="px-4 pt-8 pb-4 border-t border-gray-200">
              {token ? (
                <button
                  onClick={logout}
                  className="w-full bg-red-50 text-red-600 px-6 py-3 rounded-lg font-medium text-base hover:bg-red-100 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-purple-400 transition-all duration-200 shadow-lg shadow-purple-300 hover:shadow-purple-200 hover:-translate-y-0.5"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
