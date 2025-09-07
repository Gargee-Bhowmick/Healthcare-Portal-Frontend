import React, { useContext } from "react";
import AppContext from "../../context/appContext";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Avatar,
  Badge,
  Stack
} from "@mui/material";
import {
  Search,
  FilterList,
  Download,
  Description,
  LocalHospital,
  Assignment,
  Biotech,
  Vaccines,
  MedicalServices,
  CalendarToday,
  Person,
  Business,
} from "@mui/icons-material";

const MedicalHistory = () => {
  
  const {searchTerm, setSearchTerm, 
    categoryFilter, setCategoryFilter, 
    dateFilter, setDateFilter, 
    selectedRecord, setSelectedRecord, 
    openDialog, setOpenDialog, 
    medicalRecords, 
    categories, 
    dateFilters} = useContext(AppContext);

  const getFileIcon = (fileType, category) => {
    if (fileType === "pdf" && category === "Lab Results") return <Biotech color="primary" />;
    if (fileType === "image" || category === "X-Ray/Imaging") return <LocalHospital color="info" />;
    if (category === "Prescription") return <MedicalServices color="success" />;
    if (category === "Vaccination Record") return <Vaccines color="warning" />;
    if (fileType === "pdf") return <Description color="error" />;
    return <Assignment color="action" />;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "error";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || record.category === categoryFilter;
    
    let matchesDate = true;
    if (dateFilter !== "All") {
      const recordDate = new Date(record.date);
      const now = new Date();
      const diffTime = Math.abs(now - recordDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case "Last 30 days": matchesDate = diffDays <= 30; break;
        case "Last 3 months": matchesDate = diffDays <= 90; break;
        case "Last 6 months": matchesDate = diffDays <= 180; break;
        case "Last year": matchesDate = diffDays <= 365; break;
        default: matchesDate = true;
      }
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Typography variant="h4" fontWeight={700} color="primary.dark">
                Medical History
              </Typography>
            </Stack>
            <Divider sx={{ mb: 3 }} />

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search records, doctors, hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateFilter}
                label="Date Range"
                onChange={(e) => setDateFilter(e.target.value)}
              >
                {dateFilters.map((filter) => (
                  <MenuItem key={filter} value={filter}>
                    {filter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ height: "56px" }}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Records Grid */}
      <Grid container spacing={3}>
        {filteredRecords.map((record) => (
          <Grid item xs={12} sm={6} lg={4} key={record.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.light" }}>
                    {getFileIcon(record.fileType, record.category)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                      {record.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {record.category}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.5 }}>
                  {record.description}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="textSecondary">
                      {formatDate(record.date)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {record.doctorName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Business sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {record.hospital}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", px: 2, pb: 2 }}>
                <Button
                  size="small"
                  onClick={() => handleViewRecord(record)}
                  variant="outlined"
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredRecords.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center", mt: 3 }}>
          <Typography variant="h6" color="textSecondary">
            No medical records found
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Try adjusting your search or filter criteria
          </Typography>
        </Paper>
      )}

      {/* Record Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedRecord && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {getFileIcon(selectedRecord.fileType, selectedRecord.category)}
                <Box>
                  <Typography variant="h6">{selectedRecord.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedRecord.category}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedRecord.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Category
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedRecord.category}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Date
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {formatDate(selectedRecord.date)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    File Type
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedRecord.fileType.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Doctor
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedRecord.doctorName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Hospital/Clinic
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedRecord.hospital}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button variant="outlined" startIcon={<Download />}>
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MedicalHistory;