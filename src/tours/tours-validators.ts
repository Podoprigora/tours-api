import * as yup from 'yup';

import { newTourRequestParamsSchema, tourByIdParamsSchema, tourSchema } from '../models';

export class ToursValidators {
    static async validateTours(tours: unknown[]) {
        return yup
            .array()
            .of(tourSchema)
            .validate(tours)
            .catch(() => undefined);
    }

    static async validateTour(tour: unknown) {
        return tourSchema.validate(tour);
    }

    static async validateRequestByIdParams(params: unknown) {
        return tourByIdParamsSchema.validate(params);
    }

    static async validateNewTourRequestParams(params: unknown) {
        return newTourRequestParamsSchema.validate(params).catch((e: yup.ValidationError) => {
            throw { field: e.path, errors: e.errors };
        });
    }
}
