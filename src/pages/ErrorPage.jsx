import { Link, useRouteError } from "react-router-dom"

export const ErrorPage = () => {
    const error = useRouteError()

    return(
        <div className="containter text-center my-5 text-dark">
            <h1 className="display-1">
                Ops there was an error!!!
            </h1>
            <p className="display-4 fw-bolder">{error.message}</p>
            <Link to="/" className="btn btn-outline-dark btn-lg m-5">Home Page</Link>
        </div>
    )
}