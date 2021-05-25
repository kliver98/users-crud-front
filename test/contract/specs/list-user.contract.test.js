import { provider } from '../config/init-pact-user';
import { UserController as controller } from '../../../src/modules/UserController';
import { Matchers } from '@pact-foundation/pact';

describe('Given an user service', () => {
    beforeAll(async() => {
        await provider.setup();
    });

    describe('When a request to list all the users is made', () => {
        beforeAll(async() => {
            await provider.addInteraction({
                state: 'has users and wants to list them',
                uponReceiving: 'a request to list all users',
                withRequest: {
                    method: 'GET',
                    path: '/api/latest/users'
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.eachLike({
                        username: Matchers.string('admin'),
                        _id: Matchers.like(0),
                    }, {min: 1})
                }
            });
        });

        test('Then it should return the right data', async() => {
            const response = await controller.list();
            expect(response.data).toMatchSnapshot();

            await provider.verify();
        })

    });

    afterAll(async () => {
        await provider.finalize();
    });
});
