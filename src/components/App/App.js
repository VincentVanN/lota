/* eslint-disable max-len */
import './app.scss';
import { useEffect, useRef, useState } from 'react';
import {
  collection,
  getDocs,
} from '@firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../firebase.config';
import UsersContainer from '../UsersContainer/UsersContainer';
import MapsContainer from '../MapsContainer/MapsContainer';
import ModalForm from '../ModalForm/ModalForm';
import Opener from '../Opener/Opener';

function App() {
  const appRef = useRef();
  const userCollectionRef = collection(db, 'users');
  const [users, setUsers] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [userToDisplay, setUserToDisplay] = useState(null);
  const [isMaps, setIsMaps] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [isOpener, setisOpener] = useState(true);
  const [refreshDb, setRefreshDb] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setisOpener(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      const requestResult = await getDocs(userCollectionRef);
      requestResult.forEach((doc) => {
        const currentUser = doc.data();
        const user = {
          address: {
            street: currentUser.street, suite: currentUser.addressNumber, city: currentUser.city, geo: { lat: currentUser.lat, lng: currentUser.lng },
          },
          email: currentUser.email,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          website: currentUser.website,
          phone: currentUser.phone,
          company: { name: currentUser.company },
        };
        setUsers((current) => [...current, user]);
        setIsLoading(false);
      });
    };
    if (!users || refreshDb) {
      setIsLoading(true);
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          getUsers();
          setRefreshDb(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [users, refreshDb]);
  return (
    <div className="app" ref={appRef}>
      <AnimatePresence>
        {isOpener && (
        <motion.div
          className="openerContainer"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
          }}
          key="opener"
        >
          <Opener />
        </motion.div>
        )}
        <div className="generalContainer">
          <img className="logo" src="lota_logo.png" alt="lota" />
          <ModalForm showModal={showModal} setshowModal={setshowModal} />
          {!isloading && (
            <UsersContainer
              users={users}
              userToDisplay={userToDisplay}
              setUserToDisplay={setUserToDisplay}
              setIsMaps={setIsMaps}
              isMaps={isMaps}
              showModal={showModal}
              setshowModal={setshowModal}
              setRefreshDb={setRefreshDb}
              isloading={isloading}
              appRef={appRef}

            />
          )}

          {isMaps && (
          <MapsContainer coords={{ lat: parseFloat(userToDisplay.address.geo.lat), lng: parseFloat(userToDisplay.address.geo.lng) }} appRef={appRef} />
          )}
          <div
            className="easterEgg"
            style={{
              visibility: 'hidden',
            }}
          >{process.env.REACT_APP_EASTER_EGG}
          </div>
        </div>
      </AnimatePresence>

    </div>
  );
}

export default App;
