const debounce = (() => {
  let timeout: NodeJS.Timeout = null;

  return (cb: Function, ...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      cb(...args);
    }, 500);
  };
})();

export default debounce;
