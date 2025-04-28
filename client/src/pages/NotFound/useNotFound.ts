import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useGlobal";

export const useNotFound = () => {
  const { showToastMsg } = useToast();

  const [snake, setSnake] = useState<any>([
    {
      x: Math.floor(Math.random() * 30 + 1),
      y: Math.floor(Math.random() * 30 + 1),
    },
  ]);
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * 30 + 1),
    y: Math.floor(Math.random() * 30 + 1),
  });
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const handleKey = (e: any) => {
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  useEffect(() => {
    const moveSnake = () => {
      if (!direction) return;

      const head = { ...snake[0] };

      if (direction === "UP") head.y--;
      if (direction === "DOWN") head.y++;
      if (direction === "LEFT") head.x--;
      if (direction === "RIGHT") head.x++;

      if (
        head.x <= 0 ||
        head.x > 30 ||
        head.y <= 0 ||
        head.y > 30 ||
        snake.some((el: any) => el.x === head.x && el.y === head.y)
      ) {
        showToastMsg("Game Over 🎮🎮🎮", "ERROR");
        setDirection("");
        setSnake([
          {
            x: Math.floor(Math.random() * 30 + 1),
            y: Math.floor(Math.random() * 30 + 1),
          },
        ]);
        return;
      }

      const newSnake = [head, ...snake];

      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 30 + 1),
          y: Math.floor(Math.random() * 30 + 1),
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [direction, snake, showToastMsg]);

  return {
    snake,
    food,
    direction,
    setDirection,
  };
};
