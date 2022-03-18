import Item from "./Item";

interface Status {
    id: number,
    name: string,
    items: object | Item
}

export default Status;
