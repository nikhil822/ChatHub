// export const host = 'http://localhost:5001'
export const host = 'https://chat-hub-backend.vercel.app'
export const registerRoute = `${host}/api/auth/signup`
export const loginRoute = `${host}/api/auth/login`
export const setAvatarRoute = `${host}/api/auth/setAvatar`
export const allUsersRoute = `${host}/api/auth/allusers`
export const sendMessageRoute = `${host}/api/messages/addmsg`
export const getAllMessagesRoute = `${host}/api/messages/getmsg`