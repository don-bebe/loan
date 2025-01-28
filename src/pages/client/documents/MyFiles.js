import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const documentTypes = ["ID", "proof of income", "proof of residence"];

export default function MyFiles({ submitForm }) {
  const [availableDocumentTypes, setAvailableDocumentTypes] =
    useState(documentTypes);
  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const temp = {};
    if (documents.length === 0) {
      temp.documents = "At least one document is required.";
    }
    setErrors(temp);
    return Object.values(temp).length === 0;
  };

  const handleAddDocument = () => {
    if (availableDocumentTypes.length === 0) return;
    setDocuments([...documents, { type: "", file: null, disabled: false }]);
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = [...documents];
    const removedDocument = updatedDocuments.splice(index, 1)[0];
    setDocuments(updatedDocuments);

    if (removedDocument.type) {
      setAvailableDocumentTypes((prevTypes) => [
        ...prevTypes,
        removedDocument.type,
      ]);
    }
  };

  const handleDocumentChange = (index, field, value) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index][field] = value;

    if (field === "type") {
      updatedDocuments[index].disabled = true;
      setAvailableDocumentTypes((prevTypes) =>
        prevTypes.filter((type) => type !== value)
      );
    }

    setDocuments(updatedDocuments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      documents.forEach((doc, idx) => {
        // Ensure the field names are in the correct format for the backend
        formData.append(`documents[${idx}][type]`, doc.type);
        formData.append(`documents[${idx}][file]`, doc.file);
      });
      submitForm(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {documents.map((doc, index) => (
          <Grid container spacing={2} alignItems="center" key={index}>
            <Grid item xs={5}>
              {doc.disabled ? (
                <TextField
                  fullWidth
                  label="Document Type"
                  value={doc.type}
                  InputProps={{ readOnly: true }}
                  sx={{ marginTop: 1 }}
                />
              ) : (
                <FormControl fullWidth sx={{ marginTop: 1 }}>
                  <InputLabel id={`document-type-label-${index}`}>
                    Document Type
                  </InputLabel>
                  <Select
                    labelId={`document-type-label-${index}`}
                    value={doc.type}
                    onChange={(e) =>
                      handleDocumentChange(index, "type", e.target.value)
                    }
                  >
                    {availableDocumentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                type="file"
                onChange={(e) =>
                  handleDocumentChange(index, "file", e.target.files[0])
                }
                sx={{ marginTop: 1 }}
              />
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <IconButton
                color="secondary"
                onClick={() => handleRemoveDocument(index)}
                sx={{ marginTop: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDocument}
            disabled={availableDocumentTypes.length === 0}
          >
            Add Document
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button
            variant="outlined"
            color="default"
            onClick={() => setDocuments([])}
            sx={{ marginLeft: 2 }}
          >
            Reset
          </Button>
        </Grid>
        {errors.documents && (
          <Grid item xs={12}>
            <p style={{ color: "red", marginTop: "10px" }}>
              {errors.documents}
            </p>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
