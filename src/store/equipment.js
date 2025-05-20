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
            const res = await api.get('/equipment');
            this.list = res.data;
        },
        async fetchEquipmentById(equipmentId) {
            const res = await api.get(`/equipment/${equipmentId}`);
            this.current = res.data;
        },
        async createEquipment(equipment) {
            const res = await api.post('/equipment', equipment);
            this.list.push(res.data);
        },
        async updateEquipment(equipment) {
            const res = await api.put(`/equipment/${equipment.id}`, equipment);
            const index = this.list.findIndex(e => e.id === equipment.id);
            if (index !== -1) {
                this.list[index] = res.data;
            }
        },
        async deleteEquipment(equipmentId) {
            await api.delete(`/equipment/${equipmentId}`);
            this.list = this.list.filter(e => e.id !== equipmentId);
        }
    }
});