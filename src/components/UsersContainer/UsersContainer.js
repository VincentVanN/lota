/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import './userContainer.scss';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Card from '../Card/Card';
import AddUserContainer from '../AddUserContainer/AddUserContainer';

function UsersContainer({
  users, setUserToDisplay, setIsMaps, userToDisplay, setshowModal, setRefreshDb,
}) {
  const inputRef = useRef();
  const [inputText, setinputText] = useState('');
  const [isShowMenu, setisShowMenu] = useState(true);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const handleChange = (e) => setinputText(e.target.value);
  const handleClick = () => {
    setisShowMenu(true);
    setRefreshDb(true);
  };
  const usersToDisplay = users.filter((user) => user.name.toLowerCase().includes(inputText.toLowerCase()));
  const CardHidden = userToDisplay ? 'retract' : '';
  useEffect(() => {
    if (isSearchBar) {
      inputRef.current.focus();
    }
  }, [isSearchBar]);
  return (
    <div
      className={`usersListContainer ${CardHidden}`}
    >
      <div className="header">
        <h3>{!userToDisplay ? 'Gestion utilisateurs' : userToDisplay.name}</h3>
        {!userToDisplay && (
          <div className="header-menu">
            <h4
              className={isShowMenu ? 'selectedMenu' : ''}
              onClick={handleClick}
            >Visionner
            </h4>
            <h4
              className={!isShowMenu ? 'selectedMenu' : ''}
              onClick={() => setisShowMenu(false)}
            >Enregistrer
            </h4>
          </div>

        )}

        <div className={`input-container ${!isShowMenu || userToDisplay ? 'hidden' : ''}`}>
          <ion-icon
            name="search-outline"
            onClick={() => setIsSearchBar(!isSearchBar)}
          />
          <motion.input
            ref={inputRef}
            className="hidden"
            animate={{
              width: isSearchBar ? '100%' : 0,
              visibility: isSearchBar ? 'visible' : 'hidden',
              background: 'rgba(255, 255, 255, 0.2)',
              transition: {
                duration: 0.3,
              },
            }}
            type="text"
            onChange={handleChange}
            onBlur={() => setIsSearchBar(!isSearchBar)}
          />
        </div>
      </div>
      <div className="animationContainer">
        <AnimatePresence mode="wait">
          {isShowMenu && (
          <motion.div
            className="cardListContainer"
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            key="cardContainer"
          >
            {usersToDisplay.map((user, index) => (
              <Card
                user={user}
                key={user.name}
                setUserToDisplay={setUserToDisplay}
                setIsMaps={setIsMaps}
                index={index}
                userToDisplay={userToDisplay}
              />
            ))}
          </motion.div>
          )}
          {!isShowMenu && (
          <motion.div
            className="addUsers"
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            key="addUser"
          >
            <AddUserContainer setshowModal={setshowModal} />
          </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>

  );
}
UsersContainer.propTypes = {
  users: PropTypes.array.isRequired,
  setUserToDisplay: PropTypes.func.isRequired,
  setIsMaps: PropTypes.func.isRequired,
  userToDisplay: PropTypes.object,
  setshowModal: PropTypes.func.isRequired,
  setRefreshDb: PropTypes.func.isRequired,
};

export default UsersContainer;
