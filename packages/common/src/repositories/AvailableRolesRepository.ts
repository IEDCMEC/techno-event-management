import UUID from '../UUID';
import AvailableRoles from '../models/AvailableRoles';

interface AvailableRolesRepository {
  create(item: AvailableRoles): Promise<boolean>;

  find(id: UUID): Promise<AvailableRoles | null>;

  findAll(): Promise<AvailableRoles[] | null>;

  update(item: AvailableRoles): Promise<AvailableRoles | boolean>;

  delete(item: AvailableRoles): Promise<boolean>;
}

export default AvailableRolesRepository;
