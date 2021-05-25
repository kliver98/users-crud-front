import { provider } from '../config/init-pact-user';
import { UserController as controller } from '../../../src/modules/UserController';
import { Matchers } from '@pact-foundation/pact';

const user_id = 100001;

describe('Given an user service', () => {
    beforeAll(async() => {
        await provider.setup();
    });

    describe('When a request to delete an user is made', () => {
        beforeAll(async() => {
            await provider.addInteraction({
                state: 'existis at least default dummy user, test',
                uponReceiving: 'a request to delete an user',
                withRequest: {
                    method: 'DELETE',
                    path: `/api/latest/users/${user_id}`
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.like(`Information: User [${user_id}] deleted successfully`)
                }
            });
        });

        test('Then it should return the right data', async() => {
            const response = await controller.delete(user_id);
            expect(response.data).toMatchSnapshot();

            await provider.verify();
        })

    });

    afterAll(async () => {
        await provider.finalize();
    });
});
