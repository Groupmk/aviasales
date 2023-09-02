import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter, setFilteredCheckBox } from '../../redux/reducers/reducerCheckBox/reducerCheckBox';

import Style from './checkbox.module.scss';

const FilterCheckbox = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.checkBox);
  const { tickets } = useSelector((state) => state.fetch);
  const [filterText, setFilterText] = useState('Количество пересадок');
  const { checkBox, checkBoxText, checkBoxContainer, check, checkInput, custonCheckBox } = Style;

  const checkboxData = [
    { name: 'all', label: 'Показать все' },
    { name: 'nonStops', label: 'Без остановок' },
    { name: 'oneStop', label: 'Одна остановка' },
    { name: 'twoStops', label: 'Две остановки' },
    { name: 'threeStops', label: 'Три остановки' },
  ];

  const shouldShowAllChecked = (updatedFilters) => {
    return updatedFilters.nonStops && updatedFilters.oneStop && updatedFilters.twoStops && updatedFilters.threeStops;
  };

  useEffect(() => {
    dispatch(
      setFilter({
        all: true,
        nonStops: true,
        oneStop: true,
        twoStops: true,
        threeStops: true,
      })
    );
  }, [dispatch]);

  const handleFilterChange = (filterName) => (e) => {
    let updatedFilters;

    if (filterName === 'all' && e.target.checked) {
      updatedFilters = {
        all: true,
        nonStops: true,
        oneStop: true,
        twoStops: true,
        threeStops: true,
      };
    } else if (filterName === 'all' && !e.target.checked) {
      updatedFilters = {
        all: false,
        nonStops: false,
        oneStop: false,
        twoStops: false,
        threeStops: false,
      };
    } else {
      updatedFilters = { ...filters, [filterName]: e.target.checked };
      if (filterName !== 'all' && shouldShowAllChecked(updatedFilters)) {
        updatedFilters.all = true;
      } else {
        updatedFilters.all = false;
      }
    }

    dispatch(setFilter(updatedFilters));
  };

  useEffect(() => {
    setFilterText(filterText.toUpperCase());
  }, [filterText]);

  useEffect(() => {
    const applyFilters = async () => {
      const { nonStops, oneStop, twoStops, threeStops } = filters;
      const checkBoxFilters = tickets.filter((ticket) => {
        if (
          (nonStops && ticket.segments.every((segment) => segment.stops.length === 0)) ||
          (oneStop && ticket.segments.every((segment) => segment.stops.length === 1)) ||
          (twoStops && ticket.segments.every((segment) => segment.stops.length === 2)) ||
          (threeStops && ticket.segments.every((segment) => segment.stops.length === 3))
        ) {
          return true;
        }
        return false;
      });
      await dispatch(setFilteredCheckBox(checkBoxFilters));
    };
    applyFilters();
  }, [filters, tickets, dispatch]);

  return (
    <div className={checkBoxContainer}>
      <p className={checkBoxText}>{filterText}</p>
      <div className={checkBox}>
        {checkboxData.map((item) => (
          <label className={check} key={item.name}>
            <input
              type="checkbox"
              checked={filters[item.name]}
              onChange={handleFilterChange(item.name)}
              className={checkInput}
            />
            <span className={custonCheckBox}>
              <div className="checkmark"></div>
            </span>
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterCheckbox;
