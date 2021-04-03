import * as yup from 'yup';

export const hasIdSchema = yup.object({
    id: yup.number().required()
});

export interface IHasId extends yup.Asserts<typeof hasIdSchema> {}
