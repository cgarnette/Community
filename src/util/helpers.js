export const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const getAddress = (event) => {
  let location = event.venue.name;
  location = event.venue.address.address_1 ? location + ' ' + event.venue.address.address_1 : location;
  location = location + ' ' + event.venue.address.localized_address_display;
  return location;
};