interface Repository<Domain> {
    create(domain: Domain): void

    find(id: any): Promise<Domain>

    findAll(): Promise<Domain[]>

    update(domain: Domain): void

    delete(id: any): void
}

export default Repository
