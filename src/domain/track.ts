export type TrackListItem = {
  id: string;
  title: string;
  uri: string;
  durationMs?: number | null;
};

export type TrackRepository = {
  findPlayableM4ATracks(): Promise<TrackListItem[]>;
};
