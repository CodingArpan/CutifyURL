export interface authenticateTokenReturnType {
    authtoken: boolean;
    userdata: {
        name: string;
        ref: string;
    } | null;
}