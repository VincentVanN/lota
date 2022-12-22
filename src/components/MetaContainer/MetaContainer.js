/* eslint-disable max-len */
import './metaContainer.scss';
import PropTypes from 'prop-types';

function MetaContainer({ user }) {
  const onEmailClick = () => {
    window.open(`mailto:${user.email}`);
  };
  return (
    <div
      className="metaContainer"
    >
      <div>
        <div
          className="lineWithIcon"
        >
          <ion-icon name="home-outline" />
          {`${user.address.suite}, ${user.address.street}`}
        </div>
        <div
          className="zip"
        >{`${user.address.zipcode || ''}, ${user.address.city}`}
        </div>
      </div>
      <div
        className="lineWithIcon"
      >
        <ion-icon name="call-outline" />
        {user.phone}
      </div>
      <div
        className="lineWithIcon email"
        onClick={onEmailClick}
      >
        <ion-icon name="mail-outline" />
        {user.email}
      </div>
    </div>
  );
}
MetaContainer.propTypes = {
  user: PropTypes.object.isRequired,
};
export default MetaContainer;
