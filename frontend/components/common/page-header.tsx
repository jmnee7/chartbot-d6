"use client";

import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { ShareButton } from "@/components/guide/share-button";

interface PageHeaderProps {
  title: string;
  description?: string;
  date?: string;
  externalLink?: string;
  children?: React.ReactNode;
  enableShare?: boolean;
  shareSlug?: string;
}

export function PageHeader({
  title,
  description,
  date,
  externalLink,
  children,
  enableShare = false,
  shareSlug = "",
}: PageHeaderProps) {
  const currentDate =
    date ||
    new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(new Date())
      .replace(/\. /g, ".")
      .replace(/\.$/, "");

  return (
    <header className="sticky top-0 z-30 bg-white pb-3 pt-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
        </div>
        {enableShare ? (
          <ShareButton title={title} slug={shareSlug} />
        ) : externalLink ? (
          <Link
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="관련 링크 열기"
            className="rounded p-2 hover:bg-gray-100"
          >
            <LinkIcon className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-hidden className="p-2" />
        )}
      </div>
      <p className="text-xs text-gray-500">{description || currentDate}</p>
      {children}
    </header>
  );
}
