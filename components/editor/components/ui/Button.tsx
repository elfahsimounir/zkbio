type ButtonProps = {
    onClick: () => void;
    disabled: boolean;
   children?: React.ReactNode;
   className?: string;
}


const Button = (props: ButtonProps) => {
  
    return (
        <button
        className={`${props.className} p-1 rounded hover:bg-neutral-100 border border-transparent hover:border-neutral-200 ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
}
export default Button;