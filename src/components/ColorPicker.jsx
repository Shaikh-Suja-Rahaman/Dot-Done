import React from "react";


const ColorPicker = ({onColorSelect, onClose, position}) => {

  const colors = [
    '#6FB269', // Default green
    '#FF6B6B', // Red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Blue
    '#9B59B6', // Purple
    '#F1C40F', // Yellow
    '#E67E22', // Orange
  ]

  return (
    <div
      className="absolute bg-zinc-800/90 backdrop-blur-md p-2 rounded-lg shadow-xl border border-zinc-700/50 z-50 color-picker"
      style={{ top: position.y, left: position.x }}
    >
      <div className="grid grid-cols-4 gap-2 p-2">
        {colors.map((color) => (
          <button
            key={color}
            className="w-6 h-6 rounded-full hover:scale-110 transition-transform duration-150 hover:shadow-lg border border-zinc-600/30"
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