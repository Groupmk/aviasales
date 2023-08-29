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
  const { container, cheapestTab, fastestTab, optimalTab } = Style;

  useEffect(() => {
    const FilterTabsTickets = async () => {
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

    FilterTabsTickets();
  }, [activeTab, filteredCheckBox, filteredTicket, dispatch]);

  const changeTab = (activeTab) => {
    dispatch(setFilteredTicket(activeTab));
    dispatch(setActiveTab(activeTab));
  };

  return (
    <div className={container}>
      <div
        className={cheapestTab}
        style={{
          backgroundColor: activeTab === 'cheapest' ? '#2196F3' : null,
          color: activeTab === 'cheapest' ? 'white' : null,
        }}
        onClick={() => changeTab('cheapest')}
      >
        Самый дешевый
      </div>
      <div
        className={fastestTab}
        onClick={() => changeTab('fastest')}
        style={{
          backgroundColor: activeTab === 'fastest' ? '#2196F3' : null,
          color: activeTab === 'fastest' ? 'white' : null,
        }}
      >
        Самый быстрый
      </div>
      <div
        className={optimalTab}
        onClick={() => changeTab('optimal')}
        style={{
          backgroundColor: activeTab === 'optimal' ? '#2196F3' : null,
          color: activeTab === 'optimal' ? 'white' : null,
        }}
      >
        Оптимальный
      </div>
    </div>
  );
};

export default FilteredTicketsComponent;
