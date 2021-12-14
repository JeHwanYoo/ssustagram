export function sendErrorCode(res, e, code = 400) {
  res.status(code);
  res.send(e.message ? e.message : e);
}
