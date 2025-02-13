export type TipoProyecto = 'Cotización' | 'Negocio'


export interface Country {
    name: string;
    place_id: string;
    short_name: string;
}

export interface Place {
    _id?: string;
    name: string;
    place_id: string;
}

export interface Address {
    street: string;
    country: Country;
    places: Place[];
    city?: {
        name: string;
        place_id: string;
    };
}

export interface ContactMethods {
    emails: string[];
    phones: string[];
}

export interface Payment {
    accountNumber: string;
    accountType: string;
    bank: string;
    condition: string;
    document: string;
    type: string;
}

export interface OtherAccounts {
    instagram: string;
    twitter: string;
    facebook: string;
    web: string;
    linkedin: string;
    behance: string;
    spotify: string;
    soundCloud: string;
    vimeo: string;
    youtube: string;
    github: string;
}

export interface RoleName {
    es: string;
    en: string;
}

export interface Role {
    _id: string;
    name: RoleName;
}

export interface Data {
    nickName: string;
    businessActivity: string;
    type: string;
    legalName: string;
    address: string | null;
    idNumber: string;
    nickname?: string;
    name?: {
        first: string;
        last: string;
    };
}

export interface UserInner {
    _id: string;
    data: Data;
    isValidate: boolean;
    roles: Role[];
    imgUrl: string;
    email: string;
    address: {
        places: any[];
    };
}

export interface User {
    _id: string;
    organization: string;
    user?: UserInner;
    __v: number;
    address: Address;
    archived: boolean;
    contactMethods: ContactMethods;
    createdAt: string;
    creator: string | null;
    data: Data;
    email: string;
    imgUrl: string;
    otherAccounts: OtherAccounts;
    owner: string | null;
    payment: Payment;
    relatedUsers: any[];
    roles: (Role | string)[];
    updatedAt: string;
    id: string;
    contact: boolean;
    isUser?: boolean;
    phone?: string;
}



export interface Proyecto {
    nombre: string
    cliente?: {
        _id:string,
        nombre: string,
        img: string
    }
    ejecutivo?: {
        _id:string,
        nombre: string,
        img: string
    }
    contacto?:{
        _id:string
        nombre: string,
        img: string
    }
    tipoProyecto?: TipoProyecto
}
