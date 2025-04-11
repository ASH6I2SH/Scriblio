import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground w-full text-sm border-t">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-center text-center gap-1">
        © Copyright 2024 | Designed & Developed By:{" "}
        <a
          href="https://ash6i2sh.github.io/fsd-Documentation/"
          className="font-semibold text-[#7420E6] hover:underline"
        >
          Ashish Pandey
        </a>
      </div>
    </footer>
  );
};

export default Footer;
