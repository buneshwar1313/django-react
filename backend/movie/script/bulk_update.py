# # import json
from movie.models import *
print("hii")
# Read the JSON file
file_path = 'index.json'  # Adjust the file path as needed
with open(file_path, 'r') as file:
    data = json.load(file)

# Iterate over the data
for movie_data in data:
    try:
        # Create Movie object
        movie = Movie.objects.create(
            title=movie_data['title'],
            year=movie_data['year'],
            rated=movie_data['rated'],
            released=movie_data['released'],
            runtime=movie_data['runtime'],
            director=movie_data['director'],
            writer=movie_data['writer'],
            actors=movie_data['actors'],
            plot=movie_data['plot'],
            language=movie_data['language'],
            country=movie_data['country'],
            awards=movie_data['awards'],
            poster=movie_data['poster'],
            imdb_rating=movie_data['imdb_rating'],
            imdb_votes=movie_data['imdb_votes'],
            imdb_id=movie_data['imdb_id'],
            movie_type=movie_data['type'],
            dvd=movie_data['dvd'],
            box_office=movie_data['box_office'],
            production=movie_data['production'],
            website=movie_data['website']
        )

        # Create Genre objects and add to movie
        genres = []
        for genre_name in movie_data['genre']:
            genre, _ = Genre.objects.get_or_create(name=genre_name)
            genres.append(genre)
        movie.genre.add(*genres)

        # Create Rating objects and add to movie
        for rating_data in movie_data['Ratings']:
            Rating.objects.create(
                movie=movie,
                source=rating_data['source'],
                value=rating_data['value']
            )
    except Exception as e:
        print(f"Error processing movie: {e}")
