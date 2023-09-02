const Tab = ({ activeTab, tabName, onClick, Style }) => (
  <div
    className={Style[tabName]}
    onClick={() => onClick(tabName)}
    style={{
      backgroundColor: activeTab === tabName ? '#2196F3' : null,
      color: activeTab === tabName ? 'white' : null,
    }}
  >
    {tabName === 'cheapest' ? 'Самый дешевый' : tabName === 'fastest' ? 'Самый быстрый' : 'Оптимальный'}
  </div>
);
export default Tab;
