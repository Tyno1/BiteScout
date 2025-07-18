import type { paths } from '../api';

// PUT /api/media/{id}
export type UpdateMediaRequest = paths['/api/media/{id}']['put']['requestBody']['content']['application/json'];
export type UpdateMediaResponse = paths['/api/media/{id}']['put']['responses']['200']['content']['application/json']; 