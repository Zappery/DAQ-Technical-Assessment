import React from 'react';
import './App.css';

interface TemperatureProps {
  temp: number;
}

let valueColour = 'white';

// function needRed(temp: number) {
//   if (temp < 20 || temp > 80){
//     let valueColour = 'red'
//     return valueColour;
//   }
// }

// needRed()

function LiveValue({ temp } : TemperatureProps) {

  return (
      <header className="live-value" style={{ color : valueColour }}>
        {`${temp.toString()}°C`}
      </header>
  );
}

export default LiveValue;