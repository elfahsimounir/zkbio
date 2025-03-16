import { AlignCenter, AlignRight, Text } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import { on } from "events";

const TextSwitcher = ({ onChange}: { onChange: any; }) => {
    const [option, setOption] = useState('left');

    const handleChange = (option: any) => {
        switch (option) {
            case 'left':
               onChange(option)
                setOption('center')
                break;
            case 'center':
                onChange(option)
                setOption('right')
                break;
            case 'right':
                onChange(option)
                setOption('left')
                break;
            default:
                break;
        }
    }
    return (
        <Button
            disabled={false}
            onClick={() => handleChange(option)}
        >
            {
                option === 'left' ? <Text size={16} /> : option === 'center' ? <AlignCenter size={16}/> :
                    <AlignRight size={16}/>
            }
        </Button>
    )


}
export default TextSwitcher;