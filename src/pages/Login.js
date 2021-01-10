import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../firebase/auth";
import firebase from "../firebase/config";
import {GoSignIn} from "react-icons/go";
import { SiGnuprivacyguard } from "react-icons/si";
import {Link} from "react-router-dom";

function Login(props) {
  const [isLoading, setLoading] = useState(false);
  const onSubmit = async (data) => {
   console.log(data);
    let newUser;
    setLoading(true);

    console.log(`isLoading set to ${isLoading}`);
    try {
      newUser = await login(data);
      reset();
    } catch (error) {
      console.error(error);
    }

    (newUser) ? props.history.push(`/profile/${newUser.uid}`) : setLoading(false);
  };

  const formClassName = `ui form ${isLoading ? "loading" : ""}`;
  const { register, handleSubmit, reset } = useForm();
  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div className="two fields">
              
            <div className="field">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={register}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Password
                <input type="password" name="password" placeholder="Password"  ref={register}/>
              </label>
            </div>
            
            <div >
                <button className="btn btn-primary" type="submit">
                    Login In {" "} <GoSignIn />
                </button> 
                {" "} <div className="mt-4">OR </div>{" "}
                <Link to="/signup" className="text-secondary mt-3">
                    Signup {" "} <SiGnuprivacyguard/>
                </Link>
            </div>
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;