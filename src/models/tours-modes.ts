import * as yup from 'yup';

export const tourByIdParamsSchema = yup.object({
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

export type ITourByIdParams = yup.Asserts<typeof tourByIdParamsSchema>;

export const tourSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required()
});
export type ITour = yup.Asserts<typeof tourSchema>;

export const newTourRequestParamsSchema = yup.object({
    name: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required()
});

export type INewTourRequiestParams = yup.Asserts<typeof tourSchema>;
