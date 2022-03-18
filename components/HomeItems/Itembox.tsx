import { useEffect, useState } from "react";
import itemStyles from "../../styles/Item.module.css";
import ItemCard from "./ItemCard";
import Status from "../Interfaces/Status";
import Item from "../Interfaces/Item"
import {supabase} from "../../utils/supabaseClient";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ItemEditPopup from "./ItemEditPopup";
import { Modal } from "@mui/material";

const Itembox = ( { status, handleOpenForm } : { status: Status, handleOpenForm: any } ) => {

    const [ showAddItem, setShowAddItem ] = useState<boolean>(false);

    return (
        <div className={itemStyles.box}>
            <div className={itemStyles.category_label}>
                <span>{status.name}</span>
                <Button onClick={handleOpenForm} size="small" color="secondary" className={itemStyles.add_button}>
                    <AddIcon fontSize={"small"} /> Add
                </Button>
            </div>
            <hr/>
            <Droppable droppableId={status.name}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {Object.keys(status.items).map((key, index) => {
                            // @ts-ignore
                            return <ItemCard key={key} album={status.items[key]}/>
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/*<ItemEditPopup is_add={true} open={open} handleClose={handleClose} handleOpen={handleOpen}></ItemEditPopup>*/}
        </div>
    );
}

export default Itembox;
