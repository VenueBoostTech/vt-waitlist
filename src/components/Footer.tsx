// components/Footer.tsx
import Image from "next/image";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="border-t dark:border-gray-800 py-8">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 flex items-center justify-between">
        <Image
          src={theme === 'dark' ? "/images/logo/logo-light.svg" : "/images/logo/logo.svg"}
          alt="VisionTrack"
          width={120}
          height={30}
        />
        <div className="text-sm text-[#6B7280] dark:text-gray-400">
          © {new Date().getFullYear()} VisionTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;