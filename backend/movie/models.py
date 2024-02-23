from django.db import models



class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = self.name.lower()  # Convert name to lowercase
        super(Genre, self).save(*args, **kwargs)

        
class Movie(models.Model):
    title = models.CharField(max_length=500, blank=True, null=True)
    year = models.PositiveIntegerField(null=True,blank=True)
    rated = models.CharField(max_length=10,null=True,blank=True)
    released = models.DateField(null=True,blank=True)
    runtime = models.CharField(max_length=20)
    genre = models.ManyToManyField(Genre,null=True,blank=True)
    director = models.CharField(max_length=255)
    writer = models.TextField()
    actors = models.CharField(max_length=255)
    plot = models.TextField()
    language = models.CharField(max_length=500)
    country = models.CharField(max_length=500)
    awards = models.TextField()
    poster = models.URLField()
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=2)
    imdb_votes = models.CharField(max_length=20)
    imdb_id = models.CharField(max_length=20)
    imdb_votes = models.CharField(max_length=20)
    movie_type = models.CharField(max_length=20)
    dvd =  models.DateField(null=True,blank=True)
    box_office = models.CharField(max_length=500)
    production = models.CharField(max_length=255)
    website = models.URLField(null=True,blank=True)
    date = models.DateTimeField(null=True,blank=True)



class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    source = models.CharField(max_length=100, null=True, blank=True)  # Adjusted max_length
    value = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"{self.source} - {self.value}"