import { useState } from 'react';
import './style.css';
import data from './data';

export default function Accordian() {
    const [selected, setSelected] = useState(null);
    const [EnableMultipleSelection, SetEnableMultipleSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function HandleMultipleSelection(getCurrentId) {
        let copyMultiple = [...multiple];
        const indexOfCurrentId = copyMultiple.indexOf(getCurrentId);
        if (indexOfCurrentId === -1) {
            copyMultiple.push(getCurrentId);
        } else {
            copyMultiple.splice(indexOfCurrentId, 1);
        }
        setMultiple(copyMultiple);
    }

    console.log(selected);

    return (
        <div className="wrapper">
            <div className="accordian">
                <button onClick={() => SetEnableMultipleSelection(!EnableMultipleSelection)}>
                    Enable multiple selection
                </button>

                {data ? data.map(dataItem => (
                    <div className='item'>
                        <div className="title"
                            onClick={() => EnableMultipleSelection
                                ? HandleMultipleSelection(dataItem.id)
                                : handleSingleSelection(dataItem.id)}
                        >
                            <h1>{dataItem.name} +</h1>
                        </div>
                        <div className="age">
                            <h2>{dataItem.age}</h2>
                        </div>
                        <div className="position">
                            <h3>{dataItem.position}</h3>
                        </div>
                        {EnableMultipleSelection
                            ? multiple.indexOf(dataItem.id) !== -1 && (
                                <div className="summary">{dataItem.summary}</div>
                            )
                            : selected === dataItem.id && (
                                <div className="summary">{dataItem.summary}</div>
                            )}
                    </div>
                )) : <div>No data found!</div>}
            </div>
        </div>
    );
}
