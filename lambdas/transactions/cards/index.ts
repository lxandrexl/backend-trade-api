import "reflect-metadata";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { ContainerController, InputProcess } from "../../../@core/controller";
import { ValidateMethod } from "../../../@core/Guard";
import * as Validator from "./src/infrastructure/validators";
import { StatusCodes } from "http-status-codes";
import { Types, Container } from "./src/infrastructure/ioc";

export const createCardTokenHandler = async function ( event: APIGatewayEvent ): Promise<APIGatewayProxyResult> {
  const container = new ContainerController()
                            .setMiddleware()
                            .setInputMethod(InputProcess.BODY)
                            .setStatus(StatusCodes.OK)
                            .setValidator(Validator.cardSchema)
                            .setGuard([ValidateMethod(['POST'])])
                            .setContainerIoC(Container, Types.CreateToken);
                            
  return await container.call(event);
};

export const getCardInfoHandler = async function ( event: APIGatewayEvent ): Promise<APIGatewayProxyResult> {
    const container = new ContainerController()
                              .setMiddleware()
                              .setInputMethod(InputProcess.QUERY)
                              .setStatus(StatusCodes.OK)
                              .setValidator(Validator.tokenSchema)
                              .setGuard([ValidateMethod(['GET'])])
                              .setContainerIoC(Container, Types.GetInfo);
                              
    return await container.call(event);
  };