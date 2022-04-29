export default {
  name: 'place',
  title: 'Place',
  type: 'document',
  fields: [
    {
      name: 'placeName',
      title: 'PlaceName',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: 'PhoneNumber',
      type: 'string',
    },
    {
      name: 'reservationPage',
      title: 'ReservationPage',
      type: 'url',
      initialValue: '-',
    },
    {
      name: 'minPrice',
      title: 'MinPrice',
      type: 'number',
    },
    {
      name: 'maxPrice',
      title: 'MaxPrice',
      type: 'number',
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
    },
  ],
};
