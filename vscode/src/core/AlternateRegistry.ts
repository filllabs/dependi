export class AlternateRegistry {
    name: string = "";
    index?: string;
    token?: string;

    constructor(name: string, index?: string, token?: string) {
        this.name = name;
        this.index = index;
        this.token = token;
    }
}

