export class FlwMap{
    id: string;
    follower: string;
    followed: string;

    allArgs(id: string, flwer: string, flwed: string) {
        this.id = id;
        this.follower = flwer;
        this.followed = flwed;
    }
}
