const sendRequest = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

export default sendRequest;