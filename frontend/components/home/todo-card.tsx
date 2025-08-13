"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink } from "lucide-react";
import { TodoItem } from "@/lib/types";

const todos: TodoItem[] = [
  {
    id: "1",
    title: "멜론 스트리밍",
    description: "24시간 차트 반영을 위한 스트리밍",
    completed: false,
    icon: "🎵",
  },
  {
    id: "2",
    title: "지니 좋아요",
    description: "일간 차트 순위 상승",
    completed: false,
    icon: "❤️",
  },
  {
    id: "3",
    title: "MV 스트리밍",
    description: "YouTube 조회수 증가",
    completed: false,
    icon: "📺",
  },
  {
    id: "4",
    title: "음방 사전투표",
    description: "엠카운트다운 투표 참여",
    completed: false,
    icon: "🗳️",
  },
  {
    id: "5",
    title: "SNS 홍보",
    description: "해시태그와 함께 응원 메시지 작성",
    completed: false,
    icon: "📱",
  },
];

export default function TodoCard() {
  const [todoItems, setTodoItems] = useState(todos);

  const toggleTodo = (id: string) => {
    setTodoItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = todoItems.filter((item) => item.completed).length;
  const progress = (completedCount / todoItems.length) * 100;

  return (
    <Card className="p-4 md:p-5">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-sm md:text-base">
            {completedCount}/{todoItems.length} 완료
          </Badge>
        </div>

        <Progress value={progress} className="h-2 md:h-3 mb-4" />

        <div className="space-y-2 md:space-y-3">
          {todoItems.map((item) => (
            <div
              key={item.id}
              className={`group flex items-center gap-3 p-3 md:p-4 rounded-lg border transition-colors ${
                item.completed
                  ? "bg-gray-50 border-gray-200"
                  : "border-gray-100 hover:bg-gray-50"
              }`}
            >
              <Checkbox
                id={item.id}
                checked={item.completed}
                onCheckedChange={() => toggleTodo(item.id)}
                className="md:scale-110"
              />
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={item.id}
                  className={`block text-sm md:text-base font-medium cursor-pointer ${
                    item.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  <span className="mr-2 text-base md:text-lg">{item.icon}</span>
                  {item.title}
                </label>
                {item.description && (
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center">
                <ExternalLink className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
