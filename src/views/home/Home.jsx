import React, { Component } from "react";
import {
  getIdentityFromSnapshot,
  recordSnapshot,
  trainModel,
} from "../../helpers/faceRecApi";
import MaterialButton from "../../components/shared/button";
import MaterialCard from "../../components/shared/card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { WebcamContextProvider } from "../../components/contexts/WebcamContext";
import { ApiStatusContextProvider } from "../../components/contexts/ApiStatusContext";
import WebcamComponent from "./elements/webcam";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Start Recording",
      isRecording: false,
      image: null,
      name: "Face not detected",
      confidence: "0.00%",
    };
  }

  toggleRecording = () => {
    if (this.state.isRecording) {
      this.setState((state) => ({
        buttonText: "Start Recording",
        isRecording: !state.isRecording,
      }));
    } else {
      this.setState((state) => ({
        buttonText: "Stop Recording",
        isRecording: !state.isRecording,
      }));
    }
  };

  trainModel = async () => {
    // Show spinner
    const trainingStatus = await trainModel();
    // Remove spinner
  };

  setNewUserName = (e) => {
    this.setState({ newUserName: e.target.value });
  };

  // getSnapshot = async () => {
  //   const currScreenshot = this.refs.webcam.getScreenshot();

  //   if (this.state.isRecording) {
  //     await recordSnapshot(this.state.newUserName, currScreenshot);
  //   } else {
  //     const identity = await getIdentityFromSnapshot(currScreenshot);
  //     if (identity) {
  //       this.setState({
  //         apiOffline: false,
  //         image: identity.framed_image,
  //         name: identity.name ? identity.name : "Face not detected",
  //         confidence: (identity.confidence / 100).toLocaleString(undefined, {
  //           style: "percent",
  //           minimumFractionDigits: 2,
  //         }),
  //       });
  //     } else {
  //       this.setState({ apiOffline: true });
  //     }
  //   }
  // };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} data-testid="homeView">
        <ApiStatusContextProvider>
          <WebcamContextProvider>
            <WebcamComponent />
          </WebcamContextProvider>
        </ApiStatusContextProvider>
      </div>
    );
  }
}

export default withStyles(useStyles)(HomeView);
