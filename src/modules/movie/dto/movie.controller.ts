import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetDaliyMovie() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    HttpCode(HttpStatus.OK)(target, key, descriptor);
    ApiOperation({
      summary: '일일 박스 오피스 영화 목록',
      description: '일일 박스 오피스 영화 목록 10개를 가지고 옵니다.',
    })(target, key, descriptor);
    ApiResponse({
      status: 200,
      description: '일일 박스 오피스 영화 목록 조회 성공',
    })(target, key, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        example: {
          statusCode: 400,
          name: '',
          message: '',
        },
      },
    })(target, key, descriptor);
    ApiResponse({
      status: 403,
      description: 'Forbidden',
      schema: {
        example: {
          statusCode: 403,
          name: '',
          message: '',
        },
      },
    })(target, key, descriptor);
    ApiResponse({
      status: 429,
      description: 'Too Many Requests',
      schema: {
        example: {
          statusCode: 429,
          name: '',
          message: '',
        },
      },
    })(target, key, descriptor);
    ApiResponse({
      status: 500,
      description: '서버 오류',
      schema: {
        example: {
          statusCode: 500,
          message:
            '일일 박스 오피스 영화 목록 데이터를 가져오는 중 오류가 발생했습니다.',
          error: 'Internal Server Error',
        },
      },
    })(target, key, descriptor);
  };
}

export function ApiGetWeeklyMovie() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    HttpCode(HttpStatus.OK)(target, key, descriptor);
    ApiOperation({
      summary: '주말/주간 박스 오피스 영화 목록',
      description: '주말/주간 박스 오피스 영화 목록 10개를 조회합니다.',
    })(target, key, descriptor);
    ApiResponse({
      status: 200,
      description: '주말/주간 박스 오피스 영화 목록 조회 성공',
    })(target, key, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        example: {
          statusCode: 400,
          name: '',
          message: '',
        },
      },
    })(target, key, descriptor);
    ApiResponse({
      status: 403,
      description: 'Forbidden',
      schema: {
        example: {
          statusCode: 403,
          name: '',
          message: '',
        },
      },
    })(target, key, descriptor);
    ApiResponse({
      status: 429,
      description: 'Too Many Requests',
      schema: {
        example: {
          statusCode: 429,
          name: '',
          message: '',
        },
      },
    })(target, key, descriptor);
    ApiResponse({
      status: 500,
      description: '서버 오류',
      schema: {
        example: {
          statusCode: 500,
          message:
            '주말/주간 박스 오피스 영화 목록 데이터를 가져오는 중 오류가 발생했습니다.',
          error: 'Internal Server Error',
        },
      },
    })(target, key, descriptor);
  };
}
