import { BRAND } from "@/lib/constants";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <SocialLinks className="flex items-center gap-6" iconClassName="text-gray-500 hover:text-white transition-colors text-sm" />

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
