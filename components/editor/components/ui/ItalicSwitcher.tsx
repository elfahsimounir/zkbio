import { Italic } from "lucide-react";
import { useState } from "react";

type ButtonProps = {
    onClick: any
}

const ItalicSwitcher = (props: ButtonProps) => {
      const [style, setStyle] = useState('normal');

    const handleChange = (style: any) => {
        switch (style) {
            case 'normal':
                setStyle('italic')
                break;
            case 'italic':
                setStyle('normal')
                break;
            default:
                break;
        }
        props.onClick('fontStyle',style)
    }

    return (
        <button
        className={`${style==='normal'?'border-neutral-200':''} p-1 rounded hover:bg-neutral-100 border border-transparent  hover:border-neutral-200`}
        onClick={() => handleChange(style)}
      >
         <Italic size={15} />
      </button>
    )
}
export default ItalicSwitcher;