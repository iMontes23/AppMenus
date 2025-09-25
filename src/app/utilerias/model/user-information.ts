import { Constante } from "../constantes/constante";

export class UserInformation {
    cd_usuario?: number;
    cd_area?: number;
    userID: string;
    userName: string;
    name: string;
    apPaterno: string;
    apMaterno: string;

    constructor(
        userID: string | null = Constante.EMPTY,
        userName: string | null = Constante.EMPTY,
        name: string | null = Constante.EMPTY,
        apPaterno: string | null = Constante.EMPTY,
        apMaterno: string | null = Constante.EMPTY
    ) {
        this.userID = userID ?? Constante.EMPTY;
        this.userName = userName ?? Constante.EMPTY;
        this.name = name ?? Constante.EMPTY;
        this.apPaterno = apPaterno ?? Constante.EMPTY;
        this.apMaterno = apMaterno ?? Constante.EMPTY;
    }

}
