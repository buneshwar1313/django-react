from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id','name',)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'year', 'rated', 'runtime', 'director')
    list_filter = ('rated', 'genre')
    search_fields = ('title', 'director', 'actors', 'plot')

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('id','movie', 'source', 'value')
    list_filter = ('source',)
    search_fields = ('movie__title', 'source')