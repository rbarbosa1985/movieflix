import jwtDecode from 'jwt-decode';
import history from "./history";

export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName:string;
    userId: number;
}

export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
    const sessionData = localStorage.getItem('authData') ?? '[]';
    const parsedSessionData = JSON.parse(sessionData);
    return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecode = () => {
    const sessionData = getSessionData();

    try{
        const tokenDecoded = jwtDecode(sessionData.access_token);
        return tokenDecoded as AccessToken;
    }catch (error) {
        return {} as AccessToken;
    }

}

export const isTokenValid = () => {
    const accessToken = getAccessTokenDecode();

    return Date.now() <= accessToken.exp * 1000;
}

export const isAuthenticated = () => {
    const sessionData = getSessionData();

    return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = ( routeRoles: Role[] = []) => {
    if (routeRoles.length === 0)
    {
        return true;
    }

    const userToken = getAccessTokenDecode();
    const userRoles = userToken.authorities;

    return routeRoles.some(role => userRoles?.includes(role));
}

export const logout = () => {
    localStorage.removeItem('authData');
    history.replace('/');
}