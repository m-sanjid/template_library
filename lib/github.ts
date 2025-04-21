import axios from "axios";

export const fetchComponentCode = async (repoUrl: string) => {
	try {
		const url = repoUrl
			.replace("github.com", "raw.githubusercontent.com")
			.replace("/blob/", "/");
		const { data } = await axios.get(url);
		return data;
	} catch (error) {
		console.error("Error fetching component from GitHub:", error);
		throw new Error("Failed to fetch component");
	}
};
