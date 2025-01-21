import {useContext, useState} from "react";
import Login from './Login'
import {UserContext} from '../context/userProvider'
import { patchJSONToDb } from "../helper";
import { useResolvedPath } from "react-router-dom";
const AccountDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName|| "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
  });

  if (!user) return <Login />

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    patchJSONToDb("users", user.id, formData)
    setUser((prevUser) => ({ ...prevUser, ...formData }));
    setIsEditing(false);
  };
    return (
      <main>
      <h1>Account Details</h1>
      {!isEditing ? (
        <div>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Address:</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </main>
  );
};
  
  export default AccountDetails;
  