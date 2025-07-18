import type { paths } from '../api';

// DELETE /api/media/{id}
export type DeleteMediaRequest = paths['/api/media/{id}']['delete']['parameters']['path'];
export type DeleteMediaResponse = paths['/api/media/{id}']['delete']['responses']['200']['content']['application/json']; 