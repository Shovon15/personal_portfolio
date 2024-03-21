/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				// Routes this applies to
				source: "/api/v1/:path*",
				// Headers
				headers: [
					// Allow for specific domains to have access or * for all
					{
						key: "Access-Control-Allow-Credentials",
						value: "true",
					},
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
					// Allows for specific methods accepted
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS",
					},
					// Allows for specific headers accepted (These are a few standard ones)
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization",
					},
				],
			},
		];
	},
	images: {
		domains: ["res.cloudinary.com"], // Add Cloudinary hostname here
	},
};

export default nextConfig;
