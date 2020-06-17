import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import MaterialButton from "../../../components/shared/button";
import MaterialCard from "../../../components/shared/card";
import { useApiContext } from "../../../components/contexts/ApiContext";
import { apiTrainModel } from "../../../helpers/faceRecApi";

export default function RegistrationCard() {
  const { setNewUserName, isRecording, setIsRecording } = useApiContext();
  const [trainingStatus, setTrainingStatus] = useState("");

  const validate = (values) => {
    const errors = {};

    if (!values.newUserName || values.newUserName === "") {
      if (!isRecording) {
        errors.newUserName = "Name is required";
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { newUserName: "" },
    validate,
    onSubmit: (values) => {
      setNewUserName(values.newUserName);
      setIsRecording(!isRecording);
    },
  });

  const trainModel = async () => {
    setTrainingStatus("in progress");
    await apiTrainModel();
    setTrainingStatus("completed");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setTrainingStatus("");
  };

  return (
    <MaterialCard title="Register New User">
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <TextField
            autoFocus
            fullWidth
            id="newUserName"
            inputProps={{
              "data-testid": "newUserName",
            }}
            variant="outlined"
            type="string"
            label="Name"
            onChange={formik.handleChange}
            error={formik.errors.newUserName !== undefined}
            helperText={formik.errors.newUserName}
            value={formik.values.newUserName}
          />
        </CardContent>
        <CardActions>
          <MaterialButton
            value={isRecording ? "Stop Recording" : "Start Recording"}
            type="submit"
          />
          {trainingStatus === "in progress" ? (
            <CircularProgress data-testid="trainingInProgress" />
          ) : (
            <MaterialButton
              data-testid="trainingButton"
              onClick={trainModel}
              value="Train Model"
            />
          )}
        </CardActions>
      </form>

      <Snackbar
        open={trainingStatus === "completed"}
        onClose={handleClose}
        TransitionComponent={Slide}
        autoHideDuration={10000}
        data-testid="trainingComplete"
      >
        <Alert onClose={handleClose} severity="success">
          Model training is complete
        </Alert>
      </Snackbar>
    </MaterialCard>
  );
}
