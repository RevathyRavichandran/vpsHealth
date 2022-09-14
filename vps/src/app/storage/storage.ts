export const storage = {

    getToken() {
        let userId = localStorage.getItem('token')
            ? localStorage.getItem('token')
            : '';
        return userId;
    },

    setToken(token) {
        localStorage.setItem('token', token ? token : '');
    },

    removeToken() {
        localStorage.removeItem('token');
    },
    
    checkToken() {
        if (localStorage.getItem('token')) {
            return true
        }
        else {
            return false
        }
    },

}