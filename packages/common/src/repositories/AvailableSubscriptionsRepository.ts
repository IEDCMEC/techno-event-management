import UUID from '../UUID';
import AvailableSubscriptions from '../models/AvailableSubscriptions';

interface AvailableSubscriptionsRepository {
  create(item: AvailableSubscriptions): Promise<boolean>;

  find(id: UUID): Promise<AvailableSubscriptions | null>;

  findAll(): Promise<AvailableSubscriptions[] | null>;

  update(item: AvailableSubscriptions): Promise<AvailableSubscriptions | boolean>;

  delete(item: AvailableSubscriptions): Promise<boolean>;
}

export default AvailableSubscriptionsRepository;
