import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-02-10',
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
