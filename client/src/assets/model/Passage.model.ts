export class Passage {
    psgId: string;
    title: string;
    subtitle: string;
    content: string;
    userId: string;
    commentsNumber: string;
    likeNumber: number;
    coverUrl: string;


    constructor(passId: string, title: string, subtitle: string, content: string, userId: string, commentsNumber: string, likeNumber: number, coverUrl: string) {
        this.psgId = passId;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.userId = userId;
        this.commentsNumber = commentsNumber;
        this.likeNumber = likeNumber;
        this.coverUrl = coverUrl;
    }
}
