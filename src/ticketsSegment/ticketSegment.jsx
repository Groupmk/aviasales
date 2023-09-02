import { format, addMinutes } from 'date-fns';

import { calculationTime } from '../calculation/calculationTime';
const TicketSegment = (segment) => {
  const departureDate = format(new Date(segment.segment.date), 'HH:mm');
  const arriveDate = format(addMinutes(new Date(segment.segment.date), segment.segment.duration), 'HH:mm');
  const stopsName = (stops) => {
    if (stops === 0 || stops >= 5) return 'пересадок';
    if (stops >= 2 && stops <= 4) return 'пересадки';
    if (stops === 1) return 'пересадка';
  };

  const nameStops = `${segment.segment.stops.length} ${stopsName(segment.segment.stops.length)}`;
  return (
    <>
      <div>
        <p className={segment.ticketDataText}>
          {segment.segment.origin} - {segment.segment.destination}
        </p>
        <p className={segment.ticketData}>
          {departureDate} – {arriveDate}
        </p>
      </div>
      <div>
        <span className={segment.calculationTimeText}>В пути</span>
        <p className={segment.timeCalculation}>{calculationTime(segment.segment.duration)}</p>
      </div>
      <div className={segment.stopsContainer}>
        <p className={segment.textStops}>{nameStops}</p>
        {segment.segment.stops.join(', ')}
      </div>
    </>
  );
};

export default TicketSegment;
