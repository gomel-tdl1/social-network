import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '6c3a4efe-d4a8-4320-a83f-28987b239f1b'
    }
});

export const usersAPI = {
    getUsers(pageSize = 5, pageNumber = 1) {
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`).then(response => response.data);
    },
    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data);
    },
    deleteFriend(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    },
    getProfile(id = 13857) {
        console.warn('Obsolete method. Please use profileAPI object.');
        return profileAPI.getProfile(id);
    },
    getStatus(id = 13857) {
        console.warn('Obsolete method. Please use profileAPI object.');
        return profileAPI.getStatus(id);
    }
};
export const profileAPI = {
    getProfile(id = 13857) {
        return instance.get(`profile/${id}`)
            .then(response => response.data);
    },
    getStatus(id = 13857) {
        return instance.get(`profile/status/${id}`)
            .then(response => response.data);
    },
    updateStatus(status) {
        return instance.put('profile/status', {status: status});
    },
    updateProfilePhoto(file) {
        let formData = new FormData();
        formData.append('image', file);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    updateProfileDescription(data) {
        return instance.put('profile', {
            "aboutMe": data.aboutMe || null,
            "contacts": {
                facebook: data.facebook || null,
                github: data.github || null,
                instagram: data.instagram || null,
                mainLink: data.mainLink || null,
                twitter: data.twitter || null,
                vk: data.vk || null,
                website: data.website || null,
                youtube: data.youtube || null
            },
            "lookingForAJob": data.lookingForAJob || false,
            "lookingForAJobDescription": data.lookingForAJobDescription || null,
            "fullName": data.fullName
        }).then(response => response.data);
    }
};
export const dialogsAPI = {
    getDialogs() {
        return instance.get('dialogs')
            .then(response => response.data);
    },
    startChatting(userId) {
        return instance.put(`dialogs/${userId}`)
            .then(response => response.data);
    },
    getMessages(friendId, page = 1, count = 8) {
        return instance.get(`dialogs/${friendId}/messages`)
            .then(response => response.data);
    },
    sendMessage(friendId, message) {
        return instance.post(`dialogs/${friendId}/messages`, {
            body: message
        }).then(response => response.data);
    }
};


export const authAPI = {
    isAuth() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },
    loginOnSite(email, password, rememberMe = false, captcha) {
        return instance.post('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        });
    },
    logout() {
        return instance.delete('auth/login');
    },
    getCaptcha() {
        return instance.get('security/get-captcha-url').then(response => response.data);
    }
};
