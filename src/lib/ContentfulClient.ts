import * as Contentful from 'contentful';

const client = Contentful.createClient({
  space: 'wn2l2ohr9qga',
  accessToken: 'ed1bf7b4a8c5a4a8d5fc78768fa9bd07d625eb8cbb90ad2054c0eb4e57f8e636'
});

export default client;