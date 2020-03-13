export class User {
    userId: string;
    nickname: string;
    email: string;
    password: string;
    gender: string;
    statement: string;
    avaterUrl: string;

    constructor(userId: string, nickname: string, email: string, password: string, gender: string, statement: string, avaterUrl: string) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.statement = statement;
        this.avaterUrl = avaterUrl;
    }
}
