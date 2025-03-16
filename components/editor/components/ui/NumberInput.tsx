import { useState } from "react";

export default function NumberInput() {
  const [value, setValue] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      setValue((prev) => prev + 1);
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      setValue((prev) => prev - 1);
      event.preventDefault();
    }
  };

  return (
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      onKeyDown={handleKeyDown}
      className="w-24 p-2 text-center border rounded-md outline-none focus:ring-2 focus:ring-blue-500 
                 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}
