import { Interaction, CommandInteraction } from 'discord.js';
import { injectable } from 'inversify';
import { baseCommandHandler, CommandHandler } from './command';

@injectable()
export class CommandProcessor {
  private readonly handlers: CommandHandler[];

  constructor() {
  	this.handlers = [baseCommandHandler];
  	this.register = this.register.bind(this);
  	this.process = this.process.bind(this);
  }

  register(handler: CommandHandler): void {
  	this.handlers.push(handler);
  }

  async process(interaction: Interaction): Promise<void> {
  	this.handlers.forEach(async handler => await handler(interaction as CommandInteraction));
  }
}
