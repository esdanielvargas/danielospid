import { useEffect, useState } from "react";

export default function TopBar() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    {
      state: true,
      text: "¡Bienvenidos a mi sitio web, creado con ♡ para ustedes!",
    },
    {
      state: true,
      text: "Explora mi música y proyectos más recientes aquí.",
      path: "/music",
    },
    {
      state: true,
      text: "Gracias por visitar mi sitio web oficial.",
    //   path: "/",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="w-full h-7.5 fixed top z-45 flex items-center justify-center bg-neutral-950">
      <div className="size-full max-w-300 mx-4 flex items-center justify-center">
        <div className="w-full flex">
          {messages
            .filter((item) => item.state)
            .map((message, index, self) => {
              if (
                message.path &&
                message.newPage === true &&
                message.link.startsWith("https://")
              ) {
                return (
                  <a
                    key={index}
                    href={message.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`min-w-full items-center justify-center text-neutral-50 text-center text-xs font-mono hover:underline cursor-pointer ${
                      self.length === 1 || currentMessage === index
                        ? "flex opacity-100"
                        : "hidden opacity-0"
                    }`}
                  >
                    {message.text}
                  </a>
                );
              } else if (message.path) {
                return (
                  <a
                    key={index}
                    href={message.path}
                    className={`min-w-full items-center justify-center text-neutral-50 text-center text-xs font-mono hover:underline cursor-pointer ${
                      self.length === 1 || currentMessage === index
                        ? "flex opacity-100"
                        : "hidden opacity-0"
                    }`}
                  >
                    {message.text}
                  </a>
                );
              } else {
                return (
                  <span
                    key={index}
                    className={`min-w-full items-center justify-center text-neutral-50 text-center text-xs font-mono transition-all duration-300 ease-out ${
                      self.length === 1 || currentMessage === index
                        ? "flex opacity-100"
                        : "hidden opacity-0"
                    }`}
                  >
                    {message.text}
                  </span>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}
// <div class="w-full h-7.5 fixed top z-45 flex items-center justify-center bg-neutral-950">
//   <div class="size-full max-w-300 mx-4 flex items-center justify-center">
//     <p class="text-amber-50 text-center text-xs font-mono">
//       {messages[0 | Math.floor(Math.random() * messages.length)]}
//     </p>
//   </div>
// </div>
