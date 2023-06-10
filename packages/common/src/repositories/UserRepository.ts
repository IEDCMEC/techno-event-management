import User from '../models/User';
import UUID from '../UUID';

export interface UserRepository {
  create(user: User): Promise<User>;

  find(id: UUID): Promise<User | null>;

  findAll(): Promise<User[] | null>;

  findByEmail(email: string): Promise<User | null>;

  update(user: User): Promise<User | null>;

  delete(id: UUID): Promise<boolean>;
}

export default UserRepository;
