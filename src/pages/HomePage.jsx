import { redirect, useLoaderData } from "react-router-dom"
import { getRequest } from "../API/getRequest"
import { getRequestID } from "../API/getRequestID"
import { putRequest } from "../API/putRequest"


export const HomePage = () => {
    const [items, currentUser] = useLoaderData()

    const addToBasket = async (id) => {
        const currentUser = await getRequest("http://localhost:3000/currentUser")
        const currentBasket = await getRequestID("http://localhost:3000/baskets/", currentUser.id)
        let items = await getRequestID("http://localhost:3000/items/", id)

        items.amount = items.amount - 1


        currentBasket.items.push(id)

        await putRequest(`http://localhost:3000/baskets/${currentUser.id}`, currentBasket)
        await putRequest(`http://localhost:3000/items/${id}`, items)

        return redirect("/")
    }

    return (
        <div className="container text-center">
            {items.map((item, index)=>(
                <div className="col-lg-10 bg-dark m-auto row p-3 rounded shadow-lg mb-5" key={index}>
                    {index % 2 == 0 ? <div className="col-lg-6 my-auto text-light">
                        <h2 className="display-3 bg-light text-dark rounded-pill">{item.name}</h2>
                    </div> : <div className="col-lg-6 text-light p-3">
                        <h5 className="">Description:</h5>
                        <p>{item.description}</p>
                        <h5>Price:</h5>
                        <p>{item.price}</p>
                        <h5>Amount:</h5>
                        <p>{item.amount}</p>
                            {currentUser.isLogged ?
                                <>
                                    <button type="submit" className="btn btn-outline-success btn-lg col-lg-5 mx-auto ">Add to basket</button>
                                </>
                             : ""}
                    </div>}
                    {index % 2 == 0 ? <div className="col-lg-6 text-light p-3">
                        <h5 className="">Description:</h5>
                        <p>{item.description}</p>
                        <h5>Price:</h5>
                        <p>{item.price}</p>
                        <h5>Amount:</h5>
                        <p>{item.amount}</p>
                        {currentUser.isLogged ? <>
                            <button type="submit" className="btn btn-outline-success btn-lg col-lg-5 mx-auto" onClick={()=>{addToBasket(item.id)}}>Add to basket</button>
                        </> : ""}
                    </div> : <div className="col-lg-6 my-auto text-light">
                        <h2 className="display-3 bg-light text-dark rounded-pill">{item.name}</h2>
                    </div>}
                </div>            
            ))}
        </div>
    )
}

export const homePageLoader = async () => {
    const items = await getRequest("http://localhost:3000/items/")
    const currentUser = await getRequest("http://localhost:3000/currentUser/")

    return [items, currentUser]
}
