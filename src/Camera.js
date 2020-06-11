import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'
import Popup from 'reactjs-popup'
import {
  getIdentityFromSnapshot,
  recordSnapshot,
  trainModel,
} from './apiConfig'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

export default class CameraComponent extends Component {
  constructor(props) {
    super(props)
    // this.state = { value: props.value}
    this.state = { buttonText: 'Start Recording', isRecording: false }

    this.getSnapshot = this.getSnapshot.bind(this)
    this.handleScreenshot = setInterval(this.getSnapshot, 200)
  }

  toggleRecording = () => {
    if (this.state.isRecording) {
      this.setState((state) => ({
        buttonText: 'Start Recording',
        isRecording: !state.isRecording,
      }))
    } else {
      this.setState((state) => ({
        buttonText: 'Stop Recording',
        isRecording: !state.isRecording,
      }))
    }
  }

  trainModel = async () => {
    const trainingStatus = await trainModel()
  }

  setNewUserName = (e) => {
    this.setState({ newUserName: e.target.value })
  }

  getSnapshot = async () => {
    const currScreenshot = this.refs.webcam.getScreenshot()
    if (this.state.isRecording) {
      console.log(this.state.newUserName)
      const identity = await recordSnapshot(
        this.state.newUserName,
        currScreenshot
      )
    } else {
      const identity = await getIdentityFromSnapshot(currScreenshot)
      this.setState({
        image: identity.framed_image,
        name: identity.name,
        confidence: identity.confidence,
      })
    }
  }

  render() {
    const recordingState = this.state.recordingState
    const { audio, height, width, screenshotFormat } = this.props

    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6} width="400px">
          <Card>
            <CardHeader title="Face Recognition" />
            <CardContent>
              <Typography>Name: {this.state.name}</Typography>
              <Typography>Confidence: {this.state.confidence}</Typography>
              <img
                src={`data:image/png;base64,${this.state.image}`}
                width={400}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card>
            <CardHeader title="Train New User" />
            <CardContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="string"
                value={this.state.newUserName}
                onChange={this.setNewUserName}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={this.toggleRecording}
              >
                {this.state.buttonText}
              </Button>
              <Button size="small" onClick={this.trainModel}>
                Train Model
              </Button>
            </CardActions>
          </Card>
          <Webcam
            ref="webcam"
            audio={audio}
            height={height}
            width={width}
            screenshotFormat="image/png"
          />
        </Grid>
      </Grid>
    )
  }
}

CameraComponent.propTypes = {
  id: PropTypes.string,
  audio: PropTypes.bool,
  screenshotFormat: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  screenshot: PropTypes.string,
  recordingState: PropTypes.bool,
}

CameraComponent.defaultProps = {
  audio: false,
  height: 0,
  width: 400,
  screnshotFormat: 'image/png',
  recordingState: false,
}
