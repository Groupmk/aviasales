import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash.isequal';

import { setActiveTab, setFilteredTicket } from '../../redux/reducers/tabsReducer/tabReducer';
import { setFilteredCheckBox } from '../../redux/reducers/reducerCheckBox/reducerCheckBox';

import Style from './tabsFilters.module.scss';

const FilteredTicketsComponent = () => {
  const dispatch = useDispatch();
  const { activeTab, filteredTicket } = useSelector((state) => state.tabsFilter);
  const { filteredCheckBox } = useSelector((state) => state.checkBox);
  const { container } = Style;

  useEffect(() => {
    const filterTabsTickets = async () => {
      const filterTicket = [...filteredCheckBox].sort((a, b) => {
        if (activeTab === 'cheapest') {
          return a.price - b.price;
        } else if (activeTab === 'fastest') {
          return a.segments[0].duration - b.segments[0].duration;
        } else if (activeTab === 'optimal') {
          return a.price + a.segments[0].duration - (b.price + b.segments[0].duration);
        }
        return 0;
      });

      if (!isEqual(filteredCheckBox, filterTicket)) {
        await dispatch(setFilteredCheckBox(filterTicket));
      }
    };

    filterTabsTickets();
  }, [activeTab, filteredCheckBox, filteredTicket, dispatch]);

  const tabs = [
    { name: 'cheapest', label: 'Самый дешевый' },
    { name: 'fastest', label: 'Самый быстрый' },
    { name: 'optimal', label: 'Оптимальный' },
  ];

  const changeTab = (activeTab) => {
    dispatch(setFilteredTicket(activeTab));
    dispatch(setActiveTab(activeTab));
  };

  return (
    <div className={container}>
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={Style[tab.name]}
          onClick={() => changeTab(tab.name)}
          style={{
            backgroundColor: activeTab === tab.name ? '#2196F3' : null,
            color: activeTab === tab.name ? 'white' : null,
          }}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default FilteredTicketsComponent;
