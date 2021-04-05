import * as yup from 'yup';

import { tourRequestBodySchema, tourRequestByIdParamsSchema, tourSchema } from '../models';

export class ToursValidators {
    static async validateArray(tours: unknown[]) {
        return yup
            .array()
            .of(tourSchema)
            .validate(tours)
            .catch(() => undefined);
    }

    static async validateOne(tour: unknown) {
        return tourSchema.validate(tour);
    }

    static async validateRequestByIdParams(params: unknown) {
        return tourRequestByIdParamsSchema.validate(params);
    }

    static async validateRequestBody(params: unknown) {
        return tourRequestBodySchema.validate(params).catch((e: yup.ValidationError) => {
            throw { field: e.path, errors: e.errors };
        });
    }
}
