
import {useState} from 'react';
import {PropTypes} from 'prop-types';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';




export const Datepicker = ({date, onChange}) => {

    const [selectedDate, setSelectedDate] = useState(date);

    const handleChange = (newDate) => {
        setSelectedDate(newDate);
        onChange(newDate);
    };

    return(
    (
        <Calendar
            activeStartDate={selectedDate}
            value={selectedDate}
            onChange={handleChange}
            // tileDisabled={({date}) => date.getDay() === 0 || date.getDay() === 6}
        />
    ));
};

Datepicker.propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func
};

Datepicker.defaultProps = {
    date: new Date(),
    onChange: () => {}
};
