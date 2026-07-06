"use client";
type StarsRatingProps = {
  value: number; 
  onChange: (value: number) => void;
  max?: number; 
  size?: number; 
  readOnly?: boolean;
  className?: string;
  label?: string; 
};

const StarIcon = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={filled ? "text-yellow-400" : "text-gray-300"}
  >
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.789 1.402 8.173L12 18.897l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z" />
  </svg>
);

export default function StarsRating({ value, onChange, max = 5, size = 20, readOnly = false, className = "", label = "Rating" }: StarsRatingProps) {
  // keyboard handler on each star (we treat the set as a radiogroup)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (readOnly) return;
    const key = e.key;
    if (key === "ArrowRight" || key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(max, value + 1);
      onChange(next);
      // move focus to the new item will be done by browser if you manage focus manually (optional)
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(0, value - 1);
      onChange(prev);
    } else if (key === "Home") {
      e.preventDefault();
      onChange(0);
    } else if (key === "End") {
      e.preventDefault();
      onChange(max);
    } else if (key === "Enter" || key === " ") {
      e.preventDefault();
      onChange(idx + 1);
    }
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* Radiogroup semantics */}
      <div role="radiogroup" aria-label={label} className="inline-flex gap-1" aria-readonly={readOnly || undefined}>
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const filled = starValue <= value;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={filled}
              aria-label={`${starValue} ${starValue === 1 ? "star" : "stars"}`}
              disabled={readOnly}
              className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                readOnly ? "cursor-default" : "cursor-pointer hover:scale-105 active:scale-95"
              }`}
              onClick={() => !readOnly && onChange(starValue)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              <span className="sr-only">{starValue}</span>
              <StarIcon filled={filled} size={size} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
