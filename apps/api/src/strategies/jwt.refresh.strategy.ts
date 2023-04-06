import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: process.env.RT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const refreshToken = request.cookies.refreshToken;
          if (!refreshToken) {
            throw new UnauthorizedException();
          }
          return refreshToken;
        },
      ]),
      //jwtFromRequest: ExtractJwt.fromHeader('Cookie'),
    });
  }

  async validate(payload: any) {
    delete payload.iat;
    delete payload.exp;
    return payload;
  }
}
