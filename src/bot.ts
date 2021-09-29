import { Client } from 'discord.js';
import { inject, injectable } from 'inversify';
import { CommandProcessor } from './commandProcessor';
import { TYPES } from './types';

@injectable()
export class Bot {
  private readonly client: Client;
  private readonly token: string;
  private commandProcessor: CommandProcessor;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.CommandProcessor) commandProcessor: CommandProcessor,
  ) {
  	this.client = client;
  	this.token = token;
  	this.commandProcessor = commandProcessor;
  }

  public listen(): Promise<string> {
  	this.client.on('interactionCreate', this.commandProcessor.process);

  	return this.client.login(this.token);
  }
}
