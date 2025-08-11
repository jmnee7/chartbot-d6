interface ChartsHeaderProps {
  title?: string;
  description?: string;
}

export function ChartsHeader({
  title = "실시간 차트 순위",
  description = "DAY6의 차트 순위 변동을 추적하세요.",
}: ChartsHeaderProps) {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-xs md:text-sm text-gray-500">{description}</p>
    </div>
  );
}
