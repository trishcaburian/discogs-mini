import itemStyles from "../../styles/Item.module.css";
import no_album from "../../public/no-album.png";
import Item from "../Interfaces/Item";
import { Draggable } from 'react-beautiful-dnd';

const ItemCard = ({ album } : { album: Item,  }) => {
    // change Draggable index to something else!
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
