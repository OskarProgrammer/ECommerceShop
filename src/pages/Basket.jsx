import { useLoaderData, useParams } from "react-router-dom"
import { getRequest } from "../API/getRequest"
import { getRequestID } from "../API/getRequestID"

export const Basket = () => {
    const {id} = useParams()
    const basketInfo = useLoaderData()

    return(
        <div className="container-lg-12 row">
            <div className="col-lg-6 text-center">
                <h1 className="display-5">Basket info</h1>
                {basketInfo.items.length == 0 ? <h3 className="mt-5 text-danger">Your basket is empty</h3> : ""}
            </div>
            <div className="col-lg-6 text-center">
                <h1 className="display-5">Basket payment</h1>
                {basketInfo.items.length == 0 ? <h3 className="mt-5 text-danger">Payment form will show when you will have some items to buy</h3> : ""}
            </div>
        </div>
    )
}

export const basketLoader = async ({params}) => {
    const {id} = params
    const currentUser = await getRequest("http://localhost:3000/currentUser/")
    

    if (id != currentUser.id) {
        throw Error("That isnt your account")
    }

    const basket = await getRequestID("http://localhost:3000/baskets/", id)

    return basket
}