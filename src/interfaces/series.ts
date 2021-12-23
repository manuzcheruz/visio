interface Media {
    original: string;
    medium: string;
}

interface Network {
    name: string;
}

interface Rating {
    average: number;
}

export default interface Series {
    id: number;
    name: string;
    image: Media;
    rating?: Rating;
    status: string;
    network: Network;
    premiered: string;
    summary?: string;
}