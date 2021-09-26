const Exercise1 = `
class Exercise1 {

  reset() {
    this.data = []
  }

  run(time) {
    this.data.push({
      time: time,
      target: 0,
      current: Math.sin(time)
    })
  }
}

window.CurrentExercise = Exercise1;`

export default Exercise1;