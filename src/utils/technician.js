/**
 * Parse skills string into an array of individual skills
 * @param {string} skillsString - Comma, semicolon, or newline separated skills
 * @returns {Array} Array of skills
 */
export function parseSkills(skillsString) {
  if (!skillsString) return [];
  
  // Split by comma, semicolon or new line and trim whitespace
  return skillsString
    .split(/[,;\n]/)
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
}

/**
 * Format time string to consistent format
 * @param {string} timeString - Time string in various formats
 * @returns {string} Formatted time string in HH:MM format
 */
export function formatTime(timeString) {
  // Handle different time formats
  if (!timeString) return '';
  
  // If already in HH:MM format, return as is
  if (/^\d{1,2}:\d{2}$/.test(timeString)) {
    return timeString;
  }
  
  // If in HH:MM:SS format, remove seconds
  if (/^\d{1,2}:\d{2}:\d{2}$/.test(timeString)) {
    return timeString.substring(0, 5);
  }
  
  return timeString;
}

/**
 * Calculate hours between two times
 * @param {string} startTime - Start time string
 * @param {string} endTime - End time string
 * @returns {string} Hours between start and end time (with decimal minutes)
 */
export function calculateHours(startTime, endTime) {
  if (!startTime || !endTime) return '0';
  
  // Format times to ensure they're in HH:MM format
  const start = formatTime(startTime);
  const end = formatTime(endTime);
  
  // Convert to minutes
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  
  // Calculate total minutes
  let startTotalMinutes = startHours * 60 + startMinutes;
  let endTotalMinutes = endHours * 60 + endMinutes;
  
  // Handle case where end time is on the next day
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60;
  }
  
  // Calculate duration in hours and minutes
  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  // Format the result
  if (minutes === 0) {
    return `${hours}`;
  } else {
    return `${hours}.${minutes}`;
  }
}
