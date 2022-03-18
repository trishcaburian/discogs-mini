import { useEffect, useState } from 'react';
import Status from "../Interfaces/Status";
import Item from "../Interfaces/Item";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import {FormControl, InputLabel} from "@mui/material";

const ItemEditPopup = ({ status_id, item , is_add, open, statuses, handleClose } : { status_id?: number, item?: Item, is_add: boolean, open: boolean, statuses: Status, handleClose: Function}) => {

    const [ formItems, setFormItems ] = useState([]);
    const [ hasError, setHasError ] = useState<boolean>(false);
    const [ errorMsg, setErrorMsg ] = useState<string>('');
    const showError = () => setHasError(true);
    const closeError = () => setHasError(false);

    if (status_id === undefined) {
        //default to "Want"
        status_id = 1;
    }

    function submitForm() {
        if (validateForm()) {

        } else {
            showError();
        }
    }

    function validateForm() {
        // validate formItems here
        let valid = false;
        let msg = 'spooky';

        // validation code here

        if (valid) {
            return true;
        } else {
            console.log('fail');
            setErrorMsg(msg);
            return false;
        }
    }

    // add onChange to the fields to make them editable w/ value
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {is_add ? 'Add' : 'Edit' } Album
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Album Title"
                        variant="standard"
                        fullWidth
                        value={(item && item.title !== undefined) ? item.title : ""}
                    />
                    <TextField
                        id="artist"
                        label="Artist"
                        variant="standard"
                        value={(item && item.artist !== undefined) ? item.artist : ""}
                    />
                    <TextField
                        id="price"
                        label="Price (in PHP)"
                        variant="standard"
                        value={(item && item.price !== undefined) ? item.price : ""}
                    />
                    <TextField
                        id="comment"
                        label="Comment"
                        variant="standard"
                        value={(item && item.comment !== undefined) ? item.comment : ""}
                    />

                    <FormControl variant="standard">
                        <InputLabel id="status-field-label">Status</InputLabel>
                        <Select
                            labelId="status-field-label"
                            id="status"
                            label="Status"
                            value={(item && item.status_id !== undefined) ? item.status_id : status_id}
                        >
                            {Object.keys(statuses).map((key, index) => {
                                // @ts-ignore
                                return <MenuItem key={key} value={statuses[key].id}>{statuses[key].name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={submitForm}>Subscribe</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={hasError}
                    onClose={closeError}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText>
                        Error: {errorMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeError}>CLose</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ItemEditPopup;
