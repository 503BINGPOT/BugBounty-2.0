import { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  getUser,
  logout,
} from "../../utils/auth";


const Navbar = () => {

  const notificationRef =
  useRef(null);

  const [notifications,
  setNotifications] =
  useState([]);

const [showNotifications,
  setShowNotifications] =
  useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const user = getUser();

  const authenticated = !!user;

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Bounties",
    path: "/bounties",
  },
  {
    name: "Repositories",
    path: "/repositories",
  },
];

  useEffect(() => {

    setMenuOpen(false);

  }, [location.pathname]);

  useEffect(() => {

  if (!user) return;

  const fetchNotifications =
    async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/notifications/${user.id}`
          );

        setNotifications(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  fetchNotifications();

}, []);

useEffect(() => {

  const handleClickOutside =
    (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {

        setShowNotifications(
          false
        );

      }

    };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

  };

}, []);

  const handleLogout = () => {

    logout();

    navigate("/login", {
      replace: true,
    });

  };

  

  return (

    <header
      className="
        fixed top-0 left-0
        w-full z-[9999]
        border-b border-white/10
        bg-black
      "
    >

      <div
        className="
          h-[58px]
          px-5
          max-w-[1600px]
          mx-auto
          flex items-center justify-between
        "
      >

        {/* LEFT */}
        <Link
          to="/"
          className="
            flex items-center gap-2
            min-w-[180px]
          "
        >

          {/* LOGO */}
          <div
            className="
              w-8 h-8
              rounded-lg
              bg-white
              text-black
              flex items-center justify-center
              font-bold
              text-[15px]
            "
          >
            B
          </div>

          {/* BRAND */}
          <div className="flex items-center gap-2">

            <h1
              className="
                text-[18px]
                font-semibold
                tracking-tight
              "
            >
              BountyHub
            </h1>

            <span
              className="
                text-[10px]
                text-gray-500
                mt-[2px]
              "
            >
              v0.1
            </span>

          </div>

        </Link>

        {/* CENTER NAV */}
        {authenticated && (

          <div
            className="
              hidden md:flex
              items-center gap-14
              absolute left-1/2
              -translate-x-1/2
            "
          >

            {navItems.map((item) => {

              const active =
                location.pathname === item.path;

              return (

                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    text-[15px]
                    transition-all duration-200
                    ${
                      active
                        ? "text-white"
                        : "text-gray-500 hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </Link>

              );

            })}

          </div>

        )}

        {/* RIGHT */}
        <div
          className="
            flex items-center gap-4
            min-w-[180px]
            justify-end
          "
        >

          {!authenticated ? (

            <div
              className="
                hidden md:flex
                items-center gap-4
              "
            >

              <Link
                to="/login"
                className="
                  text-[14px]
                  text-gray-300
                  hover:text-white
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-white
                  text-black
                  px-4 py-2
                  rounded-xl
                  text-[14px]
                  font-medium
                "
              >
                Get Started
              </Link>

            </div>

          ) : (

            <div
              className="
                hidden md:flex
                items-center gap-4
              "
            >

              {/* BELL */}
              <div
  ref={notificationRef}
  className="relative"
>

  <button
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
  >
  {notifications.length > 0 && (

  <span
    className="
      absolute
      -top-2
      -right-2
      bg-red-500
      text-white
      text-[10px]
      w-4
      h-4
      rounded-full
      flex
      items-center
      justify-center
    "
  >
    {notifications.length}
  </span>

)}
    <Bell size={18} />
  </button>

{showNotifications && (

  <div
    className="
      absolute
      right-0
      top-10
      w-80
      bg-black
      border border-white/10
      rounded-xl
      p-4
      z-50
    "
  >

    <h3 className="mb-3 font-medium">
      Notifications
    </h3>

    {notifications.length === 0 ? (

      <p className="text-gray-500">
        No notifications
      </p>

    ) : (

      notifications.map(

        notification => (

          <div
            key={notification.id}
            className="
              border-b
              border-white/10
              py-3
            "
          >

            <p className="text-sm">
              {notification.message}
            </p>

          </div>

        )

      )

    )}

  </div>

)}

</div>

              {/* USER */}
<Link
  to="/profile"
  className="
    flex items-center gap-2
    hover:opacity-80
    transition
  "
>

  <img
    src={
      user?.avatar ||
      "https://github.com/github.png"
    }
    alt="avatar"
    className="
      w-8 h-8
      rounded-full
      object-cover
    "
  />

  <span
    className="
      text-[14px]
      text-gray-200
      hover:text-white
      transition
    "
  >
    {user?.username}
  </span>

</Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="
                  text-gray-500
                  hover:text-red-400
                  transition
                "
              >

                <LogOut size={18} />

              </button>

            </div>

          )}

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              md:hidden
              text-white
            "
          >

            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div
          className="
            md:hidden
            border-t border-white/10
            bg-black
            px-5 py-5
          "
        >

          {authenticated ? (

            <div className="flex flex-col gap-4">

              {navItems.map((item) => {

                const active =
                  location.pathname === item.path;

                return (

                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      text-[15px]
                      ${
                        active
                          ? "text-white"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {item.name}
                  </Link>

                );

              })}

              <div
                className="
                  flex items-center gap-3
                  pt-4 mt-4
                  border-t border-white/10
                "
              >

                <img
  src={
    user?.avatar ||
    "https://github.com/github.png"
  }
  alt="avatar"
  className="
    w-8 h-8
    rounded-full
    object-cover
  "
/>

                <span className="text-[14px]">
                  {user?.username}
                </span>

              </div>

              <button
                onClick={handleLogout}
                className="
                  flex items-center gap-2
                  text-red-400
                  mt-2
                  text-[14px]
                "
              >

                <LogOut size={16} />

                Logout

              </button>

            </div>

          ) : (

            <div className="flex flex-col gap-4">

              <Link
                to="/login"
                className="
                  text-[14px]
                  text-gray-300
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-white
                  text-black
                  px-4 py-3
                  rounded-xl
                  text-[14px]
                  font-medium
                  text-center
                "
              >
                Get Started
              </Link>

            </div>

          )}

        </div>

      )}

    </header>

  );

};

export default Navbar;