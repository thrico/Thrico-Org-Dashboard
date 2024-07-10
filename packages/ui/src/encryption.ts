import { GraphQLError } from "graphql";

const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey", {
  encoding: "base64",
  pbkdf2Iterations: 10,
  saltLength: 5,
});

const encryptToken = (data: string | undefined | object) => {
  var encrypted = cryptr.encrypt(`${JSON.stringify(data)}`);
  return encrypted;
};

const decryptToken = async (data: string | undefined | null) => {
  try {
    const decrypted = await cryptr.decrypt(data);

    const parse = await JSON.parse(decrypted);

    return parse;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { encryptToken, decryptToken };
