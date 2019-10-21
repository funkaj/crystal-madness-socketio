function capitalize(x) {
	if (x) {
		return x.charAt(0).toUpperCase() + x.slice(1);
	}
}
const reducer = (
	state = {
		room: null,
		onlineUsers: [],
		allUsers: [],
		game: [],
		id: '',
		socketId: '',
		name: '',
		email: '',
		message: '',
		crystals: [],
		wins: 0,
		losses: 0,
		perfectGames: 0,
		movesPlayed: 0,
	},
	action
) => {
	switch (action.type) {
		case 'UPDATE_ROOM_TICKER':
			state = {
				...state,
				roomTicker: action.payload.data,
			};
			break;
		case 'UPDATE_GAME_STATE':
			state = {
				...state,
				game: action.payload.game,
			};

			break;
		case 'SOCK_CONNECTED':
			state = {
				...state,
				socketId: action.payload.data,
			};
			break;
		case 'GAME':
			state = {
				...state,
				game: action.payload.game,
			};
			break;
		case 'PLAY_TURN':
			state = {
				...state,
				game: action.payload,
			};
			break;
		case 'CRYSTALS':
			state = {
				...state,
				crystals: action.payload,
			};
			break;
		case 'RE_ROUTE_TO_GAME_ROOM':
			state = {
				...state,
				room: action.payload.data.room,
				roomName: action.payload.data.roomName,
				game: action.payload.game,
			};
			break;
		case 'OPPONENT_JOINED':
			state = {
				...state,
				room: action.payload.room,
				game: action.payload.game,
			};

			break;
		case 'ONLINE_USERS':
			state = {
				...state,
				onlineUsers: action.payload,
			};
			break;
		case 'LOAD_STATS':
			state = {
				...state,
				wins: action.payload.wins,
				losses: action.payload.losses,
				perfectGame: action.payload.perfectGames,
				movesPlayed: action.payload.movesPlayed,
			};
			break;
		case 'ALL_USERS':
			state = {
				...state,
				allUsers: action.payload,
			};
			break;
		case 'LOGIN_USER':
			const name = capitalize(action.payload.username);
			state = {
				...state,
				loggedIn: true,
				id: action.payload._id,
				name: name,
				email: action.payload.email,
			};
			break;

		case 'message':
			state = {
				...state,
				message: action.data.data,
			};
			break;
		case 'new-user':
			state = {
				...state,
				id: action.data,
			};
			break;
		case 'LEAVE_ROOM':
			state = {
				...state,
				room: null,
				game: [],
			};
			break;
		default:
			break;
	}
	return state;
};

export default reducer;
