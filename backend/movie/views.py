from rest_framework import generics, mixins
from rest_framework.response import Response
from .models import *
from .serializers import *
from datetime import datetime
import json
from rest_framework.status import HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_200_OK

class BulkUpdateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
                mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = MovieSerializer
    
    def get(self, request, *args, **kwargs):
        file_path = '/home/ubuntu/Documents/GIthub/django-react/backend/movie/index.json'  
        with open(file_path, 'r') as file:
            data = json.load(file)

        for entry in data:
            entry_date = datetime.strptime(entry['date'], '%Y-%m-%dT%H:%M:%S.%fZ')

            for movie_data in entry['movies']:
                try:
                   
                    movie, created = Movie.objects.get_or_create(
                        title=movie_data['title'],
                        defaults={
                            'year': movie_data['year'],
                            'rated': movie_data['rated'],
                            'released': datetime.strptime(movie_data['released'], '%d %b %Y').date(),
                            'runtime': movie_data['runtime'],
                            'director': movie_data['director'],
                            'writer': movie_data['writer'],
                            'actors': movie_data['actors'],
                            'plot': movie_data['plot'],
                            'language': movie_data['language'],
                            'country': movie_data['country'],
                            'awards': movie_data['awards'],
                            'poster': movie_data['poster'],
                            "meta_score":movie_data['meta_score'],
                            'imdb_rating': float(movie_data['imdb_rating']),
                            'imdb_votes': int(movie_data['imdb_votes'].replace(',', '')),
                            'imdb_id': movie_data['imdb_id'],
                            'movie_type': movie_data['type'],
                            'dvd': datetime.strptime(movie_data['dvd'], '%d %b %Y').date() if movie_data['dvd'] != 'N/A' else None,
                            'box_office': movie_data['box_office'],
                            'production': movie_data['production'],
                            'website': movie_data['website'],
                            'date': entry_date
                        }
                    )

                   
                    genres = [Genre.objects.get_or_create(name=genre_name.lower())[0] for genre_name in movie_data['genre']]
                    movie.genre.add(*genres)

                   
                    for rating_data in movie_data['Ratings']:
                        rating, created = Rating.objects.get_or_create(
                            movie=movie,
                            source=rating_data['source'],
                            defaults={'value': rating_data['value']}
                        )
                except Exception as e:
                    print(f"Error processing movie: {e}")

        return Response("Movies updated successfully")


class MovieDashboardView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
                mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    
    def get(self, request, *args, **kwargs):
        geners = self.request.query_params.get("geners",None)
        
        title = self.request.query_params.get("title",None)
        unique_dates = Movie.objects.values_list('date', flat=True).distinct()

        # Initialize a list to hold the final response
        response = []

        # Iterate over each unique date
        for date in unique_dates:
            # Query movies for the current date
            movies_for_date = Movie.objects.filter(date=date)
          
            if geners:
                genres_list = geners.split(',')
                for genre in genres_list:
                    movies_for_date = movies_for_date.filter(genre__in=[genre.strip()])

            if title:
                movies_for_date = movies_for_date.filter(title__icontains=title)


            
            # Create a dictionary to represent the response for the current date
            date_response = {
                'date': date,
                'movies': []
            }
            
            # Serialize each movie individually
            for movie in movies_for_date:
                serialized_movie = MovieSerializer(movie).data
                date_response['movies'].append(serialized_movie)
                
            response.append(date_response)
        
        return Response({"data": response}, status=HTTP_200_OK)





class GenerListView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
                mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()
    lookup_field = 'id'
   

    def get(self, request, id=None, *args , **kwargs):
        if id:
            return self.retrieve(request, id)
        else:
            return self.list(request)
