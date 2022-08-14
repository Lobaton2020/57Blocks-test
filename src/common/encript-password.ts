import * as bcrypt from 'bcrypt';

export default class EncryptPassword {
  static async encrypt(password) {
    const salt = await bcrypt.genSalt(process.env.SALT_WORK_FACTOR || 10);
    return await bcrypt.hash(password, salt);
  }

  static verify(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
