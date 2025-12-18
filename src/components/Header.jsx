import { useState, useEffect, useRef } from "react";
import Menu from "./Menu";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("none");
  const [isActive, setIsActive] = useState(false);
  const { isFan, setIsFan } = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const menuLinks = [
    {
      title: "Inicio",
      path: "/",
      show_header: true,
      show_menu: true,
      open: false,
    },
    {
      title: "Música",
      path: "/music",
      show_header: true,
      show_menu: true,
      open: false,
    },
    {
      title: "Videos",
      path: "/videos",
      show_header: true,
      show_menu: true,
      open: false,
    },
    {
      title: "Tienda",
      path: "/shop",
      show_header: true,
      show_menu: false,
      open: false,
    },
    {
      title: "Tienda",
      path: "https://shop.danielospid.com",
      show_header: false,
      show_menu: true,
      open: true,
    },
    {
      title: "Apóyame",
      path: "https://paypal.me/danielospid",
      show_header: false,
      show_menu: true,
      open: true,
    },
  ];

  const handleSubscribe = () => {
    // openModal();
    window.open("#subscribe", "_self");
    setIsActive(false);
    setIsFan(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollDirection(currentPosition > scrollPosition ? "down" : "up");
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const headerStyle = {
    top: scrollDirection === "down" ? "0" : "30px",
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    }

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return (
    <>
      <header
        className="w-full h-22.5 fixed top-7.5 z-50 flex items-center justify-center bg-neutral-50 border-b border-neutral-200 transition-all duration-300 ease-out"
        style={headerStyle}
      >
        <div className="w-full max-w-300 mx-4 flex items-center justify-between gap-4">
          <div className="min-w-40 h-22.5 flex items-center justify-start">
            <a href="/" className="flex items-center justify-center">
              <img
                src="/images/logotipo.png"
                width={160}
                height={26}
                alt="Logotipo de Daniel Ospid"
                title="Logotipo de Daniel Ospid"
                loading="eager"
                // fetchpriority="high"
                className="object-cover object-center select-none pointer-events-none"
              />
            </a>
            {isActive}
          </div>
          <div className="w-full h-22.5 flex items-center justify-end">
            <nav className="h-22.5 hidden md:flex items-center justify-center">
              <ul className="h-full mx-6 flex items-center justify-center gap-5">
                {menuLinks
                  .filter((link) => link.show_header && !link.open)
                  .map((link, index) => (
                    <li
                      key={`${link.path}_${index}`}
                      className="flex items-center justify-center"
                    >
                      <a href={link.path} className="font-mono hover:underline">
                        {link.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
            <div className="w-auto h-full flex items-center justify-center pl-4 border-l border-neutral-200">
              <button
                type="button"
                ref={buttonRef}
                onClick={() => setIsActive(!isActive)}
                className="size-8 z-100 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
              >
                <div className="size-4.5 mr-px flex flex-col items-end justify-center relative">
                  <span
                    className={`block w-4.5 h-px bg-neutral-950 transform duration-300 ease-out rounded-full 
                ${
                  isActive
                    ? "-rotate-45 translate-y-px translate-x-px"
                    : "-translate-y-[5px]"
                }`}
                  />
                  <span
                    className={`block h-px bg-neutral-950 transform duration-300 ease-out rounded-full
                ${isActive ? "w-0" : "w-3"}`}
                  />
                  <span
                    className={`block w-4.5 h-px right-0 bg-neutral-950 transform duration-300 ease-out rounded-full
                ${
                  isActive
                    ? "rotate-45 -translate-y-px translate-x-px"
                    : "translate-y-[5px]"
                }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      <Menu
        isFan={isFan}
        menuRef={menuRef}
        isActive={isActive}
        menuLinks={menuLinks}
        headerStyle={headerStyle}
        setIsActive={setIsActive}
        handleSubscribe={handleSubscribe}
      />
    </>
  );
}
