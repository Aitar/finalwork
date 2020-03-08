export class Passage {
    psgId: string;
    title: string;
    subtitle: string;
    content: string;
    userId: string;
    commentsNumber: string;
    likeNumber: string;


    constructor(passId: string, title: string, subtitle: string, content: string, userId: string, commentsNumber: string, likeNumber: string) {
        this.psgId = passId;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.userId = userId;
        this.commentsNumber = commentsNumber;
        this.likeNumber = likeNumber;
    }
}
