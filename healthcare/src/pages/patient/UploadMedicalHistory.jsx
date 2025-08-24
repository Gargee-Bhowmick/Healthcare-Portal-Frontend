import React, { useContext } from "react";
import AppContext from "../../context/appContext";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  CloudUpload,
  Delete,
  Visibility,
  Description,
  LocalHospital,
  Assignment,
  Add,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DropZone = styled(Box)(({ theme, isDragOver }) => ({
  border: `2px dashed ${isDragOver ? theme.palette.primary.main : theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: "center",
  backgroundColor: isDragOver ? theme.palette.primary.light + "10" : theme.palette.grey[50],
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + "10",
  },
}));

const UploadMedicalHistory = () => {
  const {files, setFiles, 
    isDragOver, setIsDragOver, 
    uploadProgress, setUploadProgress, 
    isUploading, setIsUploading, 
    openDialog, setOpenDialog, 
    selectedFile, setSelectedFile, 
    recordDetails, setRecordDetails, 
    categories} = useContext(AppContext)


  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    processFiles(selectedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (newFiles) => {
    const validFiles = newFiles.filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "application/pdf", "image/jpg"];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    const filesWithId = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadStatus: "pending",
      category: "",
      description: "",
    }));

    setFiles((prev) => [...prev, ...filesWithId]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleViewFile = (file) => {
    const url = URL.createObjectURL(file.file);
    window.open(url, "_blank");
  };

  const handleAddDetails = (file) => {
    setSelectedFile(file);
    setRecordDetails({
      title: file.name.split(".")[0],
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      doctorName: "",
      hospital: "",
    });
    setOpenDialog(true);
  };

  const handleSaveDetails = () => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === selectedFile.id
          ? { ...file, ...recordDetails, hasDetails: true }
          : file
      )
    );
    setOpenDialog(false);
    setSelectedFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) return <Description color="error" />;
    if (fileType.includes("image")) return <LocalHospital color="primary" />;
    return <Assignment color="action" />;
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Update file status to uploaded
          setFiles((prev) =>
            prev.map((file) => ({ ...file, uploadStatus: "uploaded" }))
          );
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Upload Medical Records
      </Typography>

      <Grid container spacing={3}>
        {/* Upload Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Add New Records
            </Typography>

            <DropZone
              isDragOver={isDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input").click()}
            >
              <CloudUpload sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drag & drop files here or click to browse
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Supported formats: PDF, JPG, PNG (Max 10MB each)
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUpload />}
                sx={{ mt: 2 }}
              >
                Choose Files
                <VisuallyHiddenInput
                  id="file-input"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                />
              </Button>
            </DropZone>

            {isUploading && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Uploading files... {uploadProgress}%
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}
          </Paper>

          {/* Files List */}
          {files.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">
                  Selected Files ({files.length})
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={isUploading || files.length === 0}
                  startIcon={<CloudUpload />}
                >
                  Upload All
                </Button>
              </Box>

              <Grid container spacing={2}>
                {files.map((fileItem) => (
                  <Grid item xs={12} key={fileItem.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          {getFileIcon(fileItem.type)}
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" noWrap>
                              {fileItem.name}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                              <Chip
                                size="small"
                                label={formatFileSize(fileItem.size)}
                                variant="outlined"
                              />
                              {fileItem.category && (
                                <Chip
                                  size="small"
                                  label={fileItem.category}
                                  color="primary"
                                  variant="outlined"
                                />
                              )}
                              <Chip
                                size="small"
                                label={fileItem.uploadStatus}
                                color={fileItem.uploadStatus === "uploaded" ? "success" : "default"}
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleViewFile(fileItem)}
                              color="primary"
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleAddDetails(fileItem)}
                              color="info"
                            >
                              <Add />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveFile(fileItem.id)}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Grid>

        {/* Information Panel */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upload Guidelines
            </Typography>
            <Alert severity="info">
              <Typography variant="body2">
                • Supported formats: PDF, JPG, PNG
                <br />
                • Maximum file size: 10MB per file
                <br />
                • Add descriptions for better organization
              </Typography>
            </Alert>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Record Details</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Record Title"
              fullWidth
              value={recordDetails.title}
              onChange={(e) => setRecordDetails(prev => ({ ...prev, title: e.target.value }))}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={recordDetails.category}
                label="Category"
                onChange={(e) => setRecordDetails(prev => ({ ...prev, category: e.target.value }))}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={recordDetails.description}
              onChange={(e) => setRecordDetails(prev => ({ ...prev, description: e.target.value }))}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={recordDetails.date}
              onChange={(e) => setRecordDetails(prev => ({ ...prev, date: e.target.value }))}
            />
            <TextField
              label="Doctor Name"
              fullWidth
              value={recordDetails.doctorName}
              onChange={(e) => setRecordDetails(prev => ({ ...prev, doctorName: e.target.value }))}
            />
            <TextField
              label="Hospital/Clinic"
              fullWidth
              value={recordDetails.hospital}
              onChange={(e) => setRecordDetails(prev => ({ ...prev, hospital: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveDetails} variant="contained">
            Save Details
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UploadMedicalHistory;