import math
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination


class CustomPagination(LimitOffsetPagination):
    default_limit = 12

    def get_paginated_response(self, data):
        limit = self.get_limit(self.request)
        offset = self.get_offset(self.request)
        total_rows = self.count
        pagesize = limit
        total_page = math.ceil(total_rows / float(pagesize))
        current_page = (offset // limit) + 1 if limit else 1

        return Response({
            'success': True,
            'message': 'Status OK',
            'data': {
                'total_page': total_page,
                'current_page': current_page,
                'pagesize': pagesize,
                'total_rows': total_rows,
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'results': data
            }
        })


class PeopleTalkPagination(CustomPagination):
    default_limit = 14  # or 10 or whatever you want
