export const postRequest = async (endpoint, payload) => {
    const requestOptions = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }

    try {
        await fetch(endpoint, requestOptions)
    } catch {
        throw Error(`Error during posting ${payload} to ${endpoint}`)
    }
}