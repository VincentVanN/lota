import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './modalForm.scss';
import { useEffect } from 'react';

function ModalForm({ showModal, setshowModal }) {
  const modalFormVariants = {
    open: {
      top: '50%',
      opacity: 1,
    },
    init: {
      top: '-110%',
      opacity: 0,
    },
  };
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setshowModal(false);
      }, 3500);
    }
  }, [showModal]);
  return (
    <motion.div
      className="modalForm"
      animate={showModal ? 'open' : 'init'}
      variants={modalFormVariants}
    >
      <p>
        Tous les champs doivent être saisis
      </p>
    </motion.div>
  );
}
ModalForm.propTypes = {
  setshowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};
export default ModalForm;
