import {Datepicker} from '@components/Datepicker';
import {QUANTITIES} from '@config/quantities';
import Select from 'react-select';
import {useMemo, useState} from 'react';

const SelectLabel = ({children}) => <div className="text-sm w-100 mb-1 text-blue-900">{children}</div>;



const Sidebar = () => {

    const quantitiesOptions = useMemo(() => Object.entries(QUANTITIES).map(([key,value]) => ({
            value: key,
            label: value
        })), []);

console.log(quantitiesOptions);

    const [selectedQnt, setSelectedQnt] = useState(quantitiesOptions[0]);

    return (
        <aside
            className="sidebar flex flex-col justify-center items-center border-2 border-blue-300 p-8 m-2 rounded-2xl shadow-xl shadow-blue-200">
            <Datepicker/>

            <div className="flex flex-col w-full my-2">
                <SelectLabel>Select Quantity</SelectLabel>
                <Select
                    options={quantitiesOptions}
                    defaultValue={selectedQnt}
                    onChange={(option) => setSelectedQnt(option)}
                />
            </div>

            <div className="flex flex-col w-full my-2">
                <SelectLabel>Countries</SelectLabel>
                <Select
                    options={quantitiesOptions}
                    defaultValue={selectedQnt}
                    onChange={(option) => setSelectedQnt(option)}
                />
            </div>

        </aside>

    );
};

export default Sidebar;
