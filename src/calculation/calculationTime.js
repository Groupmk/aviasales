export const calculationTime = (duration) => {
  const m = duration % 60;
  const h = (duration - m) / 60;
  const travelDuration = `${h}ч ${m}м`;
  return travelDuration;
};
