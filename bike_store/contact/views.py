from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from .serializers import AddMessageSerializer


class AddMessageView(views.APIView):

    def post(self, request):
        serializer = AddMessageSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.save()
            return Response({'messageId': message.pk}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
