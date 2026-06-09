import { BRAND, SOCIAL_LINKS } from "@/lib/constants";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#060610]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="text-white font-light text-xl tracking-brand mb-2">
              {BRAND.name}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              {BRAND.subtitle}. AI-powered full-stack development studio building production-ready digital products.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-widest">
              Explore
            </h4>
            <nav className="space-y-2" aria-label="Footer navigation">
              <a href="#services" className="text-xs text-gray-500 hover:text-white transition-colors block">Services &amp; Pricing</a>
              <a href="#portfolio" className="text-xs text-gray-500 hover:text-white transition-colors block">Portfolio</a>
              <a href="#tech-stack" className="text-xs text-gray-500 hover:text-white transition-colors block">Tech Stack</a>
              <a href="#about" className="text-xs text-gray-500 hover:text-white transition-colors block">About</a>
              <a href="#contact" className="text-xs text-gray-500 hover:text-white transition-colors block">Contact</a>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-widest">
              Connect
            </h4>
            <SocialLinks
              className="flex flex-col gap-2"
              iconClassName="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
              showLabels
            />
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {year} {BRAND.name} Studio. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            {BRAND.footerTag}
          </p>
        </div>

        <p className="text-center text-[10px] text-gray-700 mt-6" aria-hidden="true">
          {SOCIAL_LINKS.github.replace("https://", "")} · {SOCIAL_LINKS.twitter.replace("https://", "")}
        </p>
      </div>
    </footer>
  );
}
