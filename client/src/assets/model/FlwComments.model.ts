export class FlwComment {
    id: string;
    owner: string;
    tarComment: string;
    content: string;
    time: string;
    hotIndex: number;


    allArgs(id: string, owner: string, tarComment: string, content: string, time: string, hotIndex: number) {
        this.id = id;
        this.owner = owner;
        this.tarComment = tarComment;
        this.content = content;
        this.time = time;
        this.hotIndex = hotIndex;
    }
}
