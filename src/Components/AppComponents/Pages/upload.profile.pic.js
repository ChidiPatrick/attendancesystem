import React, { useState } from "react";

/// Third-party imports ///
import { useSelector } from "react-redux";

/// Local directory imports ///
import NavBar from "./navBar";
import Menu from "./menu";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/firebase";
import { ButtonFull } from "../../LandingPageComponents/Buttons/buttons";

function UploadProfilePicture() {
  /// Redux states ///
  const displayMenu = useSelector((state) => state.menuSlice.displayMenu);

  /// Local states ////
  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  console.log(uploadPercentage);

  /// File change handler ////
  const handleChange = (e) => {
    setFile(e.target.files);
  };
  console.log(file);

  /// Filr upload handlers /////
  const handleUpload = (e) => {
    const storageRef = ref(storage, `files/${file.name}`);

    const uploadObject = uploadBytesResumable(storageRef, file);

    uploadObject.on(
      "state_changed",
      (snapshot) => {
        const uploadPercentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress ///
        setUploadPercentage(uploadPercentage);
      },

      // Handle error //
      (err) => console.log(err),

      // download url
      () => {
        getDownloadURL(uploadObject.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  return (
    <div className="w-full h-screen bg-user-profile p-4">
      <NavBar>profile picture</NavBar>
      <div className="my-[100px] flex flex-col justify-center items-center">
        <h3 className="font-bold text-xl my-5">Set Profile Picture</h3>
        <p className="text-center">
          Please upload a clear picture of you for your profile
        </p>
        <div className={`w-[${uploadPercentage * 2}px] p-2 bg-green-300`}>
          <div
            className={`w-full bg-lp-secondary text-lp-primary h-[10px] border rounded-xl`}
          >
            {uploadPercentage}
          </div>
        </div>
        <div className="w-full flex justify-center items-center my-20">
          <label
            className="w-[80%] bg-lp-secondary border rounded-xl flex justify-center items-center text-white p-2"
            htmlFor="inputFile"
          >
            Select picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="inputFile"
          />
          <ButtonFull handleClick={handleUpload}>Upload picture</ButtonFull>
        </div>
      </div>
      {displayMenu === true ? <Menu /> : null}
    </div>
  );
}

export default UploadProfilePicture;
