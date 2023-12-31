/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Schema } from 'joi';
import { type IUseCase } from '../UseCase';
import { Middleware } from '../Middleware';
import { InternalError, UnprocessableEntityError } from './exception';
import { type Container } from 'inversify';
import * as Qs from 'qs';

export enum InputProcess {
  BODY,
  QUERY,
  RAW,
  REQUEST_CTX,
  RECORDS,
  REQUEST,
  SNS
}

export abstract class ContainerControllerExecutor {
  static executeValidator(input: any, schema: Schema) {
    if (typeof input === 'string') input = JSON.parse(input);
    const { error } = schema.validate(input);
    if (error) console.error('ERROR CONTAINERCONTROLLEREXECUTOR::', error);
    if (error) throw new UnprocessableEntityError(error);
  }

  static executeInputMethod(input: any, option: InputProcess) {
    switch (option) {
      case InputProcess.BODY:
        return typeof input.body === 'string'
          ? JSON.parse(input.body)
          : input.body;
      case InputProcess.QUERY:
        return Qs.parse(input.queryStringParameters);
      case InputProcess.RAW:
        input.body =
          typeof input.body === 'string' ? JSON.parse(input.body) : input.body;
        return input;
      case InputProcess.REQUEST_CTX:
        return typeof input.requestContext === 'string'
          ? JSON.parse(input.requestContext)
          : input.requestContext;
      case InputProcess.RECORDS:
        return input.Records;
      case InputProcess.REQUEST:
        return input;
      case InputProcess.SNS:
        return input.Records[0].hasOwnProperty('Sns')
          ? input.Records[0].Sns
          : input.Records[0];
    }
  }
}

export interface GuardResponse {
  pass: boolean;
  status: number;
  data: any;
}
export type Guard = (event: any) => Promise<GuardResponse>;

export class ContainerController {
  private _validator: Schema;
  private _interceptor: any;
  private _status: number = 200;
  private _container: Container;
  private _symbol: any;
  private _inputMethod: InputProcess = InputProcess.BODY;
  private _path: string;
  private _responseBody: boolean = true;
  private _guards: Guard[] = [];
  private _middleware: boolean = false;

  setRemoveResponse() {
    this._responseBody = false;
    return this;
  }

  setMiddleware() {
    this._middleware = true;
    return this;
  }

  setValidator(schema: Schema) {
    this._validator = schema;
    return this;
  }

  setInterceptor(interceptor: (err: any) => Promise<void> | void) {
    this._interceptor = interceptor;
    return this;
  }

  setStatus(status: number) {
    this._status = status;
    return this;
  }

  setContainerIoC(container: Container, symbol: symbol) {
    this._container = container;
    this._symbol = symbol;
    return this;
  }

  setInputMethod(option: InputProcess) {
    this._inputMethod = option;
    return this;
  }

  setPath(path: string) {
    this._path = path;
    return this;
  }

  setGuard(guard: Guard[]) {
    this._guards = [...this._guards, ...guard];
    return this;
  }

  async call(event: any) {
    const securityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'no-referrer-when-downgrade',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    };
    try {
      const input = event;
      if (this._middleware) await Middleware.validate(input);
      const request = {} as any;
      const inputRequest = ContainerControllerExecutor.executeInputMethod(
        input,
        this._inputMethod
      );
      request.input = inputRequest;
      request.params = event.pathParameters ?? {};
      request.query = event.queryStringParameters ?? {};
      request.headers = event.headers ?? {};
      if (this._validator) {
        ContainerControllerExecutor.executeValidator(
          request.input,
          this._validator
        );
      }
      // Execute Guards
      for (const element of this._guards) {
        const { data, pass, status } = await element(event);
        if (!pass) {
          return {
            statusCode: status,
            headers: securityHeaders,
            body: JSON.stringify(data)
          };
        }
      }
      const instance = this._container.get<IUseCase<any, any>>(this._symbol);
      const result = await instance.execute(request);

      if (this._responseBody) {
        return {
          statusCode: this._status,
          body: JSON.stringify(result),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            ...securityHeaders
          }
        };
      } else {
        return result;
      }
    } catch (e: any) {
      const error = typeof e.render === 'function' ? e.render() : null;
      if (this._interceptor) {
        return this._interceptor(error ?? e);
      } else if (error) {
        return {
          statusCode: error.code,
          body: JSON.stringify(error.body),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            ...securityHeaders
          }
        };
      } else {
        const internalError = new InternalError(e).render();
        return {
          statusCode: internalError.code,
          body: JSON.stringify(internalError.body),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            ...securityHeaders
          }
        };
      }
    }
  }
}

export interface Request<T, P = any, Q = any> {
  params?: P;
  query?: Q;
  headers?: any;
  input: T;
}

export interface Response {
  status: string;
  details: any;
}
