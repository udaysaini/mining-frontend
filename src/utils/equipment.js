/**
 * Format date to YYYY-MM-DD
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDate(date) {
  if (!date) return '';
  
  // If it's already in YYYY-MM-DD format, return as is
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  
  // Otherwise format it
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  return d.toISOString().split('T')[0];
}

/**
 * Get status badge color
 * @param {string} status - Equipment status
 * @returns {string} Badge color class
 */
export function getStatusBadgeColor(status) {
  const statusMap = {
    'operational': 'badge-success',
    'maintenance': 'badge-warning',
    'broken': 'badge-error',
    'offline': 'badge-neutral',
    'standby': 'badge-info'
  };
  
  return statusMap[status?.toLowerCase()] || 'badge-neutral';
}

/**
 * Get equipment types for filtering
 * @returns {Array} Equipment types
 */
export function getEquipmentTypes() {
  return [
    'Heavy Machinery',
    'Vehicle',
    'Power Tool',
    'Drilling Equipment', 
    'Excavation Equipment',
    'Safety Equipment',
    'Electrical Equipment',
    'Conveyor System',
    'Crusher',
    'Other'
  ];
}

/**
 * Get equipment statuses for filtering
 * @returns {Array} Equipment statuses
 */
export function getEquipmentStatuses() {
  return [
    'Operational',
    'Maintenance',
    'Broken',
    'Offline',
    'Standby'
  ];
}
