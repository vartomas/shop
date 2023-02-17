const useLocalStorage = () => {
  const get = (key: string) => localStorage.getItem(key);
  const set = (key: string, data: string) => localStorage.setItem(key, data);
  const remove = (key: string) => localStorage.removeItem(key);

  return { get, set, remove };
};

export default useLocalStorage;
