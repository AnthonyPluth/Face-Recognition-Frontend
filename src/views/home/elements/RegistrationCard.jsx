import React, { useContext, useState } from "react";
import MaterialButton from "../../../components/shared/button";
import MaterialCard from "../../../components/shared/card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { RegistrationContext } from "../../../components/contexts/RegistrationContext";
import { useFormik } from "formik";
import { apiTrainModel } from "../../../helpers/faceRecApi";

export default function RegistrationCard() {
  const registrationContext = useContext(RegistrationContext);
  const { setNewUserName, isRecording, setIsRecording } = registrationContext;
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    await apiTrainModel();
    setIsLoading(false);
  };

  // getSnapshot = async () => {
  //   const currScreenshot = refs.webcam.getScreenshot();

  //   if (isRecording) {
  //     await recordSnapshot(newUserName, currScreenshot);
  //   } else {
  //     const identity = await getIdentityFromSnapshot(currScreenshot);
  //     if (identity) {
  //       setState({
  //         apiOffline: false,
  //         image: identity.framed_image,
  //         name: identity.name ? identity.name : "Face not detected",
  //         confidence: (identity.confidence / 100).toLocaleString(undefined, {
  //           style: "percent",
  //           minimumFractionDigits: 2,
  //         }),
  //       });
  //     } else {
  //       setState({ apiOffline: true });
  //     }
  //   }
  // };

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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <MaterialButton onClick={trainModel} value="Train Model" />
          )}
        </CardActions>
      </form>
    </MaterialCard>
  );
}
