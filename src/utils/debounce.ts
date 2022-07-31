const debounce = (() => {
  let timeout: NodeJS.Timeout = null;

  return (cb: Function, delay: number, ...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      cb(...args);
    }, delay);
  };
})();

export default debounce;
