import createEvent from '@serverless/event-mocks';
import { createCardTokenHandler, getCardInfoHandler } from '../../';

describe('Lambda Entry Integration', () => {

    test(`Should return ok message and card token`, async () => {
        const event = createEvent(
            "aws:apiGateway",
            {
                path: '/card/token',
                body: {
                    card_number: "5105105105105100",
                    ccv: "231",
                    expiration_month: "02",
                    expiration_year: "2023",
                    email: "javillenad@gmail.com"
                }
            } as any
        );
        const result = await createCardTokenHandler(event);
        console.log("->>>", result)
        expect(result.statusCode).toBe(200);
    });
    
    test(`Should return ok message and card data from token`, async () => {
        const event = createEvent(
            "aws:apiGateway",
            {
                path: '/card',
                queryStringParameters: {
                   token: "x8kDAPaE1SqimSmm"
                }
            } as any
        );
        const result = await getCardInfoHandler(event);
        console.log("->>>", result)
        expect(result.statusCode).toBe(200);
    });
})