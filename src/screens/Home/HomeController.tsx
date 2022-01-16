import { HttpService } from "../../services";
import { TripInterface } from "../../services/types";
export async function loadTrips(){
    const response = await HttpService({
        url : '/trips',
        method: 'get',
    });
    return response.data._embedded.tripList;
}

export function MapTrips(trips : TripInterface[]) {
    return trips.map(elt => ({
        image: elt.images[0],
        title: elt.title,
        tag: elt.price,
        description: elt.description
    }))
}