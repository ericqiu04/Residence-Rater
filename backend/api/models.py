from django.db import models

# Create your models here.


class School(models.Model):
    name = models.CharField(max_length = 100)
    location = models.CharField(max_length = 100)

    def __str__(self):
        return self.name

class Residence(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    name = models.CharField(max_length = 100)
    def __str__(self):
        return self.name

class Review(models.Model):
    residence = models.ForeignKey(Residence, on_delete = models.CASCADE)
    user = models.CharField(max_length = 100)
    rating = models.PositiveIntegerField()
    comment = models.TextField()

    def __str__(self):
        return f"Review by {self.user} for {self.residence.name}"
    
