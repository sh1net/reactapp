import React from "react";
import "./CreaterSelectStyles.css";

function CreaterSelect({minute,hour,hours,minutes,onChangeHour,onChangeMinute }) {
  return (
    <div className="creater__select">
      <select
      value={hour}
      onChange={(e)=>{onChangeHour(e)}}
     
      >
        <option disabled={true} value={""}>
        {hours.length>24
          ?'Минуты'
          :'Часы'
          }
        </option>
        {hours.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      :
      <select
      value={minute}
      onChange={(e)=>{onChangeMinute(e)}}>
        <option disabled={true} value={""}>
          {hours.length>24
          ? 'Секунды'
          :'Минуты'
          }
        </option>
        {minutes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CreaterSelect;
