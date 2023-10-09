"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerController = exports.ContainerControllerExecutor = exports.InputProcess = void 0;
const Middleware_1 = require("../Middleware");
const exception_1 = require("./exception");
const Qs = require("qs");
var InputProcess;
(function (InputProcess) {
    InputProcess[InputProcess["BODY"] = 0] = "BODY";
    InputProcess[InputProcess["QUERY"] = 1] = "QUERY";
    InputProcess[InputProcess["RAW"] = 2] = "RAW";
    InputProcess[InputProcess["REQUEST_CTX"] = 3] = "REQUEST_CTX";
    InputProcess[InputProcess["RECORDS"] = 4] = "RECORDS";
    InputProcess[InputProcess["REQUEST"] = 5] = "REQUEST";
    InputProcess[InputProcess["SNS"] = 6] = "SNS";
})(InputProcess || (exports.InputProcess = InputProcess = {}));
class ContainerControllerExecutor {
    static executeValidator(input, schema) {
        if (typeof input === "string")
            input = JSON.parse(input);
        const { error } = schema.validate(input);
        if (error)
            console.error("ERROR CONTAINERCONTROLLEREXECUTOR::", error);
        if (error)
            throw new exception_1.UnprocessableEntityError(error);
    }
    static executeInputMethod(input, option) {
        switch (option) {
            case InputProcess.BODY:
                return typeof input.body === "string"
                    ? JSON.parse(input.body)
                    : input.body;
            case InputProcess.QUERY:
                return Qs.parse(input.queryStringParameters);
            case InputProcess.RAW:
                input.body =
                    typeof input.body === "string" ? JSON.parse(input.body) : input.body;
                return input;
            case InputProcess.REQUEST_CTX:
                return typeof input.requestContext === "string"
                    ? JSON.parse(input.requestContext)
                    : input.requestContext;
            case InputProcess.RECORDS:
                return input.Records;
            case InputProcess.REQUEST:
                return input;
            case InputProcess.SNS:
                return input.Records[0].hasOwnProperty('Sns') ? input.Records[0].Sns : input.Records[0];
        }
    }
}
exports.ContainerControllerExecutor = ContainerControllerExecutor;
class ContainerController {
    constructor() {
        this._status = 200;
        this._inputMethod = InputProcess.BODY;
        this._responseBody = true;
        this._guards = [];
        this._middleware = false;
    }
    setRemoveResponse() {
        this._responseBody = false;
        return this;
    }
    setMiddleware() {
        this._middleware = true;
        return this;
    }
    setValidator(schema) {
        this._validator = schema;
        return this;
    }
    setInterceptor(interceptor) {
        this._interceptor = interceptor;
        return this;
    }
    setStatus(status) {
        this._status = status;
        return this;
    }
    setContainerIoC(container, symbol) {
        this._container = container;
        this._symbol = symbol;
        return this;
    }
    setInputMethod(option) {
        this._inputMethod = option;
        return this;
    }
    setPath(path) {
        this._path = path;
        return this;
    }
    setGuard(guard) {
        this._guards = [
            ...this._guards,
            ...guard
        ];
        return this;
    }
    async call(event) {
        var _a, _b, _c;
        const securityHeaders = {
            'X-Content-Type-Options': 'nosniff',
            'X-XSS-Protection': '1; mode=block',
            'X-Frame-Options': 'SAMEORIGIN',
            'Referrer-Policy': 'no-referrer-when-downgrade',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        };
        try {
            const input = event;
            if (this._middleware)
                Middleware_1.Middleware.validate(input);
            let request = {};
            let inputRequest = ContainerControllerExecutor.executeInputMethod(input, this._inputMethod);
            request.input = inputRequest;
            request.params = (_a = event.pathParameters) !== null && _a !== void 0 ? _a : {};
            request.query = (_b = event.queryStringParameters) !== null && _b !== void 0 ? _b : {};
            request.headers = (_c = event.headers) !== null && _c !== void 0 ? _c : {};
            if (this._validator) {
                ContainerControllerExecutor.executeValidator(request.input, this._validator);
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
            const instance = this._container.get(this._symbol);
            const result = await instance.execute(request);
            if (this._responseBody) {
                return {
                    statusCode: this._status,
                    body: JSON.stringify(result),
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        ...securityHeaders
                    },
                };
            }
            else {
                return result;
            }
        }
        catch (e) {
            const error = typeof e.render === "function" ? e.render() : null;
            if (this._interceptor) {
                return this._interceptor(error !== null && error !== void 0 ? error : e);
            }
            else if (error) {
                return {
                    statusCode: error.code,
                    body: JSON.stringify(error.body),
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        ...securityHeaders
                    },
                };
            }
            else {
                const internalError = new exception_1.InternalError(e).render();
                return {
                    statusCode: internalError.code,
                    body: JSON.stringify(internalError.body),
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                        ...securityHeaders
                    },
                };
            }
        }
    }
}
exports.ContainerController = ContainerController;
//# sourceMappingURL=container-controller.js.map