import { useRef, useState } from "react";
import style from "../../../public/styles/Profile.module.css";
import { RxCross1 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const SendImage = ({ sendingImages }) => {
  // console.log("UPDATING UpdateProfileImage");
  const imageInput = useRef();
  const image = useRef();
  const [imageToUpload, setImageToUpload] = useState(null);
  const userdeatils = useSelector((state) => state.userReducer.userdeatils);

  function fileSelected(e) {
    const file = e.target.files[0];
    if (file) {
      image.current.src = URL.createObjectURL(file);
      setImageToUpload(file);
      // setUpdateImage(false);
    } else {
      toast.error("Please select a file", {
        position: "top-center",
      });
    }
  }
  return (
    <div className={`${style.updateImage}`}>
      <img
        ref={image}
        style={{
          height: "auto",
          width: "40%",
          objectFit: "cover",
          aspectRatio: "2/2",
          maxHeight: "60%",
          borderRadius: "10%",
        }}
        src="/images/nodp.png"
        alt=""
        onClick={() => imageInput.current.click()}
      />

      <input
        ref={imageInput}
        style={{ display: "none" }}
        id="file"
        type="file"
        onChange={fileSelected}
        accept="image/*"
      />

      <button
        className="btn btn-success"
        onClick={() => {
          sendingImages(imageToUpload);
        }}
      >
        Send
      </button>

      <RxCross1
        onClick={() => {
          () => sendingImages(null);
        }}
        className={`${style.updateProfileImageCross}`}
      />
      <Toaster />
    </div>
  );
};

export default SendImage;
