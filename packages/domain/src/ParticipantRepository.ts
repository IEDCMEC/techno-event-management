import { Repository } from 'database/src/';
import UUID from './UUID';

interface ParticipantRepository<Participant> extends Repository<Participant> {
  create(domain: Participant): Promise<Participant>;

  find(id: UUID): Promise<Participant>;

  findAll(): Promise<Participant[]>;

  update(domain: Participant): Promise<Participant>;

  delete(id: UUID): Promise<boolean>;
}

export default ParticipantRepository;
