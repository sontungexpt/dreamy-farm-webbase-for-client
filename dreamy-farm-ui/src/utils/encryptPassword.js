import MD5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';

const encryptPassword = (password) => {
  const md5password = MD5(password).toString();
  const encryptedPassword = sha256(md5password).toString();
  return encryptedPassword;
};

export default encryptPassword;
