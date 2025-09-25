import { Constante } from "../constantes/constante";
import { HelpItemDTO } from "./help-item-dto";

export class HelpTopicDTO {
    application = Constante.EMPTY;
    items: HelpItemDTO[] = [];
    isOpen = false;
}