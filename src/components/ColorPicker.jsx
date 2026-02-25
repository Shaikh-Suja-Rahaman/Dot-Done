import React from "react";


const ColorPicker = ({onColorSelect, onClose, position}) => {

  const colors = [
  '#6FB269', // Pastel Green (original)
  '#F28B82', // Soft Red
  '#9FD9D3', // Pastel Turquoise
  '#8CC9DE', // Pastel Blue
  '#BBA5D6', // Pastel Purple
  '#F6E58D', // Soft Yellow
  '#F3B781', // Pastel Orange
  '#FFC5D3', // Light Pink
];


  return (
    <div
      className="absolute bg-[#1a1a1a] backdrop-blur-md p-3 shadow-2xl border border-zinc-700 z-50 color-picker"
      style={{ top: position.y, left: position.x }}
    >
      <div className="grid grid-cols-4 gap-2 p-2">
        {colors.map((color) => (
          <button
            key={color}
            className="w-8 h-8 hover:scale-110 transition-transform duration-150 hover:shadow-lg border border-zinc-700 hover:border-zinc-500"
            style={{ backgroundColor: color }}
            onClick={() => {
              onColorSelect(color);
              onClose();
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorPicker