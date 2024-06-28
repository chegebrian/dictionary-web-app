export async function getQuery(url,query) {
    try {
      const response = await fetch(`${url}/${query}`);
      if (!response.ok) throw new Error("invalid response");
      const data = await response.json();
      console.log(data[0]);
      return data;
    } catch (error) {
      console.warn(error.message);
    }
  }