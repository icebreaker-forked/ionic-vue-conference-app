export const useSystemStore = defineStore('System', {
  state() {
    return {
      isDarkMode: false,
    }
  },
})

export const useUserStore = defineStore('User', {
  state() {
    return {
      username: 'Penny',
      isAuthenticated: false,
    }
  },
})
