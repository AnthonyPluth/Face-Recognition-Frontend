import React, { useContext, useState } from "react";
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
import { RegistrationContext } from "../../../components/contexts/RegistrationContext";
import { apiTrainModel } from "../../../helpers/faceRecApi";

export default function RegistrationCard() {
  const registrationContext = useContext(RegistrationContext);
  const { setNewUserName, isRecording, setIsRecording } = registrationContext;
  const [modelTraining, setModelTraining] = useState({
    status: "",
    snackbarOpen: false,
  });

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
      toggleRecording();
    },
  });

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const trainModel = async () => {
    setModelTraining({ ...modelTraining, status: "in progress" });
    await apiTrainModel();
    setModelTraining({ status: "completed", snackbarOpen: true });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setModelTraining({ ...modelTraining, snackbarOpen: false });
  };

  return (
    <MaterialCard title="Register New User">
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <TextField
            autoFocus
            fullWidth
            id="newUserName"
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
          {modelTraining.status === "in progress" ? (
            <CircularProgress />
          ) : (
            <MaterialButton onClick={trainModel} value="Train Model" />
          )}
        </CardActions>
      </form>

      <Snackbar
        open={modelTraining.snackbarOpen}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity="success">
          Training completed; please restart the python API to reload the model
        </Alert>
      </Snackbar>
    </MaterialCard>
  );
}
