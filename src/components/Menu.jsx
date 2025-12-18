import { Mail, MailCheck, SquareArrowOutUpRight } from "lucide-react";

export default function Menu(props) {
  const {
    isFan,
    menuRef,
    isActive,
    menuLinks,
    headerStyle,
    setIsActive,
    handleSubscribe,
  } = props;

  return (
    <div
      ref={menuRef}
      className={`w-full md:w-80 h-screen fixed z-40 top bg-neutral-50 md:border-l border-neutral-200 transition-all duration-300 ease-in-out ${
        isActive ? "right-0" : "-right-full md:-right-80"
      }`}
      style={headerStyle}
    >
      <div className="w-full min-h-22.5 flex items-center"></div>
      <nav className="w-full flex flex-col items-center justify-center">
        <ul className="w-full flex flex-col items-center justify-center list-none list-inside -border-t border-neutral-200">
          {menuLinks
            .filter((link) => link.show_menu)
            .map((link, index) => (
              <li
                key={index}
                className="w-full h-15 flex items-center justify-center border-b border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:underline box-content"
                onClick={() => setIsActive(false)}
              >
                {link.open ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex items-center justify-center text-base font-normal font-mono cursor-pointer duration-300 ease-out"
                    onClick={() => logEvent(analytics, "menu_link_external_")}
                  >
                    <div className="size-full px-8 md:px-10 flex items-center justify-between">
                      {link.title}
                      <SquareArrowOutUpRight size={18} strokeWidth={1.5} />
                    </div>
                  </a>
                ) : (
                  <a
                    href={link.path}
                    className="w-full h-full flex items-center justify-center text-base font-normal font-mono cursor-pointer duration-300 ease-out"
                    onClick={() =>
                      logEvent(analytics, "menu_link_internal_", link.path)
                    }
                  >
                    <div className="size-full px-8 md:px-10 flex items-center justify-between">
                      {link.title}
                    </div>
                  </a>
                )}
              </li>
            ))}
          <li className="w-full h-15 hidden items-center justify-center border-b border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:underline">
            <button
              type="button"
              className="w-full h-full flex items-center justify-center text-base font-normal font-sans cursor-pointer duration-300 ease-out"
              onClick={() =>
                handleSubscribe() +
                logEvent(analytics, "subscription_modal_show")
              }
            >
              <div className="size-full px-8 md:px-10 flex items-center justify-between">
                Suscríbete
                {isFan ? (
                  <MailCheck size={18} strokeWidth={1.5} />
                ) : (
                  <Mail size={18} strokeWidth={1.5} />
                )}
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
