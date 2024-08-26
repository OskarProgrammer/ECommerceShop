import { NavLink, Outlet } from "react-router-dom"

export const HomeLayout = () => {


    return(
        <div className="container col-lg-12 col-md-12 col-sm-12 col-10 text-light bg-dark text-center rounded">
            <h1 className="display-1 py-5 fst-italic my-4">E-commerce shop</h1>
            <div className="row py-4">
                <div className="container col-lg-5 col-md-5 col-sm-5 col-5 text-start">
                    <NavLink to="/" className="btn btn-outline-light btn-lg"><i className="bi bi-house"></i></NavLink>
                </div>
                <div className="container col-lg-5 col-md-5 col-sm-5 col-5 text-end">
                    <NavLink to="/login" className="btn btn-outline-light btn-lg">Sign in</NavLink>
                </div>
            </div>

            <div className="container my-4 p-5">
                <Outlet/>
            </div>
        </div>
    )
}