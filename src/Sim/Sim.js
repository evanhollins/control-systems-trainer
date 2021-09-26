
class Sim {
  constructor(updateGraphData) {
    this.updateGraphData = updateGraphData;
  }

  setup(exercise, durationMs, stepMs) {
    this.exercise = exercise;
    this.durationMs = durationMs;
    this.stepMs = stepMs;
  }

  run() {
    this.exercise.reset()

    for (let i = 0; i < this.durationMs; i += this.stepMs) {
      this.exercise.run(i)
    }
    this.updateGraphData(this.exercise.data)
  }
}

export default Sim;