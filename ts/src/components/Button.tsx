export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | " submit" | "reset";
  bgColor?: "orange" | "black" | "gray" | "red";
  size?: "sm" | "md" | "lg";
}

function Button({
  children,
  type = "button",
  bgColor = "orange",
  size = "md",
  ...rest
}: ButtonProps) {
  let btnColor = {
    gray: `bg-gray-900`,
    orange: "bg-orange-500",
    red: "bg-red-500",
  };
  let btnSize = {
    sm: "py-1 px-2 text-sm",
    md: "py-1 px-4 text-base",
    lg: "py-2 px-6 text-lg",
  };

  return (
    <button
      type={type}
      className={`${btnColor[bgColor]} ${btnSize[size]} text-white font-semibold ml-2 text-base hover:bg-amber-400 rounded`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
