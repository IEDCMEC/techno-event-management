import UUID from "../UUID";

class User {
    public id: UUID;
    public name: string;
    public email: string;
    public password: string;

    constructor(id: UUID, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export default User;
