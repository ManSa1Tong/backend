import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

export function ApiResponseSuccess(message: string, type?: any) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: message,
      type,
    }),
  );
}

export function ApiResponseCreated(message: string, type?: any) {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: message,
      type,
    }),
  );
}

export function ApiResponseError(message: string, statusCode: number) {
  return applyDecorators(
    ApiResponse({
      status: statusCode,
      description: message,
    }),
  );
}

export function ApiOperationSummary(summary: string, description: string) {
  return applyDecorators(
    ApiOperation({
      summary,
      description,
    }),
  );
}
