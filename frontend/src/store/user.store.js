import Vue from "vue";
import Vuex from "vuex";
import {userService} from "../services/user.service.js";

var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

Vue.use(Vuex);

export const userStore = {
	strict: true,
	state: {
		loggedInUser: {},
		users: [],
	},
	getters: {
		userPrefs(state) {
			return state.userPrefs;
		},
		users(state) {
			return state.users;
		},
		loggedInUser(state) {
			return state.loggedInUser;
		},
		
	},
	mutations: {
		setUser(state, { user }) {
			state.loggedInUser = user;
		},
		setUsers(state, { users }) {
			state.users = users;
		},
		removeUser(state, { userId }) {
			state.users = state.users.filter((user) => user._id !== userId);
		},
		addUser(state, { savedUser }){
			state.users.unshift(savedUser)
		},
		updateUser(state, { savedUser }) {
			const idx = state.users.findIndex(
				(user) => user.id === savedUser.id
			);
			state.users.splice(idx, 1, savedUser);
		},
	},
	actions: {
		async loadUsers({ commit, state }) {
			const users = await eventoService.query()
			commit({ type: "setUsers", users });
			return users;
		},
		async login(context, { userCred }) {
			const users = await userService.query();
			context.commit({ type: "setUsers", users });
			const checkIfUser = users.find(user => user.password === userCred.password & user.email === userCred.email)
			const user = checkIfUser;
			context.commit({ type: "setUser", user });
			return user;
		},
		async signup ({commit}, {user}) {
			console.log('adding user in store', user);
			const savedUser = await userService.signUp(user)
			commit({ type: "addUser", savedUser });
			return savedUser;
		},
		async logout(context) {
			await userService.logout();
			context.commit({ type: "setUsers", users: [] });
			context.commit({ type: "setUser", user: null });
		},
		async loadUsers(context) {
			const users = await userService.query();
			context.commit({ type: "setUsers", users });
		},
		async removeUser(context, { userId }) {
			await userService.remove(userId);
			context.commit({ type: "removeUser", userId });
		},
		async updateUser(context, { user }) {
			user = await userService.update(user);
			context.commit({ type: "setUser", user });
		},

		async addEventoToUser (context, { evento }){
			const users = await userService.query()
			console.log(users);
			context.commit({ type: "setUsers", users });
			const loggedInUser = context.getters.loggedInUser;
			console.log(loggedInUser);
			loggedInUser.eventos.push(evento)
			console.log('logged in user in store:', loggedInUser);
			const savedUser = await userService.update(loggedInUser)
			console.log('saved user',savedUser);
			context.commit({type: "updateUser", savedUser });

		}
	},
};
