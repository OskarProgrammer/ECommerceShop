import { Form, redirect, useActionData } from "react-router-dom"
import { getRequest } from "../API/getRequest"
import { putRequest } from "../API/putRequest"

export const LoginPage = () => {
    const dataFromForm = useActionData()

    return(
        <div className="container col-lg-12">
            <h1 className="display-5">Login Page</h1>
            <Form method="POST" className="container col-lg-5 d-flex flex-column mx-auto row">
                <input type="text" className="col-lg-6 col-md-6 my-2 m-auto p-2" placeholder="Login" name="login"/>
                <input type="password" className="col-lg-6 col-md-6 my-2 m-auto p-2" placeholder="Password" name="password"/>
                {dataFromForm && dataFromForm.error && <p className="text-danger py-3">{dataFromForm.error}</p>}
                <button className="btn btn-outline-success col-lg-3 col-md-3 col-5 m-auto my-2">Submit</button>
            </Form>
        </div>
    )
}


export const loginPageAction = async ({ request }) => {
    const data = await request.formData()
    const users = await getRequest("http://localhost:3000/users/")


    const login = data.get("login")
    const password = data.get("password")

    if (login == "" || password == ""){
        return {error: "Login and password must be provided"}
    }

    let isFound = false
    let newCurrentUser = {}

    users.map((user)=>{
        if (user.login == login && user.password == password) {
            isFound = true
            newCurrentUser = {
                id: user.id,
                isLogged: true,
                isAdmin: user.isAdmin
            }
        }
    })

    if (!isFound) {
        return { error: "Login or password is invalid"}
    }

    await putRequest("http://localhost:3000/currentUser/", newCurrentUser)


    return redirect("/")
}