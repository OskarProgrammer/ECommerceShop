import { Form, redirect, useLoaderData } from "react-router-dom"
import { getRequest } from "../API/getRequest"
import { getRequestID } from "../API/getRequestID"
import { putRequest } from "../API/putRequest"

export const HomePage = () => {
    const [items, currentUser] = useLoaderData()

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
                            {currentUser.isLogged ? <Form method="post" action="/" className="d-flex flex-column p-3">
                                <h5>Id of product: <span name="id">{item.id}</span></h5>
                                <input type="number" name="amount" className="col-lg-2 col-5 mx-auto mb-2 text-center" />
                                <button type="submit" className="btn btn-outline-success btn-lg col-lg-5 mx-auto ">Add to basket</button>
                            </Form> : ""}
                    </div>}
                    {index % 2 == 0 ? <div className="col-lg-6 text-light p-3">
                        <h5 className="">Description:</h5>
                        <p>{item.description}</p>
                        <h5>Price:</h5>
                        <p>{item.price}</p>
                        <h5>Amount:</h5>
                        <p>{item.amount}</p>
                        {currentUser.isLogged ? <Form method="post" action="/" className="d-flex flex-column p-3">
                            <h5>Id of product: <span name="id">{item.id}</span></h5>
                            <input type="number" name="amount" className="col-lg-2 col-5 mx-auto mb-2 text-center" />
                            <button type="submit" className="btn btn-outline-success btn-lg col-lg-5 mx-auto ">Add to basket</button>
                        </Form> : ""}
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

export const homePageAction = async ({request}) => {
    const data = await request.formData()
    const idOfItem = data.get("id")
    const amount = data.get("amount")
    
    console.log(idOfItem, amount)

    const currentUser = await getRequest("http://localhost:3000/currentUser")
    const currentBasket = await getRequestID("http://localhost:3000/baskets/", currentUser.id)
    let items = await getRequestID("http://localhost:3000/items/", idOfItem)

    items.amount = items.amount - amount

    currentBasket.items.push(idOfItem)

    await putRequest(`http://localhost:3000/baskets/${currentUser.id}`, currentBasket)
    await putRequest(`http://localhost:3000/items/${idOfItem}`, items)

    return redirect("/")
}

