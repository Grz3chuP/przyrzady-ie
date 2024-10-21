export interface PrzyrzadI {

    created_at: string;
    id: number;
    inne: string;
    nazwa: string;
    nr_przewodnika: string;
    osoba_id: number;
    oznaczenie: string;
    rozkroj_status: string;
    rozkroj_termin: string;
    rozkroj_uwaga: string;
    statusy: StatusyI[];
    termin_wykonania: string;
    updated_at: string;

}

export interface StatusyI {
    autostatus: number;
    created_at: string;
    id: number;
    osoba: osobaI;
    osoba_id: number;
    przyrzady_id: number;
    status: string;
    updated_at: string;
    uwaga: string;
    zaawansowanie: number;

}

export interface osobaI {
    id: number;
    login: string;
}
