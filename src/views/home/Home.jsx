import React from "react";
import Grid from "@material-ui/core/Grid";
import FaceRecCard from "./elements/FaceRecCard";
import RegistrationCard from "./elements/RegistrationCard";
import WebcamComponent from "./elements/WebcamComponent";
import ApiStatus from "./elements/ApiStatus";
import { ApiContextProvider } from "../../components/contexts/ApiContext";

export default function HomeView() {
  return (
    <ApiContextProvider>
      <ApiStatus />
      <Grid container direction="column" alignItems="center" spacing={2}>
        <FaceRecCard />
        <RegistrationCard />
        <WebcamComponent />
      </Grid>
    </ApiContextProvider>
  );
}
