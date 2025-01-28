export interface Podcast {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
    duration: number;
    createdAt: Date;
}

export interface PodcastPlayStatus {
    isPlaying: boolean;
    currentTime: number;
}
