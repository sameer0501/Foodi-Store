import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  // console.log(image_hosting_key);
  const onSubmit = async (data) => {
    // console.log(data);

    const imageFile = { image: data.photoURL[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (hostingImg.data.success) {
      const name = data.name;
      const photoURL = hostingImg.data.data.display_url;
      // console.log(photoURL);
      // const photoURL = data.photoURL;

      try {
        const result = await updateUserProfile(name, photoURL);
        // console.log("uploading...");
        alert("Photo is Updated!");
        navigate("/");
        // console.log(result);
      } catch (error) {
        console.error("Error in uploading");
      }
    } else {
      console.log("server not able to upload ... please try later ");
    }

    // image: hostingImg.data.data.display_url,

    // const name = data.name;
    // const photoURL =
    // "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    // updateUserProfile(name, photoURL)
    //   .then(() => {
    //     // Profile updated!
    //     alert("Profile updated successfully");
    //   })
    //   .catch((error) => {
    //     console.log(photoURL);
    //     console.log("server not able to upload ... please try later ");
    //     // An error occurred
    //     // ...
    //   }

    // );
  };
  return (
    <div className="flex items-center justify-center h-screen max-w-md mx-auto ">
      <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="file"
              {...register("photoURL")}
              className="w-full mt-1 file-input"
            />
            {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
          </div>
          <div className="mt-6 form-control">
            <input
              type="submit"
              value={"Update"}
              className="text-white btn bg-green"
            />
          </div>

          {/*    <div className="w-full my-6 form-control">
            <input
              {...register("image", { required: true })}
              type="file"
              className="w-full max-w-xs file-input"
            />
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
