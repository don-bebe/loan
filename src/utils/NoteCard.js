import React from "react";
import { Card, CardHeader, IconButton } from "@mui/material";

export default function NoteCard(props) {
  const { title, icon, details } = props;
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          avatar={icon}
          action={<IconButton>{details}</IconButton>}
          title={title}
        />
      </Card>
    </div>
  );
}
