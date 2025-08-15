"use client";

import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ExternalLink,
  ShoppingBag,
  Radio,
  Music,
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
    name: "음총팀 유튜브",
    url: "https://youtube.com/@day6_stream?si=Z2HBzbbAJgaNM4LM",
    icon: Youtube,
    color: "hover:text-red-600",
  },
  {
    name: "Fans Community",
    url: "https://day6.jype.com",
    icon: ExternalLink,
    color: "hover:text-purple-500",
  },
  {
    name: "Shop",
    url: "https://app.fans/shop/day6",
    icon: ShoppingBag,
    color: "hover:text-green-500",
  },
  {
    name: "뮤직웨이브 채널",
    url: "https://kko.kakao.com/q2UMCC03-4",
    icon: Music,
    color: "hover:text-yellow-500",
  },
  {
    name: "스테이션헤드 채널",
    url: "https://stationhead.com/day6strmteam",
    icon: Radio,
    color: "hover:text-indigo-500",
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
