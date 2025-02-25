import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetManyMovie() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    HttpCode(HttpStatus.OK)(target, key, descriptor);
    ApiOperation({
      summary: '영화 목록 조회',
      description: ' 영화 목록 10개를 가지고 옵니다.',
    })(target, key, descriptor);
    ApiResponse({
      status: 200,
      description: '영화 목록 조회 성공',
    })(target, key, descriptor);
    ApiResponse({
      status: 400,
      description: '키 값을 잘못 입력하였습니다.',
      schema: {
        example: {
          statusCode: 400,
          message: '검색년도는 4자리 숫자 문자열입니다.',
          errorCode: '320217',
        },
      },
    })(target, key, descriptor);
    ApiResponse({
      status: 400,
      description: '키 값을 잘못 입력하였습니다.',
      schema: {
        example: {
          statusCode: 400,
          message:
            '국적구분 조건은 공통코드220310으로 조회된 8자리 코드를 입력하십시요.',
          errorCode: '320221',
        },
      },
    })(target, key, descriptor);
    ApiResponse({
      status: 500,
      description: '서버 오류',
      schema: {
        example: {
          statusCode: 500,
          message: '영화 목록 데이터를 가져오는 중 오류가 발생했습니다.',
          error: 'Internal Server Error',
        },
      },
    })(target, key, descriptor);
  };
}

export function ApiGetMovie() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    HttpCode(HttpStatus.OK)(target, key, descriptor);
    ApiOperation({
      summary: '영화 정보 상세보기',
      description: '영화 정보를 조회합니다.',
    })(target, key, descriptor);
    ApiResponse({
      status: 200,
      description: '영화 정보 조회 성공',
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
