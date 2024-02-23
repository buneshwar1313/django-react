from django.urls import path
from .views import *

urlpatterns = [
    path('script/',BulkUpdateView.as_view(),name="Json Upload"),
    path('movie_dashboard/',MovieDashboardView.as_view(),name="movie dashboard"),
    path('genre/',GenerListView.as_view(),name="gener list view"),
    path('genre/<str:id>/',GenerListView.as_view(),name="gener list view")
]
