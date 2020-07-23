import { eventoService } from "../services/evento.service.js";

export const eventoStore = {
					strict: true,
					state: {
						isLoading: false,
						eventos: [],
						filterBy: {
							txt: "",
							category: "all",
							order: "asc",
							sort: "",
						},
					},
					getters: {
						eventos(state) {
							return state.eventos;
						},
						isLoading(state) {
							return state.isLoading;
						},
						filterBy(state) {
							return state.filterBy;
						},
					},
					mutations: {
						setIsLoading(state, { isLoading }) {
							state.isLoading = isLoading;
						},
						setFilter(state, { filterBy }) {
							state.filterBy = filterBy;
						},
						setEventos(state, { eventos }) {
							state.eventos = eventos;
						},
						updateFilterBy(state, { filterBy }) {
							state.filterBy = filterBy;
						},
						removeEvento(state, { id }) {
							const eventoIdx = state.eventos.findIndex(
								(evento) => evento._id === id
							);
							state.eventos.splice(eventoIdx, 1);
						},
						addEvento(state, { savedEvento }) {
							state.eventos.unshift(savedEvento);
						},
						updateEvento(state, { savedEvento }) {
							console.log(savedEvento);
							const idx = state.eventos.findIndex(
								(evento) => evento._id === savedEvento._id
							);
							state.eventos.splice(idx, 1, savedEvento);
						},
					},
					actions: {
						loadEventos({ commit, state }) {
							commit({ type: "setIsLoading", isLoading: true });
							return eventoService.query(state.filterBy)
							.then((eventos) => {
								commit({ type: "setEventos", eventos });
								commit({ type: "setIsLoading", isLoading: false });
								return eventos;
							});
						},
						async removeEvento({ commit }, { id }) {
							await eventoService.remove(id)
							commit({ type: "removeEvento", id });
						},

						async saveEvento({ commit }, { evento }) {
							console.log(evento);
							const type = evento._id ? "updateEvento" : "addEvento";
							const savedEvento = await eventoService.save(evento)
								commit({ type, savedEvento })
								return savedEvento;
						},
						async addMember(context, { evento }) {
							console.log(evento);
							const loggedInUser = context.getters.loggedInUser;
							const userToSave = _.cloneDeep(loggedInUser)
							console.log(userToSave);
							evento.members.push(userToSave);
							const savedEvento = await eventoService.save(evento);
							console.log(savedEvento);
							context.commit({ type: "updateEvento", savedEvento });
						},
					},
				};
