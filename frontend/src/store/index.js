import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    admin: null,
    staff: [],
    nfc: [],
    token: localStorage.getItem("token") || null,
  },
  getters: {
    admin(state) {
      return state.admin;
    },
    staff(state) {
      return state.staff;
    },
    nfc(state) {
      return state.nfc;
    },
  },
  mutations: {
    setAdmin(state, admin) {
      state.admin = admin;
    },
    setStaff(state, staff) {
      state.staff = staff;
    },
    setNFC(state, nfc) {
      state.nfc = nfc;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    /* ADMIN */
    async fetchAdmin({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/admin");
        if (!response.ok) throw new Error("Failed to fetch Admin");
        const info = await response.json();
        commit("setAdmin", info);
      } catch (error) {
        console.error("Error fetching Admin data:", error);
      }
    },
    async deleteAdmin({ dispatch }, admin_id) {
      try {
        await fetch(`http://localhost:3000/admin/${admin_id}`, {
          method: "DELETE",
        });
        dispatch("fetchAdmin");
      } catch (error) {
        console.error("Error while deleting Record:", error);
      }
    },
    async addAdmin({ dispatch }, payload) {
      try {
        await fetch("http://localhost:3000/admin/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("fetchAdmin");
      } catch (error) {
        console.error("Error adding Record:", error);
      }
    },
    async updateAdmin({ dispatch }, payload) {
      try {
        await fetch(`http://localhost:3000/admin/${payload.admin_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("fetchAdmin");
      } catch (error) {
        console.error("Error updating Redord:", error);
      }
    },
     /*STAFF */
    async fetchStaff({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/staff");
        if (!response.ok) throw new Error("Failed to fetch staf");
        const info = await response.json();
        commit("setStaff", info);
      } catch (error) {
        console.error("Error fetching Staff data:", error);
      }
    },
    async deleteStaff({ dispatch }, staff_id) {
      try {
        await fetch(`http://localhost:3000/staff/${staff_id}`, {
          method: "DELETE",
        });
        dispatch("fetchStaff");
      } catch (error) {
        console.error("Error while deleting Record:", error);
      }
    },
    async addStaff({ dispatch }, payload) {
      try {
        await fetch("http://localhost:3000/staff/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("fetchStaff");
      } catch (error) {
        console.error("Error adding Record:", error);
      }
    },
    async updateStaff({ dispatch }, payload) {
      try {
        await fetch(`http://localhost:3000/staff/${payload.staff_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("fetchStaff");
      } catch (error) {
        console.error("Error updating Redord:", error);
      }
    },
     /* NFC */
    async fetchNFC({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/nfc");
        if (!response.ok) throw new Error("Failed to fetch NFC");
        const info = await response.json();
        commit("setNFC", info);
      } catch (error) {
        console.error("Error fetching NFC data:", error);
      }
    },
    async deleteNFC({ dispatch }, nfc_id) {
      try {
        await fetch(`http://localhost:3000/nfc/${nfc_id}`, {
          method: "DELETE",
        });
        dispatch("fetchNFC");
      } catch (error) {
        console.error("Error while deleting Record:", error);
      }
    },
    async addNFC({ dispatch }, payload) {
      try {
        await fetch("http://localhost:3000/nfc/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("fetchNFC");
      } catch (error) {
        console.error("Error adding Record:", error);
      }
    },
    async updateNFC({ dispatch }, payload) {
      try {
        await fetch(`http://localhost:3000/nfc/${payload.nfc_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        dispatch("fetchNFC");
      } catch (error) {
        console.error("Error updating Redord:", error);
      }
    },
    async loginAdmin({ commit }, credentials) {
      try {
        const response = await axios.post(
          "http://localhost:3000/login",
          credentials
        );
        const { token, admin } = response.data;
        localStorage.setItem("token", token);
        commit("setToken", token);
        commit("setAdmin", admin);
        return admin;
      } catch (error) {
        console.error("Error logging in", error);
        throw error;
      }
    },
    logoutAdmin({ commit }) {
      localStorage.removeItem("token");
      commit("setToken", null);
      commit("setAdmin", null);
    }
  },
  modules: {},
});