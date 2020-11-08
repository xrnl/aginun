import findWithIndex from "@/utils/findWithIndex";

describe("findWithIndex", () => {
  const tasks = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  it("should return the correct task and index", () => {
    const taskIndex = 2;
    const task = tasks[taskIndex];
    const { item, index } = findWithIndex(tasks, task.id);
    expect(item).toBe(task);
    expect(index).toBe(taskIndex);
  });
});
