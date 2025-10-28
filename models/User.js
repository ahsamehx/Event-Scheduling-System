import { getPrisma } from '../Database/connection.js';
import bcrypt from 'bcryptjs';

class User {
  constructor(data) {
    this.user_id = data.user_id;
    this.email = data.email;
    this.password_hash = data.passwordHash || data.password_hash;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.created_at = data.createdAt || data.created_at;
  }

  static async create(userData) {
    const { email, password, firstname, lastname } = userData;
    if (!email || !password || !firstname || !lastname) throw new Error('All fields are required');
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) throw new Error('Please enter a valid email');
    if (password.length < 6) throw new Error('Password must be at least 6 characters long');
    if (firstname.length > 50) throw new Error('First name cannot exceed 50 characters');
    if (lastname.length > 50) throw new Error('Last name cannot exceed 50 characters');

    const prisma = getPrisma();

    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (exists) throw new Error('User with this email already exists');

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const created = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstname,
        lastname
      }
    });

    return new User(created);
  }

  static async findByEmail(email) {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    return user ? new User(user) : null;
  }

  static async findById(userId) {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: { user_id: Number(userId) },
      select: { user_id: true, email: true, firstname: true, lastname: true, createdAt: true }
    });
    return user ? new User(user) : null;
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password_hash);
  }

  toJSON() {
    return {
      id: this.user_id,
      email: this.email,
      firstName: this.firstname,
      lastName: this.lastname,
      createdAt: this.created_at
    };
  }
}

export default User;
