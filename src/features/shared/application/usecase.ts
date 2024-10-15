import { ZodError, ZodSchema } from 'zod';
import { Either, errorResponse, successResponse } from '~/lib/utils/either';

export abstract class UseCase {
	protected successResponse<E, A>(data: A): Either<E, A> {
		return successResponse(data);
	}

	protected errorResponse<A>(error: unknown, errorMessage: string): Either<string, A> {
		return errorResponse(error instanceof Error ? error.message : errorMessage);
	}

	protected parseInput<T>(schema: ZodSchema<T>, input: unknown): T {
		try {
			return schema.parse(input);
		} catch (error) {
			if (error instanceof ZodError) {
				throw new Error('Invalid input: ' + error.errors.map(e => e.message).join(', '));
			}

			throw new Error('Unexpected error occurred during input parsing');
		}
	}
}
