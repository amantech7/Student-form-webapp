export const success = (res, message, data = null) => {
  res.json({ success: true, message, data });
};

export const failure = (res, message) => {
  res.status(400).json({ success: false, message });
};
