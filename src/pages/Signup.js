import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signup1 } from "../firebase/auth";
import firebase from "../firebase/config";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
function Signup(props) {
  const [isLoading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    console.log("Data:");
    console.log(data);
    let newUser;
    setLoading(true);

    console.log(`isLoading set to ${isLoading}`);
    try {
      newUser = await signup1(data);
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
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    ref={register}
                  />
                </label>
              </div>
              <div className="field">
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    ref={register}
                  />
                </label>
              </div>
            </div>
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
            <div className="btn-group">
              <button className="ui primary button login" type="submit">
                Sign Up  {" "} <SiGnuprivacyguard/>
              </button>
               <div className="mt-2">{" "}OR </div>{" "}
               <Link to="/login" className="text-secondary mt-2">
               Login In {" "} <GoSignIn />
               </Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

/*
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui.card.login-card {
  width: 450px;
}

.login.button {
  float: right;
}

.ui.form input[type=text],
.ui.form input[type=password],
.ui.form select {
  margin-top: 10px;
}
*/
