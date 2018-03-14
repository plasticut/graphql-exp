const fs = require('fs');
const {makeExecutableSchema} = require('graphql-tools');

const resolvers = {};
const typeDefs = [
  'interfaces/Node',

  'inputs/Pagination',
  'inputs/PostOrder',
  'inputs/UserOrder',

  ...[
    'types/OrderDirection',
    'types/ObjectId',
    'types/DateTime',
    'types/User',
    'types/Post',
    'types/Query',
    'types/Mutation'
  ].map(requireType),

  'schema'
].map(readGQL).join('\n\n');

module.exports = makeExecutableSchema({typeDefs, resolvers});

function readGQL(name) {
  return fs.readFileSync(`${__dirname}/${name}.graphql`).toString();
}

function requireType(name) {
  Object.assign(resolvers, require(`${__dirname}/${name}/resolvers`));
  return `${name}/schema`;
}

