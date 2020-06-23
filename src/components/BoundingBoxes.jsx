import * as React from "react";

const BoundingBoxes = (props) => {
  const bboxes = props.boundingBoxes;
  return (
    <svg
      viewBox={`-8 0 ${props.maxScreenshotWidth} ${
        props.maxScreenshotWidth * 0.75
      }`}
      style={{
        position: "absolute",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {bboxes !== undefined &&
        bboxes.map((bbox, index) => (
          <rect
            key={index}
            id="boundingbox"
            x={bbox.x}
            y={bbox.y}
            width={bbox.w}
            height={bbox.h}
            strokeWidth={3}
            stroke="#eb4034"
            fillOpacity="0"
          />
        ))}
    </svg>
  );
};
export default BoundingBoxes;
