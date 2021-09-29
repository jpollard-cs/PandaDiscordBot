import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Bot } from './bot';
import { Client, Intents } from 'discord.js';
import { CommandProcessor } from './commandProcessor';
import { factCommandHandler, jokeCommandHandler } from './command';

const container = new Container();

container.bind < Bot > (TYPES.Bot).to(Bot).inSingletonScope();
container.bind < Client > (TYPES.Client).toConstantValue(new Client({ intents: [Intents.FLAGS.GUILDS] }));
container.bind < string > (TYPES.Token).toConstantValue(process.env.TOKEN);

const commandProcessor = new CommandProcessor();
commandProcessor.register(jokeCommandHandler);
commandProcessor.register(factCommandHandler);

container.bind < CommandProcessor > (TYPES.CommandProcessor).toConstantValue(commandProcessor);


export default container;
