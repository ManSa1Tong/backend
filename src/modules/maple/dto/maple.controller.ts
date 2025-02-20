import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventNoticeListDto } from './event_notice_list.dto';

export function ApiGetMapleEventNotices() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    HttpCode(HttpStatus.OK)(target, key, descriptor);
    ApiOperation({
      summary: '메이플스토리 진행중 이벤트 목록 조회',
      description: '진행중인 이벤트 목록 20개를 가지고 옵니다.',
    })(target, key, descriptor);
    ApiResponse({
      status: 200,
      description: '메이플스토리 진행중 이벤트 목록 조회 성공',
      type: [EventNoticeListDto],
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
            '메이플스토리 진행중 이벤트 데이터를 가져오는 중 오류가 발생했습니다.',
          error: 'Internal Server Error',
        },
      },
    })(target, key, descriptor);
  };
}
