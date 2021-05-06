import { getCustomRepository, Repository } from 'typeorm';

import { Message } from '../entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessagesCreate {
   admin_id?: string;
   user_id: string;
   text: string;
}

class MessagesService {

   private messagesRepository: Repository<Message>;

   constructor() {
      this.messagesRepository = getCustomRepository(MessagesRepository);
   };

   async create({ admin_id, user_id, text }: IMessagesCreate) {

      const messages = this.messagesRepository.create({
         admin_id,
         user_id,
         text
      });

      await this.messagesRepository.save(messages);

      return messages;
   };

   async listByUser(user_id: string) {

      const list = await this.messagesRepository.find({
         where: { user_id },
         relations: ['user'],
      });

      return list;
   };
};

export { MessagesService };
