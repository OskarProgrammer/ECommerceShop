import { NavLink, Outlet, useLoaderData } from "react-router-dom"
import { getRequest } from "../API/getRequest"

export const HomeLayout = () => {
    const loaderData = useLoaderData()

    return(
        <div className="container col-lg-12 col-md-12 col-sm-12 col-10 text-dark text-center rounded">
            <h1 className="display-1 py-5 fst-italic my-4">E-commerce shop</h1>
            <div className="row py-4">
                <div className="container col-lg-5 col-md-5 col-sm-5 col-5 text-start">
                    <NavLink to="/" className="btn btn-outline-dark btn-lg"><i className="bi bi-house"></i></NavLink>
                </div>
                <div className="container col-lg-5 col-md-5 col-sm-5 col-5 text-end">
                    {!loaderData.isLogged ? <NavLink to="/login" className="btn btn-outline-success btn-lg">Sign in</NavLink> : ""}
                    
                    {loaderData.isLogged ? <NavLink to="/logOut" className="btn btn-outline-danger btn-lg">Log out</NavLink> : ""}
                </div>
            </div>

            <div className="container my-4 p-5">
                <Outlet/>
            </div>
        </div>
    )
}


export const homeLayoutLoader = async () => {
    const currentUser = await getRequest("http://localhost:3000/currentUser")
    return currentUser
}