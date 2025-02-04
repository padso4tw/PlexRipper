import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { checkResponse, preApiRequest } from '@api/baseApi';
import { PlexLibraryDTO, PlexServerDTO } from '@dto/mainApi';
import ResultDTO from '@dto/ResultDTO';

const logText = 'From PlexLibraryAPI => ';
const apiPath = '/plexLibrary';

export function getAllPlexLibraries(): Observable<ResultDTO<PlexLibraryDTO[]>> {
	preApiRequest(logText, 'getAllPlexLibraries');
	const result = Axios.get(`${apiPath}`);
	return checkResponse<ResultDTO<PlexLibraryDTO[]>>(result, logText, 'getAllPlexLibraries');
}

export function getPlexLibrary(libraryId: number, plexAccountId: number): Observable<ResultDTO<PlexLibraryDTO>> {
	preApiRequest(logText, 'getPlexLibrary');
	const result = Axios.get(`${apiPath}/${libraryId}?plexAccountId=${plexAccountId}`);
	return checkResponse<ResultDTO<PlexLibraryDTO>>(result, logText, 'getPlexLibrary');
}

export function getPlexLibraryInServer(libraryId: number, plexAccountId: number): Observable<ResultDTO<PlexServerDTO | null>> {
	preApiRequest(logText, 'getPlexLibraryInServer');
	const result = Axios.get(`${apiPath}/inserver/${libraryId}?plexAccountId=${plexAccountId}`);
	return checkResponse<ResultDTO<PlexServerDTO>>(result, logText, 'getPlexLibraryInServer');
}

export function refreshPlexLibrary(libraryId: number): Observable<ResultDTO<PlexLibraryDTO | null>> {
	preApiRequest(logText, 'refreshPlexLibrary');
	const result = Axios.post(`${apiPath}/refresh/`, {
		plexLibraryId: libraryId,
	});
	return checkResponse<ResultDTO<PlexLibraryDTO | null>>(result, logText, 'refreshPlexLibrary');
}

export function updateDefaultDestination(libraryId: number, folderPathId: number): Observable<ResultDTO> {
	preApiRequest(logText, 'updateDefaultDestination');
	const result = Axios.put(`${apiPath}/settings/default/destination`, {
		libraryId,
		folderPathId,
	});
	return checkResponse<ResultDTO>(result, logText, 'updateDefaultDestination');
}
