export interface MenuItem {
    title:string;
    icontype:string;
    type:string;
    collapse:string;
    path:string;
    childitem?: MenuItem;
    children:MenuItem [];
    ab:string;
    isOpen:boolean;
}
