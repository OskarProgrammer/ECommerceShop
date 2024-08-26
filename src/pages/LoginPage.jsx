import { Form, redirect } from "react-router-dom"

export const LoginPage = () => {

    return(
        <div className="container col-lg-12">
            <h1 className="display-5">Login Page</h1>
            <Form method="POST" className="container col-lg-5 d-flex flex-column mx-auto row">
                <input type="text" className="col-lg-6 col-md-6 my-2 m-auto p-2" placeholder="Login" name="Login"/>
                <input type="text" className="col-lg-6 col-md-6 my-2 m-auto p-2" placeholder="Password" name="Password"/>
                <button className="btn btn-outline-light col-lg-3 col-md-3 col-5 m-auto my-2">Submit</button>
            </Form>
        </div>
    )
}


export const loginPageAction = async ({ request }) => {
    const data = await request.formData()


    const login = data.get("login")
    const password = data.get("password")

    if (login == "" || password == ""){
        return {error: "Login and password must be provided"}
    }


    return redirect(".")
}