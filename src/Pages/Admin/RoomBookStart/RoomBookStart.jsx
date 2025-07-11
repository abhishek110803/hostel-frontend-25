import React from 'react';
import { toggleValue, setToggleValue } from './ToggleState';

export default function ToggleController() {
  const handleToggle = () => {
    setToggleValue(!toggleValue);
    console.log('Toggled:', toggleValue); // this logs old value due to JS module mutation nature
  };

  return (
    <button onClick={handleToggle} className="bg-blue-500 text-white px-4 py-2 rounded">
      Toggle
    </button>
  );
}
