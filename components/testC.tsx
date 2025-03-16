const elements = [
  {
    name: "Name",
    key: "button_1",
    type: "type",
    placeHolder: "enter name",
    style: 'col-span-6'
  },
  {
    name: "Email",
    key: "button_2",
    type: "email",
    placeHolder: "enter email",
    style: 'col-span-6'
  },
  {
    name: "Phone",
    key: "button_3",
    type: "tel",
    placeHolder: "enter phone number",
    style: 'col-span-6'
  },
  {
    name: "Address",
    key: "button_4",
    type: "text",
    placeHolder: "enter address",
    style: 'col-span-6'
  },
  {
    name: "City",
    key: "button_5",
    type: "text",
    placeHolder: "enter city",
    style: 'col-span-6'
  },
  {
    name: "Country",
    key: "button_6",
    type: "text",
    placeHolder: "enter country",
    style: 'col-span-6'
  }
];


const TestC = () => {



  return (
    <div className="w-[400px] flex flex-col items-center h-[600px] border border-black/5 shadow shadow/10 rounded-md p-4">
      <h3 className="mb-3">Add new guest</h3>
      <div className="grid">
        <div className="flex flex-col gap-1">

            {elements.map((element) => (
                <div key={element.key} className={`flex flex-col gap-1 ${element.style} `}>
                <label className="text-sm">{element.name}</label>
                <input className="px-2 py-1 outline-none border rounded-lg" type={element.type} placeholder={element.placeHolder} />

                </div>
            ))}
        </div>
      </div>


      <button className="relative px-2 my-7 py-1 text-xs overflow-hidden border rounded-lg group">
        <span className="absolute inset-0 bg-neutral-400 transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0 z-[-1]"></span>
        <span className="relative z-10">Add guest</span>
      </button>
    </div>
  );
}

export default TestC;