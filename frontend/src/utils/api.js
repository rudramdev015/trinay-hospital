const BASE = import.meta.env.VITE_API_URL ?? "";
export const buildApiUrl = (path) => `${BASE}${path}`;
