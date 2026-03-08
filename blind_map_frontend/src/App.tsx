import BlindMapPage from "./component/ui/BlindMapPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import store from "./features/store";
import {Provider} from "react-redux";
import Header from "./component/ui/Header";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const queryClient = new QueryClient();

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {main: "#3784c1"},
        secondary: {main: "#f50057"},
    },
});

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <BrowserRouter>
                            <Header/>
                            <Routes>
                                <Route path="/" element={<BlindMapPage/>}/>
                                <Route path="/blindMap" element={<BlindMapPage/>}/>
                            </Routes>
                        </BrowserRouter>
                    </Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;