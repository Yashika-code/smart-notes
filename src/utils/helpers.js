export const clean = (text) => text.trim();

export const isEmpty = (text) =>
  !text || text.trim().length === 0;

export const normalize = (text) =>
  text.toLowerCase().replace(/\s+/g, " ").trim();
