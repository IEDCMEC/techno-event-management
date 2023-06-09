import UUID from '../UUID';
import AvailableSubscriptions from '../models/AvailableSubscriptions';

interface AvailableSubscriptionsRepository {
  create(item: AvailableSubscriptions): Promise<boolean>;

  find(): Promise<AvailableSubscriptions>;

  findAll(): Promise<AvailableSubscriptions[]>;

  update(item: AvailableSubscriptions): Promise<boolean>;

  delete(item: AvailableSubscriptions): Promise<boolean>;
}

export default AvailableSubscriptionsRepository;
