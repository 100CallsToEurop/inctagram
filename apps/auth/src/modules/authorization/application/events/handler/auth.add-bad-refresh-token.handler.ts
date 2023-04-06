import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AddBadTokenEvent } from "../impl";
import { AuthBadTokensEntity } from "../../../domain/entity";
import { AuthBadTokensRepository } from "../../../infrastructure/repositories";

@EventsHandler(AddBadTokenEvent)
export class AddBadRefreshTokenHandler
  implements IEventHandler<AddBadTokenEvent>
{
  constructor(
    private readonly authBadTokensRepository: AuthBadTokensRepository
  ) {}
  async handle(event: AddBadTokenEvent) {
    const newBadToken = AuthBadTokensEntity.create(event);
    await this.authBadTokensRepository.save(newBadToken);
  }
}
