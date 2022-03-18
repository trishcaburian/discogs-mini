import { useEffect, useState } from 'react';
import Status from "../Interfaces/Status";
import Item from "../Interfaces/Item";

const ItemEditPopup = ({ status_id, item , is_add} : { status_id?: number, item?: Item, is_add: boolean}) => {
    function submitForm() {
        // add stuff here
    }

    return (
        <div>This should be a popup!</div>
    );
};

export default ItemEditPopup;
