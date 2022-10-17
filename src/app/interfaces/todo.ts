export interface Speakers {
    name: string;
    organization: string;
    surname: string;
    url_photo: string;
}
export interface Todo {
    id: number;
    description: string;
    hour_end: string;
    hour_ini:  string;
    room_id: number;
    speakers: Array<Speakers>;
    state: string;
    title: string;
}


