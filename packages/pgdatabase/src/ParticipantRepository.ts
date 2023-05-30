import UUID from "domain/src/UUID"
import {Participant} from "domain/src/"
import {ParticipantRepository} from "domain/src/"
import {pg} from "./pg"

class NodePGParticipantRepository
    implements ParticipantRepository<Participant> {
    public async create(data: Participant): Promise<Participant> {
        return data
    }

    public async find(id: UUID): Promise<Participant> {
        try {
            const result = (
                await pg.query("SELECT * FROM participant WHERE id = $1", [id])
            ).rows[0]

            if (!result) throw new Error("Participant not found")

            return new Participant(result.first_name, result.last_name, result.tag)
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    // make this async
   public async findAll(): Promise<Participant[]> {
        try {
            const result = (
                await pg.query("SELECT * FROM participant")
            ).rows

            if (!result) throw new Error("Participant not found")

            return result.map((row) => new Participant(row.first_name, row.last_name, row.tag))
        } catch (err: any) {
            throw new Error(err.message)
        }
   }

    public async update(data: Participant): Promise<Participant> {
        return data
    }

    public async delete(id: UUID): Promise<boolean> {
        return true
    }
}

export default NodePGParticipantRepository
