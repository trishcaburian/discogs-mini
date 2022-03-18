import itemStyles from "../../styles/Item.module.css";
import no_album from "../../public/no-album.png";
import Item from "../Interfaces/Item";
import { Draggable } from 'react-beautiful-dnd';

const ItemCard = ({ album } : { album: Item,  }) => {
    // add a "..." button that shows a list of the following actions:
    // More: shows a popup with the additional item info. Has a button "Edit" to edit this info
    // Delete: shows popup "Do you really want to delete this item?".... etc.
    return (
        <Draggable key={album.id} draggableId={album.title} index={album.list_index}>
            {(provided) => (
                <div className={itemStyles.item_card} {...provided.draggableProps}
                     {...provided.dragHandleProps} ref={provided.innerRef}>
                    <img src={no_album.src} alt='logo' width={75} height={75} className={itemStyles.album_art}/>
                    <div className={itemStyles.album_title}>
                        {album.title}
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default ItemCard;
