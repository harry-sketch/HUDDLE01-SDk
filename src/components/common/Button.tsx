import { useHuddle01Web } from "@huddle01/react/hooks";

interface Props {
  children: string | JSX.Element | React.ReactNode;
  className?: string;
  event: string;
}

const Button: React.FC<Props> = ({ children, className, event }) => {
  const { send } = useHuddle01Web();

  return (
    <button
      type="button"
      onClick={() => send(event)}
      className={`glassButton h-10 w-auto flex items-center justify-center text-sm rounded-xl font-bold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
