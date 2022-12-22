import './iconContainer.scss';
import PropTypes from 'prop-types';

function IconContainer({ isChart, setisChart }) {
  return (
    <div
      className="iconContainer"
    >
      <ion-icon
        name="location-outline"
        style={{ marginRight: '10px', color: !isChart ? '#fff' : '' }}
        onClick={() => setisChart(false)}
      />
      <ion-icon
        name="bar-chart-outline"
        style={{ color: isChart ? '#fff' : '' }}
        onClick={() => setisChart(true)}
      />
    </div>
  );
}
IconContainer.propTypes = {
  setisChart: PropTypes.func.isRequired,
  isChart: PropTypes.bool.isRequired,
};

export default IconContainer;
