import React from "react";
import { useState } from "react";
import axios from "axios";
import cloudBg from "../images/cloudBackground.png";

function LandingPage() {
  // Modal variable
  const [showSignIn, setShowSignIn] = useState(false);
  const triggerModalSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  // Form variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    // Call API to sign in user

    // Reset form

    // Reset error messages
  };

  return (
    <>
      {/* Modal */}
      <ModalSignIn
        title="Sign In"
        showModal={showSignIn}
        setShowModal={triggerModalSignIn}
      />

      <div 
      className="flex justify-center items-center h-screen"
      style={{ backgroundImage: `url(${cloudBg})` }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Cloud Inventory
          </h1>
          <p className="text-gray-600">Your professional inventory storage.</p>
          <div className="mt-8">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
              onClick={() => triggerModalSignIn()}
            >
              Sign In
            </button>
            <button className="bg-sky-500 text-white px-4 py-2 rounded-md">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ModalSignIn({ showModal, setShowModal, title }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");

  // Form validation
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  React.useEffect(() => {
    // Check if the modal is open
    if (showModal) {
      // Reset the state
      setEmail("");
      setPassword("");
    }
  }, [showModal]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let isValidate = true;

      // Validate input
      if (email === "") {
        setEmailError("Email is required");
        isValidate = false;
      }
      if (password === "") {
        setPasswordError("Password is required");
        isValidate = false;
      }

      if (!isValidate) {
        return; // don't submit
      }

      let body = {
        email: email,
        password: password,
      };

      await axios({
        method: "POST",
        url: `/api/users/login`,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Reset form after successful submission
      setEmail("");
      setPassword("");

      // Reset error messages
      setEmailError("");
      setPasswordError("");
      setStatusMessage("");

      setShowModal(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "No user found"
      ) {
        console.error("User not found. Please check your credentials.");
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
      }
    }
  };

  if (!showModal) return null;
return (
  <>
    <div
      style={{
        position: "fixed",
        zIndex: "99",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{ backgroundColor: "white" }}
        className="flex justify-center items-center rounded-lg"
      >
        <div className="relative w-auto my-6 mx-auto max-w-xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3
                className="text-3xl font-semibold"
                style={{ color: statusMessage !== "" ? "red" : "black" }}
              >
                {statusMessage || title}
              </h3>
              {/* Upper right 'x' button */}
              <button
                type="button"
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setShowModal(false);
                  //reset value
                  setEmail("");
                  setPassword("");

                  //reset error
                  setStatusMessage("");

                  setShowModal(false);
                }}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <form onSubmit={handleSubmit}>
              <div
                style={{ overflow: "auto", maxHeight: "400px" }}
                className="flex flex-col p-5 flex-auto gap-6"
              >
                {/* ROW 1 */}
                <div className="flex gap-6">
                  <div style={{ width: "500px" }}>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      email
                      {emailError && (
                        <span style={{ color: "red" }}>
                          {" "}
                          ({emailError})
                        </span>
                      )}
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value !== "") setEmailError("");
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    //reset value
                    setEmail("");
                    setPassword("");

                    //reset error
                    setStatusMessage("");
                  }}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
);

}

export default LandingPage;
