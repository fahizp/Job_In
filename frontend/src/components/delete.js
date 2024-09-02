import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Deleteaccount() {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8001/profile/deleteaccount/${userId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message || "Account deleted successfully");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleDeleteClick = () => {
    toast.info(
      <div>
        <p>Are you sure you want to delete your account?</p>
        <button
          onClick={() => {
            handleDelete();
            toast.dismiss();
          }}
          className="btn btn-danger me-2"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="btn btn-secondary"
        >
          No
        </button>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: "confirmation-toast",
      }
    );
  };

  return (
    <div className="rounded shadow p-4 mt-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <h5 className="text-danger">Delete Account:</h5>
        <div className="row mt-4">
          <h6 className="mb-0">
            Do you want to delete the account? Please press the "Delete"
            button below.
          </h6>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleDeleteClick}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
