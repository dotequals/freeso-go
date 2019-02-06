const fetchXml = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();

    return text;
  } catch (error) {
    throw error;
  }
};

export default fetchXml;