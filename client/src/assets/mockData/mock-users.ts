import {User} from '../model/User.model';

export const mockUsers: User[] = [
    new User(
        'user1',
        'test1',
        'test1@test.com',
        '123456',
        '男',
        'src/assets/example.png',
    ),
    new User(
        'user2',
        'test2',
        'test2@test.com',
        '123456',
        '女',
        'src/assets/example.png',
    )
];
