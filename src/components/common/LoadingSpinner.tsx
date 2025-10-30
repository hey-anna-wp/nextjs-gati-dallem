type Props = {
  size?: number;
  color?: string;
  durationMs?: number;
  gap?: number;
  amplitude?: number;
};

const LoadingSpinner: React.FC<Props> = ({
  size = 14,
  color = "var(--color-purple-500)",
  durationMs = 450,
  gap = 8,
  amplitude = 8,
}) => {
  const dots = [0, 1, 2];
  const phase = durationMs / 2;

  return (
    <div
      role="status"
      aria-label="로딩 중"
      style={{ columnGap: gap }}
      className="flex items-center justify-center"
    >
      {dots.map((i) => (
        <span
          key={i}
          className="[animation:syncOpposite_var(--dur)_ease-in-out_infinite] rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            animationDelay: `${i * (phase / 2)}ms`,
            transformOrigin: "center",
            ["--dur" as any]: `${durationMs}ms`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
