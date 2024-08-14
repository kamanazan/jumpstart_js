export function kelvin2Celsius(value) {
  if (typeof value === 'number') {
    return (value - 273.15).toFixed(2);
  } else {
    return '?';
  }
}

export function getDate(timestamp) {
  try {
    const dt = new Date(timestamp * 1000);
    return dt.toLocaleString();
  } catch (e) {
    console.error(e);
    return '?'
  }
  
}
