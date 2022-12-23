import PropTypes from 'prop-types';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Maps from './Maps';
import IconContainer from '../IconContainer/IconContainer';
import ChartContainer from '../ChartContainer/ChartContainer';

function MapsContainer({ coords, appRef }) {
  const render = (statusMap) => {
    if (statusMap === Status.FAILURE) return <div>erreur!</div>;
    return <div>loading...</div>;
  };
  const [isChart, setisChart] = useState(false);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="mapsContainer"
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        exit={{ y: 1000 }}
        key="mapsContainer"
        drag
        dragConstraints={appRef}
      >
        <IconContainer isChart={isChart} setisChart={setisChart} />
        {!isChart && (
          <motion.div
            initial={{ y: 600 }}
            animate={{ y: 0 }}
            exit={{ y: 600 }}
            key="maps"
            className="mapContent"
          >
            <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
              <Maps coords={coords} />
            </Wrapper>
          </motion.div>
        )}
        {isChart && (
          <motion.div
            initial={{ y: 600 }}
            animate={{ y: 0 }}
            exit={{ y: 600 }}
            key="chart"
            className="animatedChart"
          >
            <ChartContainer />
          </motion.div>
        )}

      </motion.div>
    </AnimatePresence>

  );
}
MapsContainer.propTypes = {
  coords: PropTypes.object.isRequired,
  appRef: PropTypes.node.isRequired,
};
export default MapsContainer;
