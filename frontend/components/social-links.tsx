"use client";

import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/DAY6kilogram",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/DAY6Official",
    icon: Twitter,
    color: "hover:text-blue-400",
  },
  {
    name: "Facebook",
    url: "http://facebook.com/DAY6Official",
    icon: Facebook,
    color: "hover:text-blue-600",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/DAY6Official",
    icon: Youtube,
    color: "hover:text-red-500",
  },
  {
    name: "Fans Community",
    url: "https://app.fans/community/day6/artist",
    icon: ExternalLink,
    color: "hover:text-purple-500",
  },
  {
    name: "Shop",
    url: "https://app.fans/shop/day6",
    icon: ShoppingBag,
    color: "hover:text-green-500",
  },
];

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-muted transition-colors ${social.color}`}
            title={social.name}
          >
            <Icon className="w-5 h-5" />
          </Link>
        );
      })}
    </div>
  );
}
