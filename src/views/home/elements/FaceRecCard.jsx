import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import MaterialCard from "../../../components/shared/card";
import { ApiContext } from "../../../components/contexts/ApiContext";

export default function RegistrationCard() {
  const apiContext = useContext(ApiContext);
  const { identity, confidence, processedFrame } = apiContext;

  return (
    <MaterialCard title="Face Recognition">
      <CardContent>
        <Typography data-testid="user_name">Name: {identity}</Typography>
        <Typography>
          Confidence:{" "}
          {(confidence / 100).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          })}
        </Typography>
        <img src={`data:image/webp;base64,${processedFrame}`} width={"100%"} />
      </CardContent>
    </MaterialCard>
  );
}
