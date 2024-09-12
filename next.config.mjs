/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:[
            'lh3.googleusercontent.com', 
            'avatars.githubusercontent.com', 
            'res.cloudinary.com',
            'as2.ftcdn.net',
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
