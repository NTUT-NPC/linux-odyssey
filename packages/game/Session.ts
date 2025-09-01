import { FileGraph, IFileNode } from '../file-graph'
import { Quest } from './Quest'
import {
  IQuest,
  ICommand,
  ISession,
  IFileExistenceChecker,
  IResponse,
  ITask,
} from './schema'

export class GameSession {
  private completed: string[] = []
  private quest: Quest
  private graph: FileGraph

  constructor(
    { completedEvents, graph }: Partial<ISession>,
    quest: IQuest,
    checker: IFileExistenceChecker
  ) {
    this.completed = completedEvents || []
    this.quest = new Quest(quest, checker)
    this.graph = new FileGraph(
      graph ?? { path: '/', type: 'directory', discovered: false }
    )
  }

  get completedEvents() {
    return this.completed
  }

  complete(stageId: string) {
    this.completed.push(stageId)
  }

  getActiveStages(): string[] {
    return this.quest.getActiveStages(this.completed).map((stage) => stage.id)
  }

  async runCommand(command: ICommand) {
    if (command.params) {
      // this.graph.handleEvent(command.params)
      const updatedParams = { ...command.params };
      if (updatedParams.add) {
        updatedParams.add = updatedParams.add.map(item => ({
          ...item,
          type: item.type === 'folder' ? 'directory' : item.type,
        }));
      }
      if (updatedParams.remove) {
        updatedParams.remove = updatedParams.remove.map(item => ({
          ...item,
          type: item.type === 'folder' ? 'directory' : item.type,
        }));
      }
      this.graph.handleEvent(updatedParams as any);
    }
    const stageId = await this.quest.findSatisfiedEvent(command, this.completed)
    if (stageId) {
      this.complete(stageId)
    }
    return stageId
  }

  isFinished() {
    return this.getActiveStages().length === 0
  }

  getResponses(): IResponse[] {
    return this.quest.getResponses(this.completed)
  }

  getTasks(): ITask[] {
    return this.quest.getTasks(this.completed)
  }

  getGraph(): IFileNode {
    return this.graph
  }
}
