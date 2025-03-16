import { PaintBucket, Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ handleChange,value }: { handleChange: any;value:any}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [state, updateState] = useState('#fffff');
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const handleInput = (e:any) => {
    updateState(e.target.value);
    handleChange(e);
  };
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={togglePicker}
        // style={{ borderColor: value ,borderWidth:'2px'}
      className={` cursor-pointer p-1 rounded hover:bg-neutral-100 border  border-transparent`}
        title="Change Column Background Color"
      >
        <span
        style={{ backgroundColor: value }}
        className="w-4 h-4 border flex rounded-full">

        </span>
      </button>
      {showPicker && (
        <div
        onBlur={() => setShowPicker(false)}
        className="absolute z-[20] top-0 translate-y-[15%]  -translate-x-[30%] bg-white p-2 shadow-md rounded-md">
          <ColorInput onChange={handleInput} value={state} />
            <div className="flex flex-col space-y-2 mt-2">
            {[
              ['#ffffff', '#e5e7eb', '#B8E986'],
              ['#F5A623', '#F8E71C', '#8B572A'],
              ['#BD10E0', '#9013FE', '#D0021B'],
              ['#417505', '#7ED321', '#F8E71C'],
              ['#50E3C2', '#4A90E2', '#9013FE']
            ].map((theme, index) => (
              <div key={index} className="flex space-x-2">
              {theme.map((color) => (
              <span
              key={color}
              onClick={() => {
                updateState(color);
                handleChange({ target: { value: color } });
              }}
              style={{ backgroundColor: color }}
              className="w-6 h-6 border rounded-full cursor-pointer"
              ></span>
              ))}
              </div>
            ))}
            </div>
        </div>
      )}
    </div>
  );
};
const ColorInput = (props:any) => {
    return (
      <div className="inline-flex items-center w-[90px] p-1 bg-[#EDEDED] border border-gray-100 rounded-md">
       <div className="relative">
        <input
        id="hx"
          type="color"
          className=" appearance-none relative [&::-webkit-inner-spin-button]:appearance-none outline-none border-none right-0 [&::-webkit-outer-spin-button]:appearance-none rounded-full overflow-hidden cursor-pointer bg-none w-[20px] h-[15px] p-0"
          {...props}
       />
        <div onClick={()=>{(document.querySelector('#hx') as HTMLInputElement).click()}} className="absolute hover:bg-neutral-100 cursor-pointer  z-10 top-0 right-0 w-full h-full bg-white rounded-full flex items-center justify-center">
        <Palette  size={16}/>
        </div>
       </div>

         
        
        <input
          type="text"
          className="border-none ml-2  !tracking-widest bg-transparent w-full text-sm focus:outline-none"
          {...props}
        />
      </div>
    );
  };

export default ColorPicker;