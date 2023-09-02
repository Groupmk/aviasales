import { useSelector } from 'react-redux';
export const nameFunc = () => {
  const { tickets } = useSelector((state) => state.fetch);
  const { segment } = tickets;
  console.log(segment);
};

nameFunc();
