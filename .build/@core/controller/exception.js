"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = exports.InternalError = exports.InvalidRequest = exports.ErrorBase = void 0;
const http_status_codes_1 = require("http-status-codes");
class ErrorBase extends Error {
    constructor(key) {
        super(key);
    }
}
exports.ErrorBase = ErrorBase;
class InvalidRequest extends ErrorBase {
    constructor(_error) {
        super(_error.message);
        this._error = _error;
        Object.setPrototypeOf(this, InvalidRequest.prototype);
    }
    render() {
        return {
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            body: {
                error: {
                    "code": "INVR",
                    "httpStatus": http_status_codes_1.StatusCodes.BAD_REQUEST,
                    "message": (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
                    "details": [this._error.message]
                },
                payload: null
            }
        };
    }
}
exports.InvalidRequest = InvalidRequest;
class InternalError extends ErrorBase {
    constructor(_error) {
        super(_error.message);
        this._error = _error;
        Object.setPrototypeOf(this, InternalError.prototype);
    }
    render() {
        return {
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            body: {
                error: {
                    "code": "IE",
                    "httpStatus": http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                    "message": (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
                    "details": [this._error.message]
                },
                payload: null
            }
        };
    }
}
exports.InternalError = InternalError;
class UnprocessableEntityError extends ErrorBase {
    constructor(_error) {
        super((0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY));
        this._error = _error instanceof Array ? _error : [_error];
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    }
    render() {
        return {
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            body: {
                error: {
                    "code": "UPER",
                    "httpStatus": http_status_codes_1.StatusCodes.BAD_REQUEST,
                    "message": (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
                    "details": this._error.map((err) => err.message)
                },
                payload: null
            }
        };
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
//# sourceMappingURL=exception.js.map