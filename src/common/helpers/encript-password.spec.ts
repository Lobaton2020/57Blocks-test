import EncryptPassword from './encript-password';

describe('EncryptPassword', () => {
  it('should defined the metjhod encrypt', async () => {
    expect(EncryptPassword.encrypt).toBeDefined();
  });

  it('should defined the metjhod verify', async () => {
    expect(EncryptPassword.verify).toBeDefined();
  });

  it('should decrypt the password Andres10 an compate the hash', async () => {
    const password = 'Andres10';
    const hash = await EncryptPassword.encrypt('Andres10');
    expect(EncryptPassword.verify(hash, password)).toBeTruthy();
  });
});
