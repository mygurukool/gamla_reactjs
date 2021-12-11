import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
