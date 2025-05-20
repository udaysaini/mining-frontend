import { defineStore } from "pinia";
import { useApi } from '@/composables/useApi.js';

const api = useApi();

export const useTechnicianStore = defineStore("technician", {
    state: () => ({
        list: [], // List of all technicians
        current: null, // Current technician object
        loading: false, // Loading state
        error: null, // Error state
    }),
    actions: {
        async fetchTechnicians() {
            this.loading = true;
            try {
                // get all technicians, set error to null.
                const res = await api.get('/technicians');
                this.list = res.data;
                this.error = null; 
            } catch (error) {
                console.error("Error fetching technicians:", error);
                this.error = error;
            } finally {
                // Set loading to false regardless of success or failure
                this.loading = false;
            }
        },
        async fetchTechnician(technicianId) {
            this.loading = true;
            try {
                // get technician, set error to null.
                const res = await api.get(`/technicians/${technicianId}`);
                this.current = res.data;
                this.error = null; 
            } catch (error) {
                console.error("Error fetching technician:", error);
                this.error = error;
            } finally {
                // Set loading to false regardless of success or failure
                this.loading = false;
            }
        },
        async createTechnician(technician) {
            this.loading = true;
            try {
                const res = await api.post('/technicians', technician);
                this.list.push(res.data);
                this.error = null;
            } catch (error) {
                console.error("Error creating technician:", error);
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async updateTechnician(technician) {
            this.loading = true;
            try {
                const res = await api.put(`/technicians/${technician.id}`, technician);
                const index = this.list.findIndex(t => t.id === technician.id);
                if (index !== -1) {
                    this.list[index] = res.data;
                }
            } catch (error) {
                console.error("Error updating technician:", error);
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async deleteTechnician(technicianId) {
            this.loading = true;
            try {
                await api.delete(`/technicians/${technicianId}`);
            } catch (error) {
                console.error("Error deleting technician:", error);
                this.error = error;
            } finally {
                this.loading = false;
            }
            this.list = this.list.filter(t => t.id !== technicianId);
        }
    }
})