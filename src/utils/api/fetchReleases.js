const fetchReleases = async (owner, repo) => {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases`;
    const response = await fetch(url);
    const json = await response.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export default fetchReleases;