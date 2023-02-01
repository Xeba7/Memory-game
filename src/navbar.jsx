import Github from "./github";
import Linkedin from "./linkedin";

export default function Navbar() {
  return (
    <nav className="flex  justify-end md:gap-5 fill-black md:p-0 px-2">
      <a
        href="https://github.com/Xeba7/Memory-game"
        target="_black"
        className="cursor-pointer hover:scale-105 transform-origin-center"
        alt="icono de Github"
      >
        <Github />
      </a>
      <a
        href="https://cl.linkedin.com/in/sebasti%C3%A1n-cisterna-reyes-111a67256"
        target="_black"
        className="cursor-pointer hover:scale-[103%]  transform-origin-center py-1"
        alt="icono de linkedin"
      >
        <Linkedin />
      </a>
    </nav>
  );
}
