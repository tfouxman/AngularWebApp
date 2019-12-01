export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    role: string;
    active: boolean;
    emailVerified: boolean;
}
