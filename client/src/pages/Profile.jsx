import { useSelector, useDispatch } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
import { updateUserFailure, updateUserSuccess, updateUserStart, deleteuserFailure, deleteUserSuccess, deleteUserStart, signoutUserStart, signoutUserSuccess, signoutuserFailure } from "../redux/user/userSlice";
import { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Profile = () => {
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef(null);
  const [formData, setFormData] =  useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  console.log(filePerc)
  const [file, setFile] = useState(undefined);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([])
  const dispatch = useDispatch()
  console.log(file)
console.log(formData)


  


//useEffect function for image upload functionality
useEffect(() => {
  if (file) {
    handleFileUpload(file);
  }
}, [file])



const handleFileUpload = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const upLoadTask = uploadBytesResumable(storageRef, file);



  upLoadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //console.log('Upload is' + progress + "% done")
    setFilePerc(Math.round(progress));
  },
   (error) => {
    setFileUploadError(true);
  },
  () => {
    getDownloadURL(upLoadTask.snapshot.ref)
    .then((downloadURL) => 
      setFormData({ ...formData, avatar: downloadURL })
    );
  }
  );
};


const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value })
};


const handleSubmit = async (e) => { 
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false) {
      dispatch(updateUserFailure(data.message));
      return;
    }

    dispatch(updateUserSuccess(data))
    setUpdateSuccess(true);
      } catch (error) {
    dispatch(updateUserFailure(error.message))
  }
}


const handleDeleteUser = async () => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
    method: 'DELETE',
     })
     const data = res.json();
     if (data.success === false) {
      dispatch(deleteuserFailure(data.message))
      return; 
     }
     dispatch(deleteUserSuccess(data))
  } catch (error) {
    dispatch(deleteuserFailure(error.message))
  }
}



const handleSignOut = async ( ) => {
  try {
    dispatch(signoutUserStart());
    const res  = await fetch('/api/auth/sign-out');
    const data = await res.json();
    if(data.success === false) {
      dispatch(deleteuserFailure(data.message))
      return;
    }
    dispatch(deleteUserSuccess(data.message))

  } catch (error) {
    dispatch(deleteuserFailure(error.message)) 

  }
}
console.log(formData)


const handleShowListings = async () => {
  try {
     setShowListingsError(false)
     const res = await fetch(`/api/user/listings/${currentUser._id}`);
     const data = await res.json();
     console.log(data)
     if (data.success === false){
       setShowListingsError(true);
      return
    }
   setUserListings(data);
   console.log(userListings)

  } catch (error) {
    console.log(error);
    setShowListingsError(true)
  }
}



  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className='text-3xl font-semibold text-center my-7'>
      Profile
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <input 
      type="file" 
      ref={fileRef} 
      hidden 
      accept='image/*' 
      onChange={(e) => setFile(e.target.files[0])}/>

      <img 
      onClick={() => fileRef.current.click()} 
      src={formData.avatar || currentUser.avatar} 
      alt='profile' 
      className="rounded-full h-24 -24 object-cover cursor-pointer self-center mt-2"/>
     
     <p className="text-sm self-center">
        {fileUploadError ? ( <span className="text-red-700">Error (Image must be less than 2mb)</span> )
         : filePerc > 0 && filePerc < 100 ? (<span>{`uploading ${filePerc} %`}</span>) 
         : filePerc === 100 ? (<span className="text-green-700">Image uploaded succesfully</span>) : (" ")}
      </p>


      <input type="text" 
      placeholder='username' 
      className="border p-3 
      rounded-lg" 
      id="username" 
      onChange={handleChange}
      defaultValue={currentUser.username}/>

      <input type="email" 
      placeholder='email' 
      className="border p-3 
      rounded-lg" id="email" 
      defaultValue={currentUser.email}/>

      <input 
      type="password" 
      placeholder='password' 
      className="border p-3 rounded-lg" 
      id="password"/>

      <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Update'}</button>

      <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}>
          Create Listing
      </Link>
      
    </form>
    <div className="flex justify-between mt-5">
      
      <span 
      onClick={handleDeleteUser} 
      className="text-red-700 cursor-pointer">
        Delete Account
        </span>

      <span 
      onClick={handleSignOut} 
      className="text-red-700 cursor-pointer">
        Sign Out
        </span>

    </div>

    <p className='text-red-700 mt-5'>{ error ? error : ''}</p>
    <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated successfully' : " "}</p>
      
    <button className="text-green-700 w-full " onClick={handleShowListings}>Show listings</button>

    <p className="text-red-700 mt-5" >{showListingsError ? 'Error showing listings' : ''}</p>               


  <div>  
        <h1 className="text-center my-8 text-2xl fontweight-semibold">Your Listings</h1>

    {userListings && userListings.length > 0 && (
    userListings.map((listing) => (
        <div key={listing._id} className="border rounded-lg flex justify-between item-center gap-4">
          <Link to={`/listing/${listing._id}`}>
          <img
                  src={listing.imageURLs[0]}
                  alt='listing cover' 
                  className='h-16 w-16 object-contain'
                />
          </Link>
          <Link className="text-slate-700 font-semibold hover:underline truncate flex-1" to={`/listing/${listing._id}`}>
            <p>{listing.name}</p>
        </Link>
        <div className="flex flex-col item-center gap-4"> 
        <button className="text-red-700 uppercase mx-2 mt-2">Delete</button>
        <button className="text-blue-700 uppercase">Edit</button>
        </div>


          </div>
    ))
    )}
    </div>
    
  
      </div>
    )
}


export default Profile

