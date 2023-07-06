const host = ['http://localhost:5001', 'https://chat-hub-backend.vercel.app']
export const registerRoute = host.map(url => `${url}/api/auth/signup`)