import {defineStore } from "pinia";
import { useApi } from '@/composables/useApi.js';

const api = useApi();

export const useShiftsStore = defineStore("shifts", {
    state: () => ({
        list: [], // List of all shifts
        current: null, // Current shift object
    }),
    actions: {
        async fetchShifts() {
            const res = await api.get('/shifts');
            this.list = res.data;
        },
        async fetchShift(shiftId) {
            const res = await api.get(`/shifts/${shiftId}`);
            this.current = res.data;
        },
        async createShift(shift) {
            const res = await api.post('/shifts', shift);
            this.list.push(res.data);
        },
        async updateShift(shift) {
            const res = await api.put(`/shifts/${shift.id}`, shift);
            const index = this.list.findIndex(s => s.id === shift.id);
            if (index !== -1) {
                this.list[index] = res.data;
            }
        },
        async deleteShift(shiftId) {
            await api.delete(`/shifts/${shiftId}`);
            this.list = this.list.filter(s => s.id !== shiftId);
        }
    }
});