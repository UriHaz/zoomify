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
								(evento) => evento.id === id
							);
							state.eventos.splice(eventoIdx, 1);
						},
						addEvento(state, { savedEvento }) {
							state.eventos.unshift(savedEvento);
						},
						updateEvento(state, { savedEvento }) {
							const idx = state.eventos.findIndex(
								(evento) => evento.id === savedEvento.id
							);
							state.eventos.splice(idx, 1, savedEvento);
						},
					},
					actions: {
						loadEventos({ commit, state }) {
							commit({ type: "setIsLoading", isLoading: true });
							return eventoService.query(state.filterBy).then((eventos) => {
								commit({ type: "setEventos", eventos });
								commit({ type: "setIsLoading", isLoading: false });
								return eventos;
							});
						},
						removeEvento({ commit }, { id }) {
							return eventoService.remove(id).then(() => {
								commit({ type: "removeEvento", id });
							});
						},
						saveEvento({ commit }, { evento }) {
							const type = evento.id ? "updateEvento" : "addEvento";
							return eventoService.save(evento).then((savedEvento) => {
								commit({ type, savedEvento });
								return savedEvento;
							});
						},
						async addMember(context, { evento }) {
							const loggedInUser = context.getters.loggedInUser;
							evento.members.push(loggedInUser);
							const savedEvento = await eventoService.save(evento);
							context.commit({ type: "updateEvento", savedEvento });
						},
					},
				};
