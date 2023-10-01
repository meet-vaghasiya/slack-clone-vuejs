class LocalStorageUtility {
  setItem(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }

  getItem(key: string): any | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting localStorage:", error);
      return null;
    }
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  clearAll() {
    localStorage.clear();
  }
}

// window.addEventListener("storage", (e) => {
//   console.log(e, "something is store");
// });

// Example usage:
const localStorageUtility = new LocalStorageUtility();
export default localStorageUtility;
