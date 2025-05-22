import { defineStore } from "pinia";
import { useApi } from '@/composables/useApi.js';

const api = useApi();

export const useEquipmentStore = defineStore("equipment", {
    state: () => ({
        list: [], // List of all equipment
        current: null, // Current equipment object
        loading: false, // Loading state
        error: null, // Error state
    }),
    actions: {
        async fetchEquipment() {
            this.loading = true;
            try {
                const res = await api.get('/equipment');
                this.list = res.data;
                this.error = null;
            } catch (err) {
                this.error = err.message || 'Failed to fetch equipment';
            } finally {
                this.loading = false;
            }
        },
        
        async fetchEquipmentById(equipmentId) {
            this.loading = true;
            try {
                const res = await api.get(`/equipment/${equipmentId}`);
                this.current = res.data;
                this.error = null;
                return res.data;
            } catch (err) {
                this.error = err.message || 'Failed to fetch equipment details';
                return null;
            } finally {
                this.loading = false;
            }
        },
        
        async createEquipment(equipment) {
            this.loading = true;
            try {
                const res = await api.post('/equipment', equipment);
                this.list.push(res.data);
                this.error = null;
                return res.data;
            } catch (err) {
                this.error = err.message || 'Failed to create equipment';
                return null;
            } finally {
                this.loading = false;
            }
        },
        
        async updateEquipment(equipment) {
            this.loading = true;
            try {
                const res = await api.put(`/equipment/${equipment.id}`, equipment);
                const index = this.list.findIndex(e => e.id === equipment.id);
                if (index !== -1) {
                    this.list[index] = res.data;
                }
                this.error = null;
                return res.data;
            } catch (err) {
                this.error = err.message || 'Failed to update equipment';
                return null;
            } finally {
                this.loading = false;
            }
        },
        
        async deleteEquipment(equipmentId) {
            this.loading = true;
            try {
                await api.delete(`/equipment/${equipmentId}`);
                this.list = this.list.filter(e => e.id !== equipmentId);
                this.error = null;
                return true;
            } catch (err) {
                this.error = err.message || 'Failed to delete equipment';
                return false;
            } finally {
                this.loading = false;
            }
        },
        
        async assignEquipment(equipmentId, technicianId) {
            this.loading = true;
            try {
                const res = await api.post(`/equipment/${equipmentId}/assign/${technicianId}`);
                const index = this.list.findIndex(e => e.id === equipmentId);
                if (index !== -1) {
                    this.list[index].assigned_to = technicianId;
                }
                this.error = null;
                return res.data;
            } catch (err) {
                this.error = err.message || 'Failed to assign equipment';
                return null;
            } finally {
                this.loading = false;
            }
        },
        
        async unassignEquipment(equipmentId) {
            this.loading = true;
            try {
                const res = await api.post(`/equipment/${equipmentId}/unassign`);
                const index = this.list.findIndex(e => e.id === equipmentId);
                if (index !== -1) {
                    this.list[index].assigned_to = null;
                }
                this.error = null;
                return res.data;
            } catch (err) {
                this.error = err.message || 'Failed to unassign equipment';
                return null;
            } finally {
                this.loading = false;
            }
        },
        
        async fetchTechnicianEquipment(technicianId) {
            this.loading = true;
            try {
                const res = await api.get(`/equipment/technician/${technicianId}`);
                this.error = null;
                return res.data;
            } catch (err) {
                this.error = err.message || 'Failed to fetch technician equipment';
                return [];
            } finally {
                this.loading = false;
            }
        }
    }
});