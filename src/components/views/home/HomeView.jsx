import React, { Component } from "react";
import Webcam from "react-webcam";
import {
  getIdentityFromSnapshot,
  recordSnapshot,
  trainModel,
} from "../../../api/faceRecApi";
import MaterialButton from "../../elements/button";
import MaterialCard from "../../elements/card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

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
    this.getSnapshot = this.getSnapshot.bind(this);
    this.handleScreenshot = setInterval(this.getSnapshot, 300);
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

  getSnapshot = async () => {
    const currScreenshot = this.refs.webcam.getScreenshot();

    if (this.state.isRecording) {
      await recordSnapshot(this.state.newUserName, currScreenshot);
    } else {
      const identity = await getIdentityFromSnapshot(currScreenshot);
      if (identity) {
        this.setState({
          apiOffline: false,
          image: identity.framed_image,
          name: identity.name ? identity.name : "Face not detected",
          confidence: (identity.confidence / 100).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
        });
      } else {
        this.setState({ apiOffline: true });
      }
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} data-testid="homeView">
        {this.state.apiOffline ? (
          <div data-testid="offlineAlert">
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Python backend is offline
            </Alert>
          </div>
        ) : (
          <div data-testid="apiOnline">
            <Grid container direction="column" alignItems="center" spacing={2}>
              <MaterialCard title="Face Recognition">
                <CardContent>
                  <Typography data-testid="user_name">
                    Name: {this.state.name}
                  </Typography>
                  <Typography>Confidence: {this.state.confidence}</Typography>
                  <img
                    src={`data:image/png;base64,${this.state.image}`}
                    width={"100%"}
                  />
                </CardContent>
              </MaterialCard>

              <MaterialCard title="Register New User">
                <CardContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="string"
                    value={this.state.newUserName}
                    onChange={this.setNewUserName}
                  />
                </CardContent>
                <CardActions>
                  {/* Don't allow recording without completing form */}
                  <MaterialButton
                    onClick={this.toggleRecording}
                    value={this.state.buttonText}
                  />
                  <MaterialButton
                    onClick={this.trainModel}
                    value="Train Model"
                  />
                </CardActions>
              </MaterialCard>
            </Grid>
          </div>
        )}
        <Webcam
          ref="webcam"
          audio={false}
          height={0}
          width={0}
          minScreenshotWidth={500}
          // minScreenshotHeight={720}
          screenshotFormat="image/png"
        />
      </div>
    );
  }
}
export default withStyles(useStyles)(HomeView);
