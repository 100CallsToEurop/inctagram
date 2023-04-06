import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TokensService {
  constructor(
    private readonly configServie: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async createNewTokens(
    payload: any,
    deviceId?: string
  ): Promise<{
    accessToken;
    refreshToken;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configServie.get<string>('AT_SECRET'),
        expiresIn: +this.configServie.get<string>('AT_TIME'),
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configServie.get<string>('RT_SECRET'),
        expiresIn: +this.configServie.get<string>('RT_TIME'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async decodeToken(token: string) {
    try {
      const decodeToken = await this.jwtService.verify(token, {
        secret: this.configServie.get<string>('RT_SECRET'),
      });
      return decodeToken;
    } catch (err) {
      throw new RpcException(new UnauthorizedException());
    }
  }
}
