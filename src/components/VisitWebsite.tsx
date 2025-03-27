import logoIcon from "../assets/images/logo-icon.svg";

export default function VisitWebsite() {
  return (
    <section className="pb-20 px-4">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-90 transition-opacity duration-200"
        aria-label="Visit Website to view more"
      >
        <div className="flex justify-center w-full border border-ui-primary bg-ui-light-green p-2 rounded-lg items-center cursor-pointer">
          <img
            src={logoIcon.src}
            alt="Primathon Logo"
            className="h-10 w-10 mr-1.5"
            width="40"
            height="40"
          />
          <span>Visit Website to view more</span>
        </div>
      </a>
    </section>
  );
}