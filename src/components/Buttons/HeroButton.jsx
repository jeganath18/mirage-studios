import React from "react";
import { ArrowUpRight } from "lucide-react";

const HeroButton = ({
  children = "Get Started",
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    } else {
      window.location.href = "https://mirage-studios.com/contact";
    }
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 whitespace-nowrap
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        disabled:pointer-events-none disabled:opacity-50
        [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
        bg-primary text-primary-foreground shadow hover:bg-primary/90
        relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14
        group transition-all duration-500
        hover:ps-14 hover:pe-6
        w-fit overflow-hidden cursor-pointer
        ${className}
      `}
    >
      <span className="relative z-10 transition-all duration-500">
        {children}
      </span>

      <span
        className="
          absolute right-1 w-10 h-10
          bg-background text-foreground rounded-full
          flex items-center justify-center
          transition-all duration-500
          group-hover:right-[calc(100%-44px)]
          group-hover:rotate-45
        "
      >
        <ArrowUpRight size={16} strokeWidth={2} />
      </span>
    </button>
  );
};

export default HeroButton;
