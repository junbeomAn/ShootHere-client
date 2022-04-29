export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{ type: 'save' }],
    },
  ],
};
