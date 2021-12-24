export class User {
    id: string;
    nickName: string;
    email: string;
    avatarUrl: string;
    password: string;
    birthday: string;
    gender: string;
    statement: string;
    regDate: string;
    point: number;
    loginTime: number;
    lastLogin: string;
    follows: number;
    followed: number;
    psgNum: number;
    collectNum: number;
    likedNum: number;

    allArgs(id: string, nickname: string, email: string, avatarUrl: string, password: string, birthday: string, gender: string, statement: string, regDate: string, point: number, loginTime: number, lastLogin: string, follows: number, followed: number, psgNum: number, collectNum: number, likedNum: number) {
        this.id = id;
        this.nickName = nickname;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
        this.statement = statement;
        this.regDate = regDate;
        this.point = point;
        this.loginTime = loginTime;
        this.lastLogin = lastLogin;
        this.follows = follows;
        this.followed = followed;
        this.psgNum = psgNum;
        this.collectNum = collectNum;
        this.likedNum = likedNum;
    }

    nomoralCst(id: string, nickname: string, email: string, password: string) {
        this.id = id;
        this.nickName = nickname;
        this.email = email;
        this.password = password;
        this.birthday = null;
        this.gender = '保密';
        this.statement = '这个人很懒，什么也没写';
        this.regDate = null;
        this.point = 0;
        this.loginTime = 0;
        this.lastLogin = null;
        this.follows = 0;
        this.followed = 0;
        this.psgNum = 0;
        this.collectNum = 0;
        this.likedNum = 0;
    }
}
