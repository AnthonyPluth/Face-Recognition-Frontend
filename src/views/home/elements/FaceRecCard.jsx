import React from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import MaterialCard from "../../../components/shared/card";
import { useApiContext } from "../../../components/contexts/ApiContext";

// Make identity a dictionary containing name, confidence

export default function RegistrationCard() {
  const { identity, confidence, processedFrame } = useApiContext();

  return (
    <MaterialCard title="Face Recognition">
      <CardContent>
        <Typography data-testid="user_name">Name: {identity}</Typography>
        <Typography>
          Confidence:{" "}
          {confidence &&
            (confidence / 100).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
            })}
        </Typography>
        <img
          src={`data:image/webp;base64,${processedFrame}`}
          width={"100%"}
          alt="processed frame"
        />
      </CardContent>
    </MaterialCard>
  );
}
