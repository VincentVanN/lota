/* eslint-disable max-len */
import './metaContainer.scss';
import PropTypes from 'prop-types';

function MetaContainer({ user }) {
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
        >{`${user.address.zipcode || ''}, ${user.address.city.split(',')[0]}`}
        </div>
      </div>
      <div
        className="lineWithIcon"
      >
        <ion-icon name="call-outline" />
        {user.phone}
      </div>
      <div className="card-link">
        <ion-icon name="unlink-outline" />
        <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
      </div>
    </div>
  );
}
MetaContainer.propTypes = {
  user: PropTypes.object.isRequired,
};
export default MetaContainer;
