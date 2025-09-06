import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  MEMBERS: "bandplan_members",
  SONGS: "bandplan_songs",
  EVENTS: "bandplan_events",
  TASKS: "bandplan_tasks",
  NOTES: "bandplan_notes",
};

export const storage = {
  async getItems(key) {
    try {
      const items = await AsyncStorage.getItem(key);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Error loading items:", error);
      return [];
    }
  },

  async setItems(key, items) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving items:", error);
    }
  },

  async addItem(key, item) {
    const items = await this.getItems(key);
    items.push(item);
    await this.setItems(key, items);
    return item;
  },

  async updateItem(key, id, updates) {
    const items = await this.getItems(key);
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      await this.setItems(key, items);
      return items[index];
    }
    return null;
  },

  async deleteItem(key, id) {
    const items = await this.getItems(key);
    const filteredItems = items.filter((item) => item.id !== id);
    await this.setItems(key, filteredItems);
  },
};

export { STORAGE_KEYS };
