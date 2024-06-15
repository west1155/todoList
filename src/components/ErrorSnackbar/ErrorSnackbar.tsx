import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";
import { SyntheticEvent } from 'react';


type ErrorSnackbarPropsType = {
    error: string | null
    resetError: () => void
}

export const ErrorSnackbar : React.FC<ErrorSnackbarPropsType> = ({ error, resetError }) => {

    const handleClose = (event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        resetError();
    };
    return (
        <Snackbar
            open={error !== null}
            autoHideDuration={6000}
            onClose={handleClose}
            message={error}
        />
    );
}