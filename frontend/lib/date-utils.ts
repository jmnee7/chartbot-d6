export function formatKoreanDate(date: Date = new Date()): string {
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, ".")
    .replace(/ /g, "");
}

export function formatKoreanDateTime(date: Date = new Date()): string {
  const dateStr = formatKoreanDate(date);
  const timeStr = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${dateStr} ${timeStr}`;
}