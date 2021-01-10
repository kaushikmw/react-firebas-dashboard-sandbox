import React, {useEffect, useState}  from "react";
import { useForm } from "react-hook-form";
import { firestore } from "../firebase/config";
import { useSession } from "../firebase/UserProvider";
import {useParams} from "react-router-dom";
import { updateUserDocument } from "../firebase/user";
// import { setLogLevel } from "firebase";

const Profile = () => {
    const { user } = useSession();
    const [userDocument, setuserDocument] = useState(null);
    const {register, setValue, handleSubmit} = useForm();
    const params = useParams();
    const [isLoading,setisLoading] = useState(false);

    useEffect(() => {
        const docRef = firestore.collection('users').doc(params.uid);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setuserDocument(documentData);
        console.log(`Name: ${documentData.email}`);
        // const formData = Object.entries(documentData).map((entry) => ({
        //   [entry[0]]: entry[1],
        // }));
        // const formData = Object.entries(documentData).map((entry) => ({
        //     [entry[0]]: entry[1],
        //   }));
        // console.log("formData");console.log(formData);
        setValue("name",documentData.name);
        setValue("email",documentData.email);
        setValue("address",documentData.address);
        setValue("city",documentData.city);
        setValue("state",documentData.state);
        setValue("zip",documentData.zip)
        setValue("specialty",documentData.specialty);
        setValue("ip",documentData.ip);
        setValue("phone",documentData.phone);
      }
    });
    return unsubscribe;
    },[user.uid, setValue, params.uid]);

    if(!userDocument){
        return null;
    }
    
    const formClassName = `ui big form ${isLoading ? 'Loading' : ''}`;
    const onSubmit = async (data) => {
        try {
            console.log("data");console.log(data);
            setisLoading(true);
            await updateUserDocument({uid: params.uid, data});
        } catch (error) {
            console.log(error);
        }finally{
            setisLoading(false);
        }

    }
    return (
        <>
                    <div
      className="add-form-container"
      style={{ maxWidth: 960, margin: '50px auto' }}
    >
      <form className={formClassName} onSubmit = {handleSubmit(onSubmit)}>
        <div className="fields">
          <div className="eight wide field">
            <label>
              Name
              <input type="text" name="name" ref={register} />
            </label>
          </div>
          <div className="eight wide field">
            <label>
              Email
              <input type="text" name="email"  ref={register} />
            </label>
          </div>
        </div>
        <div className="fields">
          <div className="six wide field">
            <label>
              Address
              <input type="text" name="address" ref={register} />
            </label>
          </div>
          <div className="five wide field">
            <label>
              City
              <input type="text" name="city" ref={register} />
            </label>
          </div>
          <div className="two wide field">
            <label>
              State
              <input type="text" name="state" ref={register} />
            </label>
          </div>
          <div className="three wide field">
            <label>
              Zip
              <input type="text" name="zip" ref={register} />
            </label>
          </div>
        </div>
        <div className="equal width fields">
          <div className="field">
            <label>
              Phone
              <input type="text" name="phone" ref={register} />
            </label>
          </div>
          <div className="field">
            <label>
              Specialty
              <select className="specialty" name="specialty" ref={register}>
                <option value="field agent">Field Agent</option>
                <option value="covert operations">Covert Operations</option>
                <option value="intelligence officer">
                  Intelligence Officer
                </option>
              </select>
            </label>
          </div>
          <div className="field">
            <label>
              ip
              <input type="text" name="ip" ref={register}/>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="ui submit large grey button right floated"
        >
          Submit
        </button>
      </form>
    </div>

        </>
    )
}

export default Profile;