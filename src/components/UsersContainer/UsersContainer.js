/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import './userContainer.scss';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Card from '../Card/Card';
import AddUserContainer from '../AddUserContainer/AddUserContainer';

function Checkbox({ obj, onChange, state }) {
  const handleChange = () => {
    const stateArray = state.filter((item) => item !== obj);
    const newObject = { ...obj, checked: !obj.checked };
    stateArray.push(newObject);
    onChange(stateArray);
  };
  return (
    <>
      <input
        type="checkbox"
        id={`custom-checkbox-${obj.index}`}
        name={obj.city}
        value={obj.checked}
        onChange={handleChange}
      />
      {obj.city}
    </>
  );
}
function UsersContainer({
  users, setUserToDisplay, setIsMaps, userToDisplay, setshowModal, setRefreshDb, isloading, appRef,
}) {
  const inputRef = useRef();
  const [inputText, setinputText] = useState('');
  const [isShowMenu, setisShowMenu] = useState(true);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [usersCity, setusersCity] = useState([]);
  const [refreshCity, setrefreshCity] = useState(true);
  const [isFilteredByCities, setIsFilteredByCities] = useState(false);
  const [checked, setChecked] = useState(false);
  const [citiesWindow, setCitiesWindow] = useState(false);
  //
  const handleChange = (e) => setinputText(e.target.value);
  //
  const handleClick = () => {
    setisShowMenu(true);
    setRefreshDb(true);
    setrefreshCity(true);
  };
  const handleSelectedCities = () => {
    setIsFilteredByCities(true);
    setIsSearchBar(false);
    setCitiesWindow(false);
  };
  const handleCheckbox = () => {
    setChecked(!checked);
    if (!checked) {
      setCitiesWindow(true);
    }
  };
  const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(inputText.toLowerCase()) || user.name.toLowerCase().includes(inputText.toLowerCase()));
  let usersToDisplay = [];
  if (isFilteredByCities) {
    usersToDisplay = filteredUsers.filter((user) => usersCity.some((item) => user.address.city === item.city && item.checked !== false));
  }
  else usersToDisplay = filteredUsers;
  //
  //

  useEffect(() => {
    const getCity = () => {
      users.forEach((user) => {
        setusersCity((current) => [...current, { city: user.address.city, checked: false }]);
      });
    };
    if (refreshCity && !isloading) {
      setrefreshCity(false);
      setusersCity([]);
      getCity();
    }
  }, [refreshCity]);
  //
  //
  useEffect(() => {
    if (isSearchBar && checked) {
      setCitiesWindow(true);
    }
  }, [isSearchBar, checked]);
  //
  //
  //
  //
  return (
    <motion.div
      className="usersListContainer"
      drag
      dragConstraints={appRef}
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
          <motion.div
            className="inputFields"
            animate={{
              width: isSearchBar ? '100%' : 0,
              visibility: isSearchBar ? 'visible' : 'hidden',
              transition: {
                duration: 0.3,
              },
            }}
          >
            <input
              ref={inputRef}
              type="text"
              onChange={handleChange}
              onBlur={() => setIsSearchBar(!isSearchBar)}
            />
            {isSearchBar && (
            <label htmlFor="checkbox">
              <input id="checkbox" type="checkbox" checked={checked} onChange={handleCheckbox} />
              Filtrer par ville
            </label>
            )}
          </motion.div>
        </div>
      </div>
      <motion.ul
        className="cityContainer"
        animate={{
          scale: citiesWindow ? 1 : 0,
          translateX: '-50%',
          translateY: '-50%',
          transition: {
            duration: 0.3,
          },
        }}
      >
        {usersCity.sort((a, b) => a.city.localeCompare(b.city)).map((city, index) => (
          <li key={index}>
            <Checkbox
              obj={city}
              onChange={setusersCity}
              state={usersCity}
            />
          </li>
        ))}
        <div className="checkboxButtonContainer">
          <motion.button
            type="button"
            className="ckeckboxCityButton"
            whileTap={{ scale: 0.7 }}
            onClick={handleSelectedCities}
          >Valider
          </motion.button>
        </div>
      </motion.ul>
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
                  setChecked={setChecked}
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

    </motion.div>

  );
}
UsersContainer.propTypes = {
  users: PropTypes.array.isRequired,
  setUserToDisplay: PropTypes.func.isRequired,
  setIsMaps: PropTypes.func.isRequired,
  userToDisplay: PropTypes.object,
  setshowModal: PropTypes.func.isRequired,
  setRefreshDb: PropTypes.func.isRequired,
  isloading: PropTypes.bool.isRequired,
  appRef: PropTypes.node.isRequired,
};

export default UsersContainer;
