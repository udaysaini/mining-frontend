import {defineStore } from "pinia";
import { useApi } from '@/composables/useApi.js';

const api = useApi();

export const useShiftsStore = defineStore("shifts", {
    state: () => ({
        list: [], // List of all shifts
        current: null, // Current shift object
        loading: false, // Loading state
        error: null // Error state
    }),
    actions: {
        async fetchShifts() {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get('/shifts');
                this.list = res.data;
            } catch (error) {
                console.error('Failed to fetch shifts:', error);
                this.error = error.message || 'Failed to fetch shifts';
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async fetchShift(shiftId) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get(`/shifts/${shiftId}`);
                this.current = res.data;
                return res.data;
            } catch (error) {
                console.error(`Failed to fetch shift with ID ${shiftId}:`, error);
                this.error = error.message || `Failed to fetch shift with ID ${shiftId}`;
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async createShift(shift) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post('/shifts', shift);
                this.list.push(res.data);
                return res.data;
            } catch (error) {
                console.error('Failed to create shift:', error);
                this.error = error.message || 'Failed to create shift';
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async updateShift(shift) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.put(`/shifts/${shift.id}`, shift);
                const index = this.list.findIndex(s => s.id === shift.id);
                if (index !== -1) {
                    this.list[index] = res.data;
                }
                return res.data;
            } catch (error) {
                console.error(`Failed to update shift with ID ${shift.id}:`, error);
                this.error = error.message || `Failed to update shift with ID ${shift.id}`;
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async deleteShift(shiftId) {
            this.loading = true;
            this.error = null;
            try {
                await api.delete(`/shifts/${shiftId}`);
                this.list = this.list.filter(s => s.id !== shiftId);
            } catch (error) {
                console.error(`Failed to delete shift with ID ${shiftId}:`, error);
                this.error = error.message || `Failed to delete shift with ID ${shiftId}`;
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});