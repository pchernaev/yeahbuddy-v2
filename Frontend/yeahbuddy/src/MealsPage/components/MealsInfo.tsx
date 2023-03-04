import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const MealsInfo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div id="meals-info">
      <section>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date: any) => setSelectedDate(date)}
            withPortal
          />
        </div>
        <div>
          <h3>2333 / 3000 cal</h3>
          <div id="macros-container">
            <h5>Protein: 130 g.</h5>
            <h5>Carbs: 320 g.</h5>
            <h5>Fats: 30 g.</h5>
          </div>
        </div>
      </section>
    </div>
  );
};
