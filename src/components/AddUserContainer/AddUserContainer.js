/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-return-assign */
import './addUserContainer.scss';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  collection,
  doc,
  setDoc,
} from '@firebase/firestore';
import { db } from '../../firebase.config';
import { checkForm } from '../../utils/checkForm';

function AddUserContainer({ setshowModal }) {
  const userCollectionRef = collection(db, 'users');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapboxSearchResults, setMapboxSearchResults] = useState(null);
  const [selectedCity, setselectedCity] = useState(null);
  const [isSelectedCity, setisSelectedCity] = useState(false);
  const [isValidate, setisValidate] = useState(false);
  const formRef = useRef([]);
  const mapBoxAPIKey = process.env.REACT_APP_MAPBOX_KEY;
  const createUser = async (userToCreate) => {
    await setDoc(
      doc(userCollectionRef),
      userToCreate,
    );
  };
  const handleChange = (e) => {
    setisSelectedCity(false);
    setSearchQuery(e.target.value);
    if (!e.target.value) {
      setMapboxSearchResults(null);
    }
  };
  const handleclick = (result) => {
    setselectedCity(result);
    setisSelectedCity(true);
  };
  const resetForm = (e) => {
    setTimeout(() => {
      e.target.reset();
      setisValidate(false);
      setSearchQuery('');
    }, 3000);
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (!checkForm(formRef)) {
      setshowModal(true);
      return;
    }
    const userToCreate = {
      email: formRef.current.email.value,
      firstName: formRef.current.firstName.value,
      lastName: formRef.current.lastName.value,
      phone: formRef.current.phone.value,
      website: formRef.current.website.value,
      street: formRef.current.street.value,
      city: selectedCity.place_name,
      lat: selectedCity.geometry.coordinates[1],
      lng: selectedCity.geometry.coordinates[0],
      addressNumber: formRef.current.addressNumber.value,
      company: formRef.current.company.value,
    };
    createUser(userToCreate);
    setisValidate(true);
    resetForm(e);
  };
  //
  //
  const buttonVariants = {
    open: {
      backgroundColor: '#88f56d',
      transition: {
        duration: 0.5,
      },
    },
    init: {
      backgroundColor: 'transparent',
    },
  };
  //
  //
  const getSearchResults = async () => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapBoxAPIKey}&types=place`)
      .then((response) => response.json())
      .then((data) => {
        setMapboxSearchResults(data.features);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  //
  //
  useEffect(() => {
    if (searchQuery !== '') {
      const queryTimeOut = setTimeout(() => {
        getSearchResults();
      }, 300);
      return () => clearTimeout(queryTimeOut);
    }
  }, [searchQuery]);
  //
  //
  useEffect(() => {
    if (selectedCity) {
      setSearchQuery(selectedCity.place_name);
      setMapboxSearchResults(null);
    }
  }, [selectedCity]);
  return (

    <div
      className="addUserContainer"
    >
      <form
        onSubmit={submitForm}
      >
        <div className="user">
          <ion-icon name="person-outline" />
          <input id="firstName" type="text" placeholder="Prénom" ref={(ref) => formRef.current.firstName = ref} />
          <input id="lastName" type="text" placeholder="Nom" ref={(ref) => formRef.current.lastName = ref} />
          <input id="email" type="email" placeholder="Email" ref={(ref) => formRef.current.email = ref} />
          <input id="phone" type="text" placeholder="Téléphone" ref={(ref) => formRef.current.phone = ref} />
          <input id="website" type="text" placeholder="Site Web" ref={(ref) => formRef.current.website = ref} />
          <input id="company" type="text" placeholder="Entreprise" ref={(ref) => formRef.current.company = ref} />
        </div>

        <div
          className="home"
        >
          <ion-icon name="home-outline" />
          <input id="addressNumber" type="text" placeholder="Numéro" ref={(ref) => formRef.current.addressNumber = ref} />
          <input id="street" type="text" placeholder="Rue" ref={(ref) => formRef.current.street = ref} />
          <input
            id="city"
            type="text"
            placeholder="Ville"
            ref={(ref) => formRef.current.city = ref}
            value={searchQuery}
            onChange={handleChange}
          />
          {(mapboxSearchResults && !isSelectedCity) && (
            <ul>
              {mapboxSearchResults.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleclick(result)}
                >
                  {result.place_name}
                </li>
              ))}
            </ul>
          )}

        </div>
        <div className="contactForm-button-container">
          <motion.button
            className="formButton"
            type="submit"
            whileTap={{
              scale: 0.95,
            }}
            animate={isValidate ? 'open' : 'init'}
            variants={buttonVariants}
          >
            {!isValidate && (
              <svg
                viewBox="0 0 1000 1000"
                width="45"
                enableBackground="new 0 0 1000 1000"
              >
                <g>
                  <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                    <path
                      d="M4963.7,2140.5C2328.5,1053.5,156.6,151.3,134.4,133.5C85.4,93.4,89.8,4.3,141-29.1c22.3-13.4,741.8-307.4,1597.2-652.7L3295.3-1310l55.7-1265.3c53.5-1194,60.1-1265.3,100.2-1294.2c24.5-17.8,62.4-29,84.6-26.7c20.1,4.5,441.1,351.9,933.4,775.2c490.1,423.2,899.9,766.3,906.6,764.1c6.7-2.2,614.8-325.2,1349.9-717.3c735.1-394.3,1347.7-715,1361-715c82.4,0,104.7,62.4,267.3,804.1c91.3,409.9,476.7,2145.1,855.4,3855.9C9590.4,2581.6,9900,3996.1,9900,4013.9c0,40.1-71.3,104.7-113.6,102.5C9768.6,4116.4,7598.9,3227.6,4963.7,2140.5z M9042.4,3541.7c-24.5-22.3-1307.6-1075.9-2849.1-2341.2L3388.8-1100.6L2317.4-670.6C439.5,86.7,504.2,57.8,566.5,82.3c93.6,35.6,6419.8,2644.1,7484.6,3085.2c545.8,227.2,1000.2,412.1,1013.5,414.3C9075.8,3584,9066.9,3566.2,9042.4,3541.7z M8797.4,60c-423.2-1915.7-777.4-3499.5-786.3-3519.6c-13.4-31.2-274,102.5-1646.2,835.3l-1630.6,871l71.3,84.7c253.9,300.7,4751.4,5243.7,4755.8,5228.1C9565.9,3550.6,9222.8,1975.7,8797.4,60z M7656.8,1819.8C7131.1,1242.8,6197.8,209.2,5578.5-472.4l-1124.9-1243l-412.1-801.9c-225-441.1-414.3-797.5-418.8-793c-8.9,8.9-91.3,1724.1-93.6,1917.9v113.6l2379,1951.3c1307.6,1073.7,2441.4,2004.8,2521.6,2073.9c80.2,66.8,151.5,122.5,162.6,122.5C8601.3,2871.2,8180.3,2398.9,7656.8,1819.8z M5126.3-2238.9c-8.9-24.5-1202.9-1058.1-1214-1049.2c-6.7,6.7,541.3,1087.1,634.9,1254.1l53.5,93.6l265.1-138.1C5012.7-2156.4,5128.5-2227.7,5126.3-2238.9z"
                    />
                  </g>
                </g>
              </svg>
            )}
            {isValidate && (
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" color="#fdfcf2">
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="40"
                  d="M416 128L192 384l-96-96"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: 0.55,
                  }}
                />
              </svg>
            )}
          </motion.button>
        </div>
      </form>
    </div>

  );
}
AddUserContainer.propTypes = {
  setshowModal: PropTypes.func.isRequired,
};
export default AddUserContainer;
