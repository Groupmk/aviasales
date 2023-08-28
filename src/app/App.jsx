import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTickets, fetchSearchId } from '../redux/reducers/Fetch-reducer/fetchReducer';
import CheckBoxFilter from '../components/checkboxFilter/checkBoxFilter';
import Ticket from '../components/ticket/ticket';
import TabsFilter from '../components/tabs/tabsFilter';
import Header from '../components/header/headerLogo';
import Loading from '../alerts/loading';
import Error from '../alerts/error';

import Style from './app.module.scss';

function App() {
  const dispatch = useDispatch();
  const { stop, searchId, loading, error } = useSelector((state) => state.fetch);
  const { container, app, header } = Style;
  console.log(error);

  useEffect(() => {
    if (!searchId) {
      dispatch(fetchSearchId());
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    if (!stop && searchId) {
      setTimeout(() => {
        dispatch(fetchTickets());
      }, 2000);
    }
  }, [dispatch, stop, searchId]);
  return (
    <>
      <div className={header}>
        <Header />
      </div>
      <div className={app}>
        <CheckBoxFilter />
        <div className={container}>
          <TabsFilter />
          {error && <Error massage={error} />}
          {loading && <Loading />}
          <Ticket />
        </div>
      </div>
    </>
  );
}

export default App;
