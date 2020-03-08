export class Passage {
    passId: string;
    title: string;
    subtitle: string;
    content: string;
    userId: string;
    commentsNumber: string;
    likeNumber: string;


    constructor(passId: string, title: string, subtitle: string, content: string, userId: string, commentsNumber: string, likeNumber: string) {
        this.passId = passId;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.userId = userId;
        this.commentsNumber = commentsNumber;
        this.likeNumber = likeNumber;
    }
}
