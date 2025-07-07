"use client"

import { useState, useContext } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Card,
  CardMedia,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Container,
} from "@mui/material"
import {
  PhotoCamera,
  ShoppingCart,
  Category,
  AttachMoney,
  Description,
  ArrowBack,
  CheckCircle,
  Inventory,
} from "@mui/icons-material"
import { useHistory } from "react-router-dom"
import useProducts from "../hooks/useProducts"
import { AuthContext } from "../hooks/AuthContext"

const steps = ["Información Básica", "Detalles del Producto", "Imagen y Confirmación"]

function CreateProduct() {
  const { createProduct, loading, error } = useProducts()
  const { auth } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const history = useHistory()

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !photo || !price || !description || !auth?.email || !category) {
      alert("Por favor, completa todos los campos.")
      return
    }
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", auth.email)
    formData.append("photo", photo)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("category", category)

    await createProduct(formData)

    setName("")
    setPhoto(null)
    setPrice("")
    setDescription("")
    setPreview("")
    setCategory("")
    setShowSuccessDialog(true)
  }

  const handleBack = () => {
    history.push("/")
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
  }

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "electronics":
        return "📱"
      case "clothes":
        return "👕"
      case "vehicles":
        return "🚗"
      default:
        return "📦"
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                  border: "1px solid #e9ecef",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>
                    <ShoppingCart />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                    Información del Producto
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Nombre del Producto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Inventory sx={{ color: "#4CAF50", mr: 1 }} />,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(76, 175, 80, 0.25)",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4CAF50",
                    },
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                  border: "1px solid #e9ecef",
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>
                    <Category />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                    Categoría
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Selecciona una categoría</InputLabel>
                  <Select
                    labelId="category-label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Selecciona una categoría"
                    required
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4CAF50",
                      },
                    }}
                  >
                    <MenuItem value="electronics">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ mr: 1 }}>📱</Typography>
                        Electronics
                      </Box>
                    </MenuItem>
                    <MenuItem value="clothes">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ mr: 1 }}>👕</Typography>
                        Clothes
                      </Box>
                    </MenuItem>
                    <MenuItem value="vehicles">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ mr: 1 }}>🚗</Typography>
                        Vehicles
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
                {category && (
                  <Chip
                    label={`${getCategoryIcon(category)} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
                    sx={{
                      mt: 2,
                      bgcolor: "#4CAF50",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                  border: "1px solid #e9ecef",
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>
                    <AttachMoney />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                    Precio
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Precio del Producto"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1, color: "#4CAF50", fontWeight: 600 }}>$</Typography>,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4CAF50",
                    },
                  }}
                />
                {price && (
                  <Typography
                    variant="h4"
                    sx={{
                      mt: 2,
                      color: "#4CAF50",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    ${price}
                  </Typography>
                )}
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                  border: "1px solid #e9ecef",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>
                    <Description />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                    Descripción del Producto
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Describe tu producto en detalle"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)",
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4CAF50",
                    },
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                  border: "1px solid #e9ecef",
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar sx={{ bgcolor: "#4CAF50", mr: 2 }}>
                    <PhotoCamera />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                    Imagen del Producto
                  </Typography>
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                  id="photo-upload"
                  required
                />
                <label htmlFor="photo-upload">
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      borderRadius: 3,
                      border: "2px dashed #4CAF50",
                      backgroundColor: "rgba(76, 175, 80, 0.05)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(76, 175, 80, 0.1)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(76, 175, 80, 0.2)",
                      },
                    }}
                  >
                    <PhotoCamera sx={{ fontSize: 48, color: "#4CAF50", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600 }}>
                      Subir Imagen
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                      Haz clic para seleccionar una imagen
                    </Typography>
                  </Paper>
                </label>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              {preview ? (
                <Fade in={!!preview} timeout={500}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#4CAF50",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Vista Previa
                      </Typography>
                    </Box>
                    <CardMedia
                      component="img"
                      image={preview}
                      alt="Vista previa de la foto"
                      sx={{
                        height: 250,
                        objectFit: "contain",
                        bgcolor: "grey.50",
                      }}
                    />
                  </Card>
                </Fade>
              ) : (
                <Card
                  sx={{
                    p: 4,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <Box>
                    <PhotoCamera sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      La imagen aparecerá aquí
                    </Typography>
                  </Box>
                </Card>
              )}
            </Grid>
          </Grid>
        )
      default:
        return "Unknown step"
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                Crear Nuevo Producto
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Panel de Gestión de Inventario
              </Typography>
            </Box>
            <IconButton
              onClick={handleBack}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
            >
              <ArrowBack />
            </IconButton>
          </Box>
        </Paper>

        {/* Stepper */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "&.Mui-active": {
                        color: "#4CAF50",
                      },
                      "&.Mui-completed": {
                        color: "#4CAF50",
                      },
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            {getStepContent(activeStep)}
          </Paper>

          {/* Navigation Buttons */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                sx={{
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#45a049",
                    backgroundColor: "rgba(76, 175, 80, 0.05)",
                  },
                }}
              >
                Anterior
              </Button>

              <Box sx={{ display: "flex", gap: 2 }}>
                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    sx={{
                      bgcolor: "#4CAF50",
                      fontWeight: 600,
                      px: 4,
                      "&:hover": {
                        bgcolor: "#45a049",
                      },
                    }}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      bgcolor: "#4CAF50",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      px: 6,
                      py: 1.5,
                      boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                      "&:hover": {
                        bgcolor: "#45a049",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 35px rgba(76, 175, 80, 0.4)",
                      },
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CircularProgress size={20} sx={{ color: "white" }} />
                        <Typography>Creando...</Typography>
                      </Box>
                    ) : (
                      "🚀 Crear Producto"
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>

          {/* Error Message */}
          {error && (
            <Fade in={!!error}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  mt: 2,
                  bgcolor: "error.light",
                  color: "error.contrastText",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "error.main",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ⚠️ Error: {error}
                </Typography>
              </Paper>
            </Fade>
          )}
        </form>
      </Container>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        PaperProps={{
          sx: {
            borderRadius: 4,
            minWidth: 400,
            textAlign: "center",
          },
        }}
      >
        <DialogTitle sx={{ pt: 4 }}>
          <CheckCircle sx={{ fontSize: 64, color: "#4CAF50", mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#4CAF50" }}>
            ¡Producto Creado!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem" }}>
            Tu producto ha sido agregado exitosamente al inventario
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <Button
            onClick={handleCloseSuccessDialog}
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#4CAF50",
              fontWeight: 600,
              borderRadius: 3,
              px: 6,
              py: 1.5,
              "&:hover": {
                bgcolor: "#45a049",
              },
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CreateProduct
