import { BRAND, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            X
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            YouTube
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            Email
          </a>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {BRAND.name} Studio. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 mt-1">{BRAND.footerTag}</p>
        </div>
      </div>
    </footer>
  );
}
