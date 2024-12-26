const Button = ({
  children,
  classname,
  type = "button",
  onClick,
  Disabled = false,
}) => {
  return (
    <button
      className={`bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 text-white font-semibold rounded ${classname} ${
        Disabled && "bg-slate-500 cursor-not-allowed"
      }`}
      type={type}
      onClick={onClick}
      disabled={Disabled}
    >
      {children}
    </button>
  );
};

export default Button;
