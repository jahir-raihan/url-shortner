from django.db import models


class ShortUrl(models.Model):
    real_url = models.URLField()
