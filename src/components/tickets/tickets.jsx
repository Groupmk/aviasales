import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setShow, setResShow } from '../../redux/reducers/reducerCheckBox/reducerCheckBox';
import logoAviasales from '../../imports/importsImg';
import Informational from '../../alerts/informations';
import TicketSegment from '../../ticketsSegment/ticketSegment';

import Style from './tickets.module.scss';

const Ticket = () => {
  const dispatch = useDispatch();
  const { filteredCheckBox, filters, show } = useSelector((state) => state.checkBox);
  const { activeTab } = useSelector((state) => state.tabsFilter);
  const scrollToTopButtonRef = useRef(null);
  const {
    container,
    ticketContainer,
    ticketContainerHeder,
    stopsContainer,
    ticketData,
    ticketCard,
    ticketDataText,
    textStops,
    calculationTimeText,
    timeCalculation,
    logo,
    showMore,
    scrollBtn,
    ticketPrice,
  } = Style;

  const handleShowMore = () => {
    dispatch(setShow());
  };

  useEffect(() => {
    if (filters || activeTab) {
      dispatch(setResShow());
    }
  }, [filters, activeTab]);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      scrollToTopButtonRef.current.style.display = 'block';
    } else {
      scrollToTopButtonRef.current.style.display = 'none';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (filteredCheckBox.length === 0) return <Informational />;

  return (
    <div className={container}>
      {filteredCheckBox.slice(0, show).map((ticket, index) => (
        <div key={index} className={ticketCard}>
          <div className={ticketContainerHeder}>
            <h2 className={ticketPrice}>{ticket.price}P</h2>
            <img className={logo} src={logoAviasales[ticket.carrier]} alt={ticket.carrier} />
          </div>
          <div>
            {ticket.segments.map((segment, segmentIndex) => (
              <div key={segmentIndex} className={ticketContainer}>
                <TicketSegment
                  segment={segment}
                  ticketDataText={ticketDataText}
                  calculationTimeText={calculationTimeText}
                  timeCalculation={timeCalculation}
                  textStops={textStops}
                  stopsContainer={stopsContainer}
                  ticketData={ticketData}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={scrollToTop} ref={scrollToTopButtonRef} className={scrollBtn}>
        ЖМЯК PUSH UP
      </button>
      {show < filteredCheckBox.length && (
        <button className={showMore} onClick={handleShowMore}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
        </button>
      )}
    </div>
  );
};

export default Ticket;
