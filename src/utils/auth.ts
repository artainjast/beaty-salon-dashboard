import { isServerSide } from "./ssr";

export const hasToken = () => {
    return !isServerSide && !!localStorage.getItem('accessToken');
}