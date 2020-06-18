import * as React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: "100%",
  },
});

const MaterialCard = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Grid item xs={6} className={classes.card}>
      <Card>
        {props.title && <CardHeader title={props.title} />}
        {children}
      </Card>
    </Grid>
  );
};

MaterialCard.defaultProps = {
  value: "NOT SET",
};

export default MaterialCard;
