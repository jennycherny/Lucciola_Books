import React, { useState} from 'react';
import './Sort.css'

const Sort = ({ onChangeSort }) => {
    const sortTypes = [ 'новизне', 'цене', 'алфавиту'];

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const [sortDirection, setSortDirection] = useState('desc');

    const selectedSort = sortTypes[selected]; 

    const onClickSortList = (i) => {
        setSelected(i);
        setOpen(false);
        setSortDirection('desc');
        onChangeSort(sortTypes[i], 'desc');
    };

    const toggleSortDirection = () => {
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';

        setSortDirection(newSortDirection);
        console.log(newSortDirection)
        onChangeSort(selectedSort, newSortDirection); // Вызываем onChangeSort с текущим типом сортировки
      };

    return (
        <div className='sort'>
            <div className='sort__label'>
                <div onClick={() => toggleSortDirection()} className='directionToggler'>
                    <svg className={`directionIcon ${sortDirection === 'asc' ? 'notRotated' : 'rotated'}`} xmlns="http://www.w3.org/2000/svg" width="17"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path fill="#625F60" stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                    </svg>

                    Сортировка по:
                </div>
                
                <span onClick={() => setOpen(!open)}>{selectedSort}</span>
            </div>
            {open && (
                <div className='sort__popup'>
                <ul>
                    {sortTypes.map((name, i) => (
                        <li
                        key={i}
                        onClick ={() => onClickSortList(i)}
                        className={selected === i ? 'active' : ''}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    );
};

export default Sort;