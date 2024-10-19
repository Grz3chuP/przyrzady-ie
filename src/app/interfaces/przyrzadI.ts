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
  id: number;
  przyrzady_id: number;
  status: string;
  zaawansowanie: number;
  uwaga: string;
  osoba_id: number;
}
