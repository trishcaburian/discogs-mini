import {useEffect, useState} from "react";
import Itembox from "./HomeItems/Itembox";
import { supabase } from "../utils/supabaseClient";
import Status from "./Interfaces/Status";
import { DragDropContext } from 'react-beautiful-dnd';
import Item from "./Interfaces/Item";

const Dashboard = () => {
    const [statuses, setStatuses] = useState<object | Status>({});
    const [ updateFlag, setUpdateFlag ] = useState<boolean>(false);

    useEffect(() => {
       const fetchData = async () => {
           try {
               let { data } = await supabase
                   .from('status')
                   .select('*, items (*)');

               if (data) {
                   data.forEach((val: any) => {
                       let index = 0;
                       val.items.forEach((item: Item) => {
                           item.list_index = index;
                           index++;
                       })
                   });

                   setStatuses(data);
               }
           } catch (error: any) {
               alert(error.message);
           }
       }
       console.log('test');
       fetchData().catch(console.error);
    }, [updateFlag]);

    async function updateAlbumStatus(album_id: number, new_status_id: number) {
        try {
            const { data } = await supabase
                .from('items')
                .update({status_id: new_status_id})
                .match({id: album_id});

        } catch (error: any) {
            alert(error);
        }
    }

    function handleOnDragEnd(result: object) {
        if (!result.destination) {
            return;
        }

        let source_list = statuses.find((obj: any) => {
            // @ts-ignore
            return obj.name === result.source.droppableId;
        });
        let source_list_items = source_list.items;
        const [reorderedItem] = source_list_items.splice(result.source.index, 1);

        // run if destination is different
        if (result.source.droppableId != result.destination.droppableId) {
            let destination_list = statuses.find((obj: any) => {
                // @ts-ignore
                return obj.name === result.destination.droppableId;
            });
            let destination_list_items = destination_list.items;
            destination_list_items.splice(result.destination.index, 0, reorderedItem);

            const update = async () => {
                await updateAlbumStatus(reorderedItem.id, destination_list.id)
            };

            update().then(() => {
                setUpdateFlag(!updateFlag);
            });
        } else {
            source_list_items.splice(result.destination.index, 0, reorderedItem);
        }
    }

    return (
      <div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {Object.keys(statuses).map((key, index) => {
                // @ts-ignore
                return <Itembox key={key} status={statuses[key]}/>
            })}
          </DragDropContext>
      </div>
    );
}

export default Dashboard;


