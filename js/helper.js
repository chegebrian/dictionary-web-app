export async function getQuery(url, query) {
  try {
    const response = await fetch(`${url}/${query}`);
    if (!response.ok) throw new Error("invalid response");
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error.message);
  }
}
