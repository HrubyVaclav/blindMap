import {AppBar, Box, Button, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import store, {type RootState} from "../../features/store";
import {setLogin} from "../../features/login/loginSlice.ts";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

function Header() {
    const isLoggedIn = useSelector((state: RootState) => state.login.value);
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        store.dispatch(setLogin(null));
        navigate("/");
    }

    return (
        <AppBar sx={{backgroundColor: '#3784c1'}} position="static">
            <Toolbar sx={{ display: "flex" }}>
                <IconButton size="large" edge="start" color="inherit">
                    <SportsSoccerIcon />
                </IconButton>

                <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                    <Button color="inherit" component={Link} to="/blindMap">
                        <Typography variant="h6">Blind map</Typography>
                    </Button>
                    <Button color="inherit" component={Link} to="/leagues">
                        <Typography variant="h6">Leagues</Typography>
                    </Button>
                    {role === "ADMINISTRATOR" && (
                        <Button color="inherit" component={Link} to="/users">
                            <Typography variant="h6">Users</Typography>
                        </Button>
                    )}
                </Stack>

                {/* Push login/logout to the right */}
                <Box sx={{ ml: "auto" }}>
                    {isLoggedIn ? (
                        <Button variant="contained" onClick={handleLogout}>
                            <Typography variant="h6">Logout</Typography>
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            component={Link}
                            to="/authenticate"
                        >
                            <Typography variant="h6">Login</Typography>
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;