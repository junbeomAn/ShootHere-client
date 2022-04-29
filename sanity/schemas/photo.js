export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'place',
      title: 'Place',
      type: 'reference',
      to: [{ type: 'place' }],
    },
    {
      name: 'url',
      title: 'Url',
      type: 'array',
      of: [{ type: 'image' }],
      options: {},
    },
  ],
};
