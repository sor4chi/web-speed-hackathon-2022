export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await fetch(url, { responseType: "json" });
  if (res.status !== 200) throw new Error("Failed to fetch");
  const data = await res.json();
  return data;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await fetch(url, {
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  if (res.status !== 200) throw new Error("Failed to fetch");
  const data = await res.json();
  return data;
};
