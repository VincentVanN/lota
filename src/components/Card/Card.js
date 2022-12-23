/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import MetaContainer from '../MetaContainer/MetaContainer';
import './card.scss';

function Card({
  user, setUserToDisplay, setIsMaps, index, userToDisplay,
}) {
  const handleOpen = () => {
    setUserToDisplay(user);
    setIsMaps(true);
  };
  const handleClose = () => {
    setUserToDisplay(null);
    setIsMaps(false);
  };
  const onEmailClick = () => {
    window.open(`mailto:${user.email}`);
  };
  const CardHidden = (userToDisplay && userToDisplay !== user) ? 'hidden' : '';
  return (
    <div
      className={`cardContainer ${CardHidden}`}
    >
      <div className="card-image">
        <img
          style={{
            width: '80px',
          }}
          src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index}.jpg`}
          alt="avatar"
        />
      </div>

      <div className="card">
        <div
          className={`card-name ${userToDisplay ? 'hidden' : ''}`}
        >{user.name}
        </div>
        <div className="card-sub">
          {user.company.name && (
            <div
              className="card-company"
            >
              <ion-icon name="business-outline" />
              <p>{user.company.name}</p>
            </div>
          )}
          <div
            className="card-link email"
            onClick={onEmailClick}
          >
            <ion-icon name="mail-outline" />
            {user.email}
          </div>
          {userToDisplay && (
            <MetaContainer user={userToDisplay} />
          )}
        </div>
      </div>

      <div
        className="card-info-icon"
      >
        {!userToDisplay && (
          <ion-icon
            name="information-circle-outline"
            onClick={handleOpen}
            style={{
              width: '50px',
              height: '50px',
            }}
          />
        )}
        {userToDisplay && (
          <ion-icon
            name="arrow-undo-circle-outline"
            onClick={handleClose}
            style={{
              width: '50px',
              height: '50px',
            }}
          />
        )}

      </div>

    </div>
  );
}
Card.propTypes = {
  user: PropTypes.object.isRequired,
  setUserToDisplay: PropTypes.func.isRequired,
  setIsMaps: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  userToDisplay: PropTypes.object,
};
export default Card;
