import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../css/Login.css";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import { getLogin } from "./user-action";
import { userActions } from "./user-slice";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, isAuthenticated, errors } = useSelector(
        (state) => state.user
    );


    const submitHandler = (e) => {

        e.preventDefault();

        dispatch(
            getLogin({
                email,
                password
            })
        );

    };


    useEffect(() => {

        if (isAuthenticated) {

            toast.success("User has logged Successfully");

            navigate("/");

        }

    }, [isAuthenticated, navigate]);


    useEffect(() => {

        if (errors) {

            toast.error(errors);

        }

    }, [errors]);


    return (
        <Fragment>

            <div className="row wrapper">

                {loading && <LoadingSpinner />}

                {!loading && (

                    <div className="col-10 col-lg-5">

                        <form onSubmit={submitHandler}>

                            <h1 className="mb-3">
                                Login
                            </h1>


                            <div className="form-group">

                                <label htmlFor="email_field">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label htmlFor="password_field">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <Link
                                to="/user/forgotPassword"
                                className="float-right mb-4"
                            >
                                Forgot Password?
                            </Link>


                            <button
                                id="login_button"
                                type="submit"
                                className="loginbutton btn-block py-3"
                            >
                                LOGIN
                            </button>


                            <Link
                                to="/signup"
                                className="float-right mt-3"
                            >
                                New User?
                            </Link>

                        </form>

                    </div>

                )}

            </div>

        </Fragment>
    );
};


export default Login;