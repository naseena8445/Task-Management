from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class TaskSerializer(serializers.ModelSerializer):
    dueDate = serializers.DateField(source='due_date', allow_null=True, required=False)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'dueDate', 'priority', 'completed', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at', 'user')

    def update(self, instance, validated_data):
        validated_data['due_date'] = validated_data.get('due_date', instance.due_date)
        if 'dueDate' in self.initial_data:
            validated_data['due_date'] = self.initial_data.get('dueDate') or None
        return super().update(instance, validated_data)
