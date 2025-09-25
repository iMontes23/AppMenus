export const UrlConstante = {

    GET_USER_INTER: 'security/GetUserInformationIntranet',
    GET_USER: 'security/GetUserInformation',
    GET_USERS: 'Usuarios/GetUsers',
    //GET_USER_APPS: 'security/GetUserMenu',
    GET_USER_APPS: 'menu/GetMenuApps',
    GET_ESTRUCTURA_MENU_APPS: "menu/GetEstructuraMenuApps",

    // FAVORITES
    GET_FAVORITE_APPS: 'favorites/GetUserFavorites',
    SAVE_FAVORITE_APPS: 'favorites/AddNewFavorite',
    DELETE_FAVORITE_APPS: 'favorites/DeleteFavorite',

    // RECENTS
    GET_RECENT_APPS: 'recentApps/GetUserRecentApps',
    SAVE_RECENT_APPS: 'recentApps/AddNewUserRecentApp',

    // HELP
    GET_HELPS: 'help/GetAllHelpTopics',

    // DRM
    GET_PARAM: 'DealerRelationshipManagement/GetParam',
    FILE_UPLOAD: 'DealerRelationshipManagement/UploadV',
    GET_VISIT: 'DealerRelationshipManagement/GetAllVisit',
    SAVE_VISIT: 'DealerRelationshipManagement/SaveVisit',
    DELETE_VISIT: 'DealerRelationshipManagement/DeleteEntity',
    GET_ENTITY_TYPE: 'DealerRelationshipManagement/GetAllEntityType',
    GET_USER_GROUP: 'DealerRelationshipManagement/GetUserGroup',

    // BANCH
    GET_BRANCH_LIST: 'DealerRelationshipManagement/GetBranchListByEntidad',

    // COUNTRY
    GET_COUNTRY_LIST: 'Pais/GetAllCountry',

    // DAY
    GET_DAYS_IN_RANGE: 'DiasFestivos/GetDaysInRange',
    VALIDATE_DAY_LIST: 'DiasFestivos/ValidateDayList',
    SAVE_DAY_LIST: 'DiasFestivos/SaveDayList',
    DOWNLOAD_TEMPLATE: 'DiasFestivos/DownloadTemplate',

    //ENTITY
    GET_ENTITY: 'Entidades/GetAllEntity',
    GET_ENTITY_BY_COUNTRY_AND_TYPE: 'Entidades/GetEntityByCountry',
    SAVE_NEW_CLIENT: 'Entidades/saveNewClient',
    SAVE_ENTITY: 'Entidades/SaveEntity',
    GET_STRATEGIES: 'Entidades/GetStrategiesSummary',

    //GRUPOS
    GET_GRUPOS: 'Grupos/GetGroup',
    GET_GRUPOS_USUARIO: 'Grupos/GetUserGroup',

    //Actividades
    GET_ACTIVITY: 'Actividades/GetActivity',

    // URL ROUTES FRONTEND
    HOME: 'home',
    VIEW: 'view',
    SECURITY: 'security',
    NOT_SPECIFIED: 'notSpecified',
    NOT_FOUND: 'no-found',
    TAB_OPTION: '/:application/:modulo/:option',
    TAB_APLICATION: 'application/',
    TAB_STANDALONE_APLICATION: 'app/',

    DIAS_FESTIVOS: 'DiasFestivos',
    REGISTRO: 'Registro',
    DASHBOARD: 'Dashboard',
    CUMPLIMIENTO: 'Cumplimiento',
    OBJETIVO: 'Objetivo',
    RESUMEN: 'Resumen',

    ACTIVIDAD: 'Actividades',

    //INCIDENT TYPE
    GET_INCIDENT_TYPE: 'Incidents/GetInicidentType',
    SAVE_INCIDENT: 'Incidents/SaveInicident',
    GET_INCIDENT: 'Incidents/GetInicident',

    CONCEPTO_NGX_CHART: 'concepto',
};
