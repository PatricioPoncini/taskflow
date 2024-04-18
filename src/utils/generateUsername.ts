import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";

export const generaterRandomUsername = () => {
  return uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: "_",
    length: 2,
  });
};
