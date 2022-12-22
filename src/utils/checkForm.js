/* eslint-disable import/prefer-default-export */
export const checkForm = (ref) => {
  if (
    !ref.current.firstName.value
    || !ref.current.lastName.value
    || !ref.current.email.value
    || !ref.current.phone.value
    || !ref.current.website.value
    || !ref.current.company.value
    || !ref.current.addressNumber.value
    || !ref.current.street.value
    || !ref.current.city.value
  ) {
    return false;
  }
  return true;
};
