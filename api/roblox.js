export default async function handler(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");

	const { endpoint } = req.query;

	if (!endpoint) {
		return res.status(400).json({ error: "Missing endpoint parameter" });
	}

	const allowedBases = [
		"https://apis.roblox.com/",
		"https://games.roblox.com/",
		"https://badges.roblox.com/",
	];

	const isAllowed = allowedBases.some(base => endpoint.startsWith(base));
	if (!isAllowed) {
		return res.status(403).json({ error: "Endpoint not allowed" });
	}

	try {
		const response = await fetch(endpoint);
		const data = await response.json();
		return res.status(200).json(data);
	} catch (err) {
		return res.status(500).json({ error: "Proxy fetch failed", detail: err.message });
	}
}
