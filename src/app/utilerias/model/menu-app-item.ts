export interface MenuAppItem {
  id: number;
  parentId?: number;         // nullable en C# → opcional en TS
  nombre: string;
  codigo: string;
  descripcion?: string;      // nullable en C# → opcional en TS
  orden?: number;            // nullable en C# → opcional en TS
  activo: boolean;
  esApp: boolean;
  url?: string;              // nullable en C# → opcional en TS
  items?: MenuAppItem[];   // lista recursiva
  isOpen:boolean 
}