import React from 'react';
import {GoSignOut} from "react-icons/go";
import { Logout } from "./firebase/auth";
import { useHistory } from "react-router-dom";
import { useSession } from './firebase/UserProvider';
function Header() {
  const history = useHistory();
  const {user} = useSession();
  return (
    <header>
      <div className="row">
        <div className="col-4">
          <button className="btn btn-link mb-5" onClick = {() => {
            history.push("/");
          }}>
            <h2>The Grid</h2>
          </button>
        
        </div>
        <div className="col-4">

        </div>
        <div className="col-2">

        </div>
        <div className="col-2">
          {user  && 
            <button className="btn btn-link m-2 text-uppercase font-weight-bold text-white"
            onClick = {
              async () => {console.log("logout");
              await Logout();
              history.push("/login",{ from: "HomePage" });
              // history.replace("./signup");
            }
            }> Logout {" "}
            <GoSignOut />
        </button>
        }
        </div>
      </div>
      
      
    </header>
  )
}

export default Header;