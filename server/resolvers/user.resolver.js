import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    users: () => users,
    // users: async () => {
    //   return await User.find({});
    // },
    user: (_, { userId }) => users.find((user) => user._id === userId),
  },

  Mutation: {},
};
export default userResolver;
