import { redirect, useLoaderData } from "react-router-dom"
import { putRequest } from "../API/putRequest"

export const LogOutPage = () => {
    const loaderData = useLoaderData()

    redirect("/")

    return (<></>)
}

export const logOutLoader = async () => {
    let newCurrent = {
        id: "",
        isLogged: false,
        isAdmin: false
    }

    await putRequest("http://localhost:3000/currentUser", newCurrent)

    return redirect("/")
}