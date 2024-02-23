from rest_framework import serializers
from .models import Movie, Genre, Rating

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(many=True, read_only=True)
    ratings = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = '__all__'

    def get_ratings(self, obj):
        ratings = Rating.objects.filter(movie=obj)
        return RatingSerializer(ratings, many=True).data