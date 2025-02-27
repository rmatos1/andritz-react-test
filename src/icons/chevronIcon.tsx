export interface ChevronIconProps {
  fill: string;
  isInverted?: boolean;
}

export const ChevronIcon = ({ fill, isInverted }: ChevronIconProps) => (
  <svg
    height="16"
    viewBox="0 0 512 512"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isInverted ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <title />
    <polyline
      points="184 112 328 256 184 400"
      style={{
        fill: "none",
        stroke: fill,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "48px",
      }}
    />
  </svg>
);
