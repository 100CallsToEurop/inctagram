import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";
import { AtStrategy } from "../../strategies/jwt.strategy";
import { RtStrategy } from "../../strategies/jwt.refresh.strategy";
import { firstValueFrom } from "rxjs";
import { AuthCredentialsDto } from "./dto/input/auth-credentials.dto";
import { AuthController } from "./auth.controller";

describe("AuthController", () => {
  let app: INestApplication;
  let authController: AuthController;
  let authClient: ClientProxy;
  let readClient: ClientProxy;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: "envs/.api.env",
        }),
        ClientsModule.register([
          {
            name: "AUTH_SERVICE",
            transport: Transport.TCP,
            options: {
              host: "0.0.0.0",
              port: 5001,
            },
          },
          {
            name: "READ_SERVICE",
            transport: Transport.TCP,
            options: {
              host: "0.0.0.0",
              port: 5010,
            },
          },
        ]),
      ],
      controllers: [AuthController],
      providers: [AtStrategy, RtStrategy],
    }).compile();

    app = module.createNestApplication();
    app.connectMicroservice({
      transport: Transport.TCP,
    });

    await app.startAllMicroservices();
    await app.init();
    authController = module.get<AuthController>(AuthController);

    authClient = app.get("AUTH_SERVICE");
    readClient = app.get("READ_SERVICE");

    await authClient.connect();
    await readClient.connect();
  });

  afterAll(async () => {
    await app.close();
    authClient.close();
    readClient.close();
  });

  it("login", async () => {
    const dto: AuthCredentialsDto = {
      loginOrEmail: "smirnov.mic@yandex.ru",
      password: "321312",
    };

    
    const response = await firstValueFrom(await authClient
      .send({ cmd: "auth.login" }, dto))
      

    console.log(response);

   /* response.subscribe((json) => {
      console.log(json.originalRequest.type);
      //expect(json.originalRequest.type).toBe(1);
    });*/

  });
});
