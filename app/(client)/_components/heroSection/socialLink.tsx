"use client";

import type React from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

type SocialLinkData = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

const socialData: SocialLinkData[] = [
  {
    title: "github",
    link: "https://github.com/Shovon15",
    icon: <Github size={30} />,
  },
  {
    title: "linkedin",
    link: "https://linkedin.com/in/shovon-mahamud-profile",
    icon: <Linkedin size={30} />,
  },
];

const SocialLink: React.FC = () => {
  return (
    <div className="flex gap-2">
      {socialData.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors border rounded-md p-1"
        >
          {item.icon}
          <span className="sr-only">{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default SocialLink;
