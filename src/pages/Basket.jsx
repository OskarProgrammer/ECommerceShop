/* eslint-disable react/jsx-key */
import { useLoaderData, useNavigate } from "react-router-dom"
import { getRequest } from "../API/getRequest"
import { getRequestID } from "../API/getRequestID"
import { useEffect } from "react"

export const Basket = () => {
    const basketInfo = useLoaderData()
    const navigate = useNavigate()

    useEffect(() => {
        const check = setTimeout(() => { navigate(".") }, 1)
        return () => {
            clearTimeout(check)
        }
    },[])


    return(
        <div className="container-lg-12 row">
            <div className="col-lg-6 text-center">
                <h1 className="display-5">Basket info</h1>
                {basketInfo.length == 0 ? <h3 className="mt-5 text-danger">Your basket is empty</h3> : 
                basketInfo.map((item)=>(
                    <div className="container col-lg-12">
                        {item.name}
                    </div>
                ))}
            </div>
            <div className="col-lg-6 text-center">
                <h1 className="display-5">Basket payment</h1>
                {basketInfo.length == 0 ? <h3 className="mt-5 text-danger">Payment form will show when you will have some items to buy</h3> : ""}
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
    let items = []

    basket.items.map(async (item)=>{
        let itemInfo = await getRequestID("http://localhost:3000/items/", item)
        items.push(itemInfo)
    })
 
    return items
}