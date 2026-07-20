export interface IUser {
    _id: string,
    fullName: string;
    email: string;
    number: string;
    password: string;

    initials?: string;
    avatarUrl?: string;

    isActive: boolean;
    last_active?: Date;

    sessionId?: string;
    isDeleted: boolean;
}