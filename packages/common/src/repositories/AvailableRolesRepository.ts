import UUID from '../UUID';
import AvailableRoles from '../models/AvailableRoles';

interface AvailableRolesRepository {
  create(item: AvailableRoles): Promise<boolean>;

  find(): Promise<AvailableRoles>;

  findAll(): Promise<AvailableRoles[]>;

  update(item: AvailableRoles): Promise<boolean>;

  delete(item: AvailableRoles): Promise<boolean>;
}

export default AvailableRolesRepository;
