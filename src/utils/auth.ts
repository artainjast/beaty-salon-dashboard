export const hasToken = () => {
    return !!localStorage.getItem('accessToken');
}