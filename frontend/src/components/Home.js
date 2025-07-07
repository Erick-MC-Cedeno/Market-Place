"use client"

import { useContext, useState } from "react"
import { styled } from "@mui/material/styles"
import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Link,
  MenuItem,
  Menu,
  Avatar,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Paper,
  Fade,
} from "@mui/material"
import { useHistory } from "react-router-dom"
import {
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material"
import useAuth from "../hooks/useAuth"
import { AuthContext } from "../hooks/AuthContext"
import useProducts from "../hooks/useProducts"

const drawerWidth = 280

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #66BB6A 100%)",
  boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
  backdropFilter: "blur(10px)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 40px rgba(76, 175, 80, 0.15)",
    borderColor: "rgba(76, 175, 80, 0.3)",
  },
}))

const CategoryButton = styled(Button)(({ theme, selected }) => ({
  borderRadius: 25,
  padding: "10px 24px",
  fontWeight: 600,
  fontSize: "0.9rem",
  textTransform: "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: selected ? "none" : "2px solid rgba(76, 175, 80, 0.3)",
  background: selected ? "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)" : "rgba(255, 255, 255, 0.9)",
  color: selected ? "white" : "#4CAF50",
  backdropFilter: "blur(10px)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: selected ? "0 8px 25px rgba(76, 175, 80, 0.4)" : "0 4px 15px rgba(76, 175, 80, 0.2)",
    background: selected ? "linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)" : "rgba(76, 175, 80, 0.1)",
  },
}))

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    border: "2px solid transparent",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: "white",
      borderColor: "rgba(76, 175, 80, 0.3)",
      boxShadow: "0 4px 15px rgba(76, 175, 80, 0.1)",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      borderColor: "#4CAF50",
      boxShadow: "0 4px 20px rgba(76, 175, 80, 0.2)",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4CAF50",
  },
}))

const PaginationButton = styled(Button)(({ theme, active }) => ({
  minWidth: 45,
  height: 45,
  borderRadius: 12,
  margin: "0 4px",
  fontWeight: 600,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: active ? "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)" : "rgba(255, 255, 255, 0.9)",
  color: active ? "white" : "#4CAF50",
  border: active ? "none" : "2px solid rgba(76, 175, 80, 0.3)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: active ? "0 8px 25px rgba(76, 175, 80, 0.4)" : "0 4px 15px rgba(76, 175, 80, 0.2)",
  },
  "&:disabled": {
    opacity: 0.5,
    transform: "none",
  },
}))

function DashboardContent() {
  const { auth } = useContext(AuthContext)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { logoutUser } = useAuth()
  const history = useHistory()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { products, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [submittedKeyword, setSubmittedKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleCloseUserMenu = () => setAnchorElUser(null)
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)

  const handleClickUserMenu = async (e) => {
    e.stopPropagation()
    const action = e.target.innerHTML
    if (action === "Logout") {
      await logoutUser()
      window.location.reload()
    } else if (action === "Settings") {
      history.push("/settings")
    }
    setAnchorElUser(null)
    setDrawerOpen(false)
  }

  const handleContactClick = () => alert("¡Se ha hecho clic en Contactar!")

  const getAvatarColor = (name) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]
    return colors[name.charCodeAt(0) % colors.length]
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleKeywordChange = (e) => setSearchKeyword(e.target.value)

  const handleSearch = () => {
    setSubmittedKeyword(searchKeyword)
    setCurrentPage(1)
  }

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const searchFilteredProducts = filteredProducts.filter((product) => {
    const key = submittedKeyword.toLowerCase()
    if (!key) return true
    const name = product.name?.toLowerCase() || ""
    const description = product.description?.toLowerCase() || ""
    return name.includes(key) || description.includes(key)
  })

  const sortedProducts = [...searchFilteredProducts].sort((a, b) => a.name.localeCompare(b.name))

  const productsPerPage = 12
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const displayProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  if (!auth) return null

  const settings = [
    { label: `Hi, ${auth.firstName}`, icon: null },
    { label: "Settings", icon: <SettingsIcon sx={{ mr: 1 }} /> },
    { label: "Logout", icon: <LogoutIcon sx={{ mr: 1 }} /> },
  ]

  const navItems = [
    { href: "/create", label: "Vender productos" },
    { href: "/contactanos", label: "Contáctanos" },
    { href: "/ubicaciones", label: "Ubicaciones" },
  ]

  const categories = [
    { value: "all", label: "Todos", icon: "🏪" },
    { value: "electronics", label: "Electrónicos", icon: "📱" },
    { value: "clothes", label: "Ropa", icon: "👕" },
    { value: "vehicles", label: "Vehículos", icon: "🚗" },
  ]

  const renderNavLinks = () => (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 1 }}>
      {navItems.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          sx={{
            textDecoration: "none",
            color: "white",
            px: 3,
            py: 1,
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
            {label}
          </Typography>
        </Link>
      ))}
    </Box>
  )

  return (
    <>
      <AppBar position="absolute">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: "24px",
            minHeight: 70,
          }}
        >
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ position: "absolute", left: 16 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", ml: 3 }}>
            <Link href="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <Box
                sx={{
                  m: 1,
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                }}
              >
                <ShoppingBagIcon sx={{ color: "#4CAF50", fontSize: 28 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  ml: 2,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                Silk Road
              </Typography>
            </Link>
          </Box>

          {!isMobile && renderNavLinks()}

          <Box>
            <Tooltip title="Configuración de usuario">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenUserMenu(e)
                }}
                sx={{ p: 0 }}
              >
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${getAvatarColor(auth.firstName)} 0%, ${getAvatarColor(auth.firstName)}CC 100%)`,
                    width: 42,
                    height: 42,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff",
                    border: "3px solid rgba(255, 255, 255, 0.3)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {auth.firstName.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              {settings.map(({ label, icon }) => (
                <MenuItem
                  key={label}
                  onClick={handleClickUserMenu}
                  sx={{
                    py: 1.5,
                    px: 3,
                    "&:hover": {
                      backgroundColor: "rgba(76, 175, 80, 0.08)",
                    },
                  }}
                >
                  {icon}
                  <Typography textAlign="center" sx={{ fontWeight: 500 }}>
                    {label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              background: "linear-gradient(180deg, #2E7D32 0%, #4CAF50 100%)",
              color: "white",
              width: drawerWidth,
            },
          }}
        >
          <Box sx={{ width: drawerWidth, paddingTop: 10 }} role="presentation">
            <List>
              {navItems.map(({ href, label }) => (
                <ListItem
                  button
                  component={Link}
                  key={label}
                  href={href}
                  sx={{
                    py: 2,
                    mx: 2,
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={label} sx={{ color: "white" }} />
                </ListItem>
              ))}
              <Divider sx={{ my: 2, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
              {settings.map(({ label, icon }) => (
                <ListItem
                  button
                  key={label}
                  onClick={handleClickUserMenu}
                  sx={{
                    py: 2,
                    mx: 2,
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {icon}
                  <ListItemText primary={label} sx={{ color: "white" }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}

      <Box
        sx={{
          marginTop: { xs: 10, md: 12 },
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f8e9 100%)",
          minHeight: "100vh",
          pb: 4,
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 4 }}>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 4,
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid rgba(76, 175, 80, 0.1)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 1,
                background: "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              Catálogo de Productos
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400 }}>
              Descubre nuestra selección premium de productos
            </Typography>
          </Paper>

          {/* Search Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(76, 175, 80, 0.1)",
            }}
          >
            <SearchField
              label="Buscar productos..."
              variant="outlined"
              value={searchKeyword}
              onChange={handleKeywordChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#4CAF50" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      sx={{
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)",
                        fontWeight: 600,
                        px: 3,
                        "&:hover": {
                          background: "linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      Buscar
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>

          {/* Categories Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(76, 175, 80, 0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: "#2E7D32" }}>
              Categorías
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {categories.map(({ value, label, icon }) => (
                <CategoryButton
                  key={value}
                  selected={selectedCategory === value}
                  onClick={() => handleCategoryChange(value)}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: "1.1rem" }}>{icon}</Typography>
                    {label}
                  </Box>
                </CategoryButton>
              ))}
            </Box>
          </Paper>

          {/* Products Grid */}
          <Box sx={{ mb: 4 }}>
            {loading ? (
              <Paper sx={{ p: 8, textAlign: "center", borderRadius: 4 }}>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  Cargando productos...
                </Typography>
              </Paper>
            ) : error ? (
              <Paper sx={{ p: 8, textAlign: "center", borderRadius: 4, bgcolor: "#ffebee" }}>
                <Typography variant="h6" color="error">
                  Error: {error}
                </Typography>
              </Paper>
            ) : sortedProducts.length === 0 ? (
              <Paper sx={{ p: 8, textAlign: "center", borderRadius: 4 }}>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  No se encontraron productos.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {displayProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Fade in={true} timeout={300 + index * 100}>
                      <StyledCard>
                        {product.photo && (
                          <CardMedia
                            component="img"
                            height="220"
                            image={product.photo}
                            alt={product.name}
                            sx={{
                              objectFit: "contain",
                              backgroundColor: "#fafafa",
                              p: 2,
                            }}
                          />
                        )}
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2,
                              fontWeight: 700,
                              color: "#2E7D32",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {product.name}
                          </Typography>

                          {product.description && (
                            <Typography
                              variant="body2"
                              sx={{
                                mb: 3,
                                color: "text.secondary",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                lineHeight: 1.6,
                              }}
                            >
                              {product.description}
                            </Typography>
                          )}

                          <Box
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}
                          >
                            <Chip
                              label={`$${product.price}`}
                              sx={{
                                background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)",
                                color: "white",
                                fontWeight: 700,
                                fontSize: "1rem",
                                height: 36,
                              }}
                            />
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleContactClick}
                              sx={{
                                background: "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                                borderRadius: 3,
                                fontWeight: 600,
                                textTransform: "none",
                                px: 3,
                                "&:hover": {
                                  background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
                                  transform: "translateY(-2px)",
                                },
                              }}
                            >
                              Contactar
                            </Button>
                          </Box>
                        </CardContent>
                      </StyledCard>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mt: 6,
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(76, 175, 80, 0.1)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                {/* Botón Anterior */}
                <PaginationButton
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  sx={{
                    px: 3,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Atrás
                </PaginationButton>

                {/* Números de página */}
                {[...Array(totalPages).keys()].map((num) => {
                  const page = num + 1
                  return (
                    <PaginationButton
                      key={page}
                      active={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      sx={{
                        minWidth: 45,
                        height: 45,
                        fontWeight: page === currentPage ? 700 : 500,
                      }}
                    >
                      {page}
                    </PaginationButton>
                  )
                })}

                {/* Botón Siguiente */}
                <PaginationButton
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  sx={{
                    px: 3,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Next
                </PaginationButton>
              </Box>

              {/* Información adicional */}
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                  Página {currentPage} de {totalPages} • Mostrando {displayProducts.length} de {sortedProducts.length}{" "}
                  productos
                </Typography>
              </Box>
            </Paper>
          )}
        </Container>
      </Box>
    </>
  )
}

export default DashboardContent
