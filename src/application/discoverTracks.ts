import type { TrackListItem, TrackRepository } from '../domain/track';

export const discoverTracks = async (
  trackRepository: TrackRepository,
): Promise<TrackListItem[]> => {
  return trackRepository.findPlayableM4ATracks();
};
