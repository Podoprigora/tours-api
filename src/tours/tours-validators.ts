import * as yup from 'yup';
import { InvalidFieldError } from '../lib/errors';

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
            throw new InvalidFieldError(e.path, e.errors);
        });
    }
}
