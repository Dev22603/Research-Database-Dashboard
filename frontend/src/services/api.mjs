import axios from "axios";
import { BASE_URL, endpoints } from "./apiEndPoints.mjs";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || BASE_URL,
});

export const fetchConferences = ({
	startDate = null,
	endDate = null,
	authorName = null,
	impactFactor = null,
}) => {
	return api.get(
		`${endpoints.GET_CONFERENCES}?startDate=${startDate}&endDate=${endDate}&authorName=${authorName}&impactFactor=${impactFactor}`
	);
};
