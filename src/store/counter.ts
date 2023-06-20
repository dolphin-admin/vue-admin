export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const increment = () => {
    count.value += 1
  }

  const decrement = () => {
    count.value -= 1
  }

  return {
    count,
    increment,
    decrement
  }
})
