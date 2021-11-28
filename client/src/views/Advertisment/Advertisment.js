import React, { useState, useEffect } from "react";
import AdvertismentForm from "../../components/Forms/AdvertismentForm";
import AdvertismentCard from "../../components/Card/AdvertismentCard";
import { Toolbar } from "@material-ui/core";
import Popup from "../../components/Popup/Popup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { InputAdornment, ButtonGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SearchRounded from "@material-ui/icons/SearchRounded";
import axios from "axios";
import { HavePermisson } from "../../components/hod/HavePermisson";
import Swal from "sweetalert2";

const Advertisment = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [onlyMydata, setMydata] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [advertismentData, setAdvertismentData] = useState([]);
  const [filteredEvents, setFileredEvents] = useState([]);
  const { user } = props;

  function readAdvertisment() {
    return Promise.resolve().then((opts) => {
      return axios
        .get("http://localhost:5000/api/ad")
        .then((response) => {
          // setUserData(response.data);
          return response.data;
        })
        .catch((err) => {
          console.log("Unable access ...");
        });
    });
  }

  //let [AdvertismentData, setAdvertismentData] = useState([]);
  useEffect(() => {
    readAdvertisment().then((r) => setAdvertismentData(r));
  }, []);

  useEffect(() => {
    setFileredEvents(
      advertismentData.filter(
        (eveent) =>
            eveent.ad_name.toLowerCase().includes(searchName.toLowerCase()) &&
          (onlyMydata ? eveent.creatorId === user._id : true)
      )
    );
  }, [searchName, advertismentData, onlyMydata, user]);

  const handleDelete = (id) => {
    const originalEvents = filteredEvents;
    Swal.fire({
      title: "Are you sure you want to delete this event?",
      text: "You won't be able to revert this change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const events = originalEvents.filter((m) => m._id !== id);
        setFileredEvents(events);
        axios
          .delete(`http://localhost:5000/api/ad/delete/${id}`)
          .then((res) => {
            Swal.mixin({
              toast: true,
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 6000,
            }).fire({
              title: "Advertisment deleted successfully!",
              type: "success",
            });
          })
          .catch((err) => {
            setFileredEvents(originalEvents);
            console.log(err.response);
            Swal.mixin({
              toast: true,
              icon: "error",
              position: "top-end",
              showConfirmButton: false,
              timer: 6000,
            }).fire({
              title: err.response.data.message,
              type: "error",
            });
          });
      }
    });
  };

  return (
    <>
      <div style={{}}>
        <HavePermisson userRoles={["admin", "institute"]}>
          <div style={{ float: "right" }}>
            <Toolbar>
              <Button
                onClick={() => {
                  setOpenPopup(true);
                }}
                variant="contained"
                color="primary"
              >
                {" "}
                Add
              </Button>
            </Toolbar>
          </div>
        </HavePermisson>
      </div>
      <Popup
        title="Add Advertisment"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AdvertismentForm />
      </Popup>

      <Grid container justify="flex-start" spacing={3}>
        {advertismentData &&
        (() => {
          const advertisment = [];
          advertismentData.map((r) => {
            advertisment.push(
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AdvertismentCard advertismentData={r} handleDelete={handleDelete} />
              </Grid>
            );
            return advertismentData;
          });
          return advertisment;
        })()}
      </Grid>
    </>
  );
};

export default Advertisment;
