import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, addMinutes } from 'date-fns';

import { setShow, setResShow } from '../../redux/reducers/reducerCheckBox/reducerCheckBox';
import logoAviasales from '../../imports/importsImg';
import { calculationTime } from '../../calculation/calculationTime';

import Style from './ticket.module.scss';

const Ticket = () => {
  const dispatch = useDispatch();
  const { filteredCheckBox, show } = useSelector((state) => state.checkBox);
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
  } = Style;

  const handleShowMore = () => {
    console.log('Ticket component rendered');
    dispatch(setShow());
  };

  useEffect(() => {
    dispatch(setResShow());
  }, [filteredCheckBox]);

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

  return (
    <div className={container}>
      {filteredCheckBox.slice(0, show).map((ticket, index) => (
        <div key={index} className={ticketCard}>
          <div className={ticketContainerHeder}>
            <h2>{ticket.price}P</h2>
            <img className={logo} src={logoAviasales[ticket.carrier]} alt={ticket.carrier} />
          </div>
          <div>
            {ticket.segments.map((segment, segmentIndex) => {
              const departureDate = format(new Date(segment.date), 'HH:mm');
              const arriveDate = format(addMinutes(new Date(segment.date), segment.duration), 'HH:mm');
              const stopsName = (stops) => {
                if (stops === 0 || stops >= 5) return 'пересадок';
                if (stops >= 2 && stops <= 4) return 'пересадки';
                if (stops === 1) return 'пересадка';
              };

              const stopsText = `${segment.stops.length} ${stopsName(segment.stops.length)}`;

              return (
                <div key={segmentIndex} className={ticketContainer}>
                  <div>
                    <p className={ticketDataText}>
                      {segment.origin} - {segment.destination}
                    </p>
                    <p className={ticketData}>
                      {departureDate} – {arriveDate}
                    </p>
                  </div>
                  <div>
                    <span className={calculationTimeText}>В пути</span>
                    <p className={timeCalculation}>{calculationTime(segment.duration)}</p>
                  </div>
                  <div className={stopsContainer}>
                    <p className={textStops}>{stopsText}</p>
                    {segment.stops.join(', ')}
                  </div>
                </div>
              );
            })}
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
