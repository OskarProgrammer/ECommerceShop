export const getRequest = async (endpoint) => {
    let data = []

    try {
        data = await fetch(endpoint)
    } catch {
        throw Error(`Error during getting data from ${endpoint}`)
    }

    return data.json()
}