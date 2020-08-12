import Log from 'consola';
import { LogLevel } from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { HubConnectionFactory, ConnectionOptions } from '@ssv/signalr-client';
import { signalRDownloadProgressUrl, signalRPlexLibraryProgressUrl } from '@api/baseApi';
import IDownloadProgress from '@dto/IDownloadProgress';
import ILibraryProgress from '@dto/ILibraryProgress';

export class SignalrService {
	private _hubFactory: HubConnectionFactory = new HubConnectionFactory();

	public constructor() {
		const options: ConnectionOptions = {
			logger: LogLevel.Debug,
			retry: {
				maximumAttempts: 5,
			},
		};
		this._hubFactory.create(
			{
				key: 'DownloadProgress',
				endpointUri: signalRDownloadProgressUrl,
				options,
			},
			{
				key: 'LibraryProgress',
				endpointUri: signalRPlexLibraryProgressUrl,
				options,
			},
		);
	}

	public getDownloadProgress(): Observable<IDownloadProgress> {
		const hubConnection = this._hubFactory.get<DownloadHub>('DownloadProgress');
		hubConnection.connect().subscribe(() => {
			Log.debug('DownloadHub is connected!');
		});
		return hubConnection.on<IDownloadProgress>('DownloadProgress');
	}

	public getLibraryProgress(): Observable<ILibraryProgress> {
		const hubConnection = this._hubFactory.get<LibraryHub>('LibraryProgress');
		hubConnection.connect().subscribe(() => {
			Log.debug('LibraryHub is connected!');
		});
		return hubConnection.on<ILibraryProgress>('LibraryProgress');
	}
}

const signalrService = new SignalrService();
export default signalrService;

export interface DownloadHub {
	DownloadProgress: IDownloadProgress;
}

export interface LibraryHub {
	LibraryProgress: ILibraryProgress;
}
