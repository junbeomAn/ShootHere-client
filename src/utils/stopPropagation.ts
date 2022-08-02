export default (cb?: Function) => (e: React.MouseEvent) => {
  e.stopPropagation();
  if (cb) {
    cb(e);
  }
};
