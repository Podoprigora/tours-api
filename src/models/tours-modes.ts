import * as yup from 'yup';

export const tourRequestByIdParamsSchema = yup.object({
    id: yup.string().trim().required(),
    test: yup
        .string()
        .notRequired()
        .trim()
        .transform(function (value) {
            if (this.isType(value) && value) {
                return String(value).replace(/\s+/gi, '-');
            }
            return value;
        })
});

export type ITourRequestByIdParams = yup.Asserts<typeof tourRequestByIdParamsSchema>;

export const tourSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required()
});

export type ITour = yup.Asserts<typeof tourSchema>;

export const tourRequestBodySchema = yup.object({
    name: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required()
});

export type ITourRequestBody = yup.Asserts<typeof tourRequestBodySchema>;
